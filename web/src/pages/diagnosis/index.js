import React, { useState, useRef } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress, List, ListItem, ListItemText, Divider, Button, Chip } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import MainLayout from '../../components/Layout/MainLayout';
import ImageUploader from '../../components/ImageUpload/ImageUploader';
import { storage, db, auth } from '../../services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { mlService } from '../../services/ml';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';

// Imports for PDF generation
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Correct import for jspdf-autotable

// Helper function to convert ArrayBuffer to Base64 (from history/index.js)
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default function Diagnosis() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const imageRef = useRef(null);

  const handleImageUpload = async (files) => {
    if (!user) {
      router.push('/auth');
      return;
    }

    setLoading(true);
    setResults([]);
    const newResults = [];

    for (const file of files) {
      const img = new Image();
      try {
        img.src = URL.createObjectURL(file);
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = (err) => {
            console.error(`Error loading image ${file.name}:`, err);
            reject(new Error(`Failed to load image ${file.name}`));
          };
        });

        const prediction = await mlService.predict(img);
        
        if (!prediction || !prediction.disease) {
          console.error(`Prediction failed or missing disease for ${file.name}`);
          newResults.push({ 
            fileName: file.name, 
            error: 'Không thể lấy được kết quả dự đoán hoặc tên bệnh.' 
          });
          continue;
        }

        const predictedClassName = prediction.disease.replace(/\s+/g, '_');
        const storageRefPath = `diagnosis/${user.uid}/${predictedClassName}/${Date.now()}_${file.name}`;
        const storageRefVal = ref(storage, storageRefPath);
        await uploadBytes(storageRefVal, file);
        const imageUrl = await getDownloadURL(storageRefVal);

        // Prepare data according to the shared PredictionHistory model
        const diagnosisData = {
          userId: user.uid,
          imageUrl: imageUrl,
          storagePath: storageRefPath,
          diseaseName: prediction.disease, // from mlService result
          confidence: prediction.confidence, // from mlService result
          timestamp: Timestamp.now(), // Firestore server timestamp
          platform: 'web',
          recommendation: prediction.treatment || '', // Using treatment as recommendation
          // originalFileName: file.name, // Not in shared model, omitting
        };

        // Save to the correct user-specific sub-collection
        await addDoc(collection(db, 'users', user.uid, 'diagnosis'), diagnosisData);

        newResults.push({ 
          fileName: file.name, 
          ...prediction, 
          imageUrl, 
          storagePath: storageRefPath,
          timestamp: new Date()
        });
        URL.revokeObjectURL(img.src);

      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        newResults.push({ 
          fileName: file.name, 
          error: error.message || 'Có lỗi xảy ra khi xử lý ảnh này' 
        });
        if (img && img.src && img.src.startsWith('blob:')) {
            URL.revokeObjectURL(img.src);
        }
      }
    } 

    setResults(newResults);
    setLoading(false);
  };

  const exportDiagnosisToPdf = async (resultsData) => {
    if (!user || resultsData.length === 0) return;
    
    const doc = new jsPDF();
    let fontToUse = 'Helvetica'; // Default fallback
    const FONT_NAME_CUSTOM = 'NotoSansCustom';

    try {
      // Load Regular font
      const fontRegularUrl = '/fonts/NotoSans-Regular.ttf'; 
      const fontRegularResponse = await fetch(fontRegularUrl);
      if (!fontRegularResponse.ok) throw new Error(`Failed to fetch regular font: ${fontRegularResponse.statusText}`);
      const fontRegularBuffer = await fontRegularResponse.arrayBuffer();
      doc.addFileToVFS('NotoSans-Regular.ttf', arrayBufferToBase64(fontRegularBuffer));
      doc.addFont('NotoSans-Regular.ttf', FONT_NAME_CUSTOM, 'normal');

      // Load Bold font
      const fontBoldUrl = '/fonts/NotoSans-Bold.ttf'; 
      const fontBoldResponse = await fetch(fontBoldUrl);
      if (!fontBoldResponse.ok) throw new Error(`Failed to fetch bold font: ${fontBoldResponse.statusText}`);
      const fontBoldBuffer = await fontBoldResponse.arrayBuffer();
      doc.addFileToVFS('NotoSans-Bold.ttf', arrayBufferToBase64(fontBoldBuffer));
      doc.addFont('NotoSans-Bold.ttf', FONT_NAME_CUSTOM, 'bold');
      
      fontToUse = FONT_NAME_CUSTOM;
      console.log("Custom NotoSans font loaded for PDF.");
    } catch (e) {
      console.error("Error loading custom NotoSans fonts for PDF, falling back to Helvetica:", e);
    }
    
    doc.setFont(fontToUse);

    // 1. Title and User Info
    doc.setFontSize(18);
    doc.setFont(fontToUse, 'bold');
    doc.text('Báo cáo Kết quả Chẩn đoán Bệnh', 14, 22);
    
    doc.setFontSize(10);
    doc.setFont(fontToUse, 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Người dùng: ${user.displayName || user.email || 'N/A'}`, 14, 30);
    doc.text(`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`, 14, 35);

    // 2. Summary Section
    let currentY = 45;
    doc.setFontSize(14);
    doc.setFont(fontToUse, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Tổng hợp kết quả:', 14, currentY);
    currentY += 10;

    const diseaseCounts = {};
    let healthyLeavesCount = 0;
    resultsData.forEach(res => {
      if (res.error) return;
      // IMPORTANT: Adjust 'healthy' or 'khỏe mạnh' if your model uses different class names
      if (res.disease && (res.disease.toLowerCase() === 'healthy' || res.disease.toLowerCase() === 'khỏe mạnh')) {
        healthyLeavesCount++;
      } else if (res.disease) {
        diseaseCounts[res.disease] = (diseaseCounts[res.disease] || 0) + 1;
      }
    });

    const summaryTableBody = [];
    for (const disease in diseaseCounts) {
      summaryTableBody.push([disease, diseaseCounts[disease]]);
    }
    if (healthyLeavesCount > 0) {
      summaryTableBody.push(['Lá khỏe mạnh', healthyLeavesCount]);
    }
    if (summaryTableBody.length === 0 && resultsData.filter(r => !r.error).length > 0) {
        summaryTableBody.push(['Không xác định được bệnh cụ thể từ kết quả.', '']);
    } else if (summaryTableBody.length === 0) {
        summaryTableBody.push(['Không có dữ liệu chẩn đoán hợp lệ để tổng hợp.', '']);
    }
    
    autoTable(doc, {
      startY: currentY,
      head: [['Loại bệnh / Tình trạng', 'Số lượng']],
      body: summaryTableBody,
      theme: 'grid',
      styles: { 
        font: fontToUse, 
        fontSize: 10, 
        fontStyle: 'normal', 
        cellPadding: 2,
        valign: 'middle'
      },
      headStyles: { 
        font: fontToUse, 
        fontStyle: 'bold', 
        fillColor: [76, 175, 80],
        textColor: [255, 255, 255],
        fontSize: 11,
        halign: 'center',
        valign: 'middle'
      },
      didDrawPage: function (data) {
        currentY = data.cursor.y;
      }
    });
    currentY += 15;

    // 3. Detailed Results Section
    doc.setFontSize(14);
    doc.setFont(fontToUse, 'bold');
    doc.text('Chi tiết kết quả từng ảnh:', 14, currentY);
    currentY += 10;

    const detailedTableBody = resultsData.map(res => {
      if (res.error) {
        return [res.fileName || 'N/A', `Lỗi: ${res.error}`, '', '', ''];
      }
      const timestampStr = res.timestamp && typeof res.timestamp.toLocaleString === 'function' ? 
                           res.timestamp.toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) :
                           (res.timestamp ? new Date(res.timestamp).toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : 'N/A');
      return [
        timestampStr,
        res.disease || 'N/A',
        res.confidence !== undefined ? `${(res.confidence * 100).toFixed(2)}%` : 'N/A',
        res.treatment || 'N/A',
        res.prevention || 'N/A',
      ];
    });

    autoTable(doc, {
      startY: currentY,
      head: [['Ngày giờ', 'Bệnh', 'Độ chính xác (%)', 'Điều trị', 'Phòng ngừa']],
      body: detailedTableBody,
      theme: 'striped',
      styles: { 
        font: fontToUse, 
        fontSize: 9,
        fontStyle: 'normal', 
        cellPadding: 2, 
        valign: 'middle'
      },
      headStyles: { 
        font: fontToUse, 
        fontStyle: 'bold', 
        fillColor: [63, 81, 181],
        textColor: [255,255,255],
        fontSize: 10,
        halign: 'center',
        valign: 'middle'
      },
      columnStyles: {
        0: { cellWidth: 38, halign: 'left' },
        1: { cellWidth: 35, halign: 'left' },
        2: { cellWidth: 22, halign: 'center' },
        3: { cellWidth: 45, halign: 'left' },
        4: { cellWidth: 45, halign: 'left' }
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      didDrawPage: function(data) {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Trang ' + data.pageNumber + '/' + pageCount, data.settings.margin.left, doc.internal.pageSize.height - 10);
      }
    });

    doc.save(`BaoCao_ChanDoan_${user.uid}_${Date.now()}.pdf`);
  };

  return (
    <MainLayout>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Chẩn đoán bệnh trên lá cây
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
              <ImageUploader onImageUpload={handleImageUpload} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, maxHeight: '80vh', overflowY: 'auto', borderRadius: 2, boxShadow: 3 }}>
              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3, flexDirection: 'column' }}>
                  <CircularProgress />
                  <Typography sx={{ml: 0, mt: 2, fontWeight: 'medium'}}>Đang xử lý {results.length > 0 ? results.length : ''} ảnh...</Typography>
                </Box>
              )}
              
              {!loading && results.length > 0 && (
                <Button 
                  variant="contained" 
                  onClick={() => exportDiagnosisToPdf(results)} 
                  sx={{ mb: 2, display: 'block', ml: 'auto', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293'}}}
                  startIcon={<PictureAsPdfIcon />}
                >
                  Xuất báo cáo PDF
                </Button>
              )}

              {!loading && results.length === 0 && !loading && ( // Ensure message shows only when not loading and no results
                 <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', mt: 4}}>
                  Tải lên ảnh hoặc thư mục để bắt đầu chẩn đoán.
                  Hệ thống sẽ phân tích và hiển thị kết quả tại đây.
                </Typography>
              )}

              {!loading && results.length > 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', borderBottom: '1px solid #ddd', pb: 1, mb: 2 }}>
                    Kết quả chẩn đoán ({results.filter(r => !r.error).length} / {results.length} ảnh thành công)
                  </Typography>
                  <List dense>
                    {results.map((res, index) => (
                      <React.Fragment key={index}>
                        <ListItem alignItems="flex-start" sx={{py: 1.5, backgroundColor: index % 2 ? '#f9f9f9' : 'transparent', borderRadius: 1}}>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                {index + 1}. {res.fileName}
                              </Typography>
                            }
                            secondary={
                              <React.Fragment>
                                {res.error ? (
                                  <Typography component="span" variant="body2" color="error" sx={{ fontWeight: 'bold', display: 'block' }}>
                                    Lỗi: {res.error}
                                  </Typography>
                                ) : (
                                  <>
                                    <Typography component="span" variant="body2" display="block">
                                      <strong>Bệnh:</strong> {res.disease}
                                    </Typography>
                                    <Typography component="span" variant="body2" display="block">
                                      <strong>Độ chính xác:</strong> <Chip label={`${(res.confidence * 100).toFixed(2)}%`} color={res.confidence > 0.7 ? "success" : "warning"} size="small" />
                                    </Typography>
                                    {res.treatment && (
                                      <Typography component="span" variant="body2" display="block" sx={{mt:0.5}}>
                                        <strong>Điều trị:</strong> {res.treatment}
                                      </Typography>
                                    )}
                                    {res.prevention && (
                                      <Typography component="span" variant="body2" display="block" sx={{mt:0.5}}>
                                        <strong>Phòng ngừa:</strong> {res.prevention}
                                      </Typography>
                                    )}
                                  </>
                                )}
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        {index < results.length - 1 && <Divider component="li" sx={{my:0.5}} />}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
}

// Make sure PictureAsPdfIcon is imported, if not already:
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // Add this if missing at the top imports

// ... (rest of the component code remains unchanged) ...