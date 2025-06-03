import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress, List, ListItem, ListItemText, Divider, Button, Chip, Avatar } from '@mui/material';
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

  // STEP 1.2: useEffect for cleanup
  useEffect(() => {
    // This function will be called when the component unmounts or before the effect runs again if results change.
    return () => {
      results.forEach(result => {
        if (result.previewUrl) {
          URL.revokeObjectURL(result.previewUrl);
          // console.log('Revoked preview URL:', result.previewUrl);
        }
      });
    };
  }, [results]); // Dependency array: effect runs if the results array instance changes

  const handleImageUpload = async (files) => {
    if (!user) {
      router.push('/auth');
      return;
    }

    // Revoke object URLs from previous batch of results *before* processing new ones.
    // This is important if the user uploads a new batch while previous previews are still shown.
    results.forEach(result => {
      if (result.previewUrl) {
        URL.revokeObjectURL(result.previewUrl);
      }
    });

    setLoading(true);
    setResults([]); // Clear previous results from UI immediately
    const newResults = [];

    for (const file of files) {
      const img = new Image();
      let localPreviewUrl = null; // Use a local variable for the current file's preview URL

      try {
        // STEP 1.1: Create and store previewUrl
        localPreviewUrl = URL.createObjectURL(file);
        img.src = localPreviewUrl;
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = (err) => {
            console.error(`Error loading image ${file.name} for preview:`, err);
            reject(new Error(`Failed to load image ${file.name} for preview`));
          };
        });

        const prediction = await mlService.predict(img);
        
        if (!prediction || !prediction.disease) {
          console.error(`Prediction failed or missing disease for ${file.name}`);
          newResults.push({ 
            fileName: file.name, 
            error: 'Không thể lấy được kết quả dự đoán hoặc tên bệnh.',
            previewUrl: localPreviewUrl // Store preview URL even for errors
          });
          continue; // Move to the next file
        }

        const predictedClassName = prediction.disease.replace(/\s+/g, '_');
        const storageRefPath = `diagnosis/${user.uid}/${predictedClassName}/${Date.now()}_${file.name}`;
        const storageRefVal = ref(storage, storageRefPath);
        await uploadBytes(storageRefVal, file);
        const imageUrl = await getDownloadURL(storageRefVal); // Firebase Storage URL

        const diagnosisData = {
          userId: user.uid,
          imageUrl: imageUrl,
          storagePath: storageRefPath,
          diseaseName: prediction.disease,
          confidence: prediction.confidence,
          timestamp: Timestamp.now(),
          platform: 'web',
          recommendation: prediction.treatment || '',
          prevention: prediction.prevention || '', // Keep prevention for now
        };

        await addDoc(collection(db, 'users', user.uid, 'diagnosis'), diagnosisData);

        newResults.push({ 
          fileName: file.name, 
          ...prediction, 
          imageUrl: imageUrl,       // Firebase Storage URL (for PDF later)
          previewUrl: localPreviewUrl, // Local blob URL for immediate UI display
          storagePath: storageRefPath,
          timestamp: new Date()
        });
        // No revocation here, will be handled by useEffect cleanup

      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
        newResults.push({ 
          fileName: file.name, 
          error: error.message || 'Có lỗi xảy ra khi xử lý ảnh này', 
          previewUrl: localPreviewUrl // Store preview URL even for errors, if created
        });
      }
    } 
    setResults(newResults);
    setLoading(false);
  };

  // Bước 2: Thêm lại logic tải ảnh cho PDF, nhưng CHƯA vẽ ảnh
  const exportDiagnosisToPdf = async (resultsData) => {
    if (!user || resultsData.length === 0) {
      alert("Không có dữ liệu để xuất hoặc người dùng chưa đăng nhập.");
      return;
    }
    
    const doc = new jsPDF();
    let fontToUse = 'Helvetica';
    const FONT_NAME_CUSTOM = 'NotoSansCustom';

    try {
      const fontRegularUrl = '/fonts/NotoSans-Regular.ttf'; 
      const fontRegularResponse = await fetch(fontRegularUrl);
      if (!fontRegularResponse.ok) throw new Error(`Failed to fetch regular font: ${fontRegularResponse.statusText}`);
      const fontRegularBuffer = await fontRegularResponse.arrayBuffer();
      doc.addFileToVFS('NotoSans-Regular.ttf', arrayBufferToBase64(fontRegularBuffer));
      doc.addFont('NotoSans-Regular.ttf', FONT_NAME_CUSTOM, 'normal');
      const fontBoldUrl = '/fonts/NotoSans-Bold.ttf'; 
      const fontBoldResponse = await fetch(fontBoldUrl);
      if (!fontBoldResponse.ok) throw new Error(`Failed to fetch bold font: ${fontBoldResponse.statusText}`);
      const fontBoldBuffer = await fontBoldResponse.arrayBuffer();
      doc.addFileToVFS('NotoSans-Bold.ttf', arrayBufferToBase64(fontBoldBuffer));
      doc.addFont('NotoSans-Bold.ttf', FONT_NAME_CUSTOM, 'bold');
      fontToUse = FONT_NAME_CUSTOM;
    } catch (e) {
      console.error("Lỗi tải font cho PDF:", e);
    }
    doc.setFont(fontToUse);

    doc.setFontSize(18);
    doc.setFont(fontToUse, 'bold');
    doc.text('Báo cáo Kết quả Chẩn đoán Bệnh', 14, 22);
    doc.setFontSize(10);
    doc.setFont(fontToUse, 'normal');
    doc.setTextColor(80, 80, 80);
    doc.text(`Người dùng: ${user.displayName || user.email || 'N/A'}`, 14, 30);
    doc.text(`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`, 14, 35);

    let currentY = 45;
    doc.setFontSize(14);
    doc.setFont(fontToUse, 'bold');
    doc.setTextColor(0,0,0);
    doc.text('Tổng hợp kết quả:', 14, currentY);    
    currentY +=10;
    const diseaseCounts = {};
    let healthyLeavesCount = 0;
    resultsData.forEach(res => {
      if (res.error) return;
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
        styles: { font: fontToUse, fontSize: 10, fontStyle: 'normal', cellPadding: 2, valign: 'middle' },
        headStyles: { font: fontToUse, fontStyle: 'bold', fillColor: [76, 175, 80], textColor: [255,255,255], fontSize: 11, halign: 'center', valign: 'middle' },
        didDrawPage: function (data) { currentY = data.cursor.y; }
    });
    currentY += 15;

    doc.setFontSize(14);
    doc.setFont(fontToUse, 'bold');
    doc.text('Chi tiết kết quả từng ảnh:', 14, currentY);
    currentY += 10;

    // === BƯỚC 3: THÊM LẠI didDrawCell ĐỂ VẼ ẢNH ===
    console.log("Bước 3: Đang tải trước ảnh cho bảng PDF...");
    const imageElementsMap = {};
    const imagePromises = resultsData.map(res => {
      if (res.imageUrl && !res.error) {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'Anonymous'; // Quan trọng để tránh lỗi CORS khi vẽ ảnh lên canvas
          img.onload = () => {
            console.log(`Ảnh đã tải cho PDF: ${res.fileName}`);
            resolve({ fileName: res.fileName, imageElement: img, success: true });
          };
          img.onerror = (err) => {
            console.error(`Lỗi tải ảnh PDF cho ${res.fileName}:`, err);
            resolve({ fileName: res.fileName, error: 'Lỗi tải ảnh cho PDF', success: false });
          };
          img.src = res.imageUrl; // Sử dụng imageUrl từ Firebase Storage
        });
      }
      // Giải quyết ngay cho các mục không có imageUrl hoặc đã có lỗi xử lý trước đó
      return Promise.resolve({ fileName: res.fileName, error: res.error || 'Không có ảnh URL', success: false });
    });

    const loadedImageResults = await Promise.allSettled(imagePromises);
    loadedImageResults.forEach(promiseResult => {
      if (promiseResult.status === 'fulfilled') {
        const value = promiseResult.value;
        if (value.success) {
          imageElementsMap[value.fileName] = value.imageElement;
        } else {
          imageElementsMap[value.fileName] = value.error || 'Lỗi không xác định khi tải ảnh';
        }
      }
    });
    console.log("Hoàn tất tải trước ảnh cho PDF.", imageElementsMap);
    // === KẾT THÚC PHẦN THÊM LẠI LOGIC TẢI ẢNH ===

    // Tạo nội dung cho bảng chi tiết
    const diagnosisTableColumn = ["STT", "Tên ảnh", "Bệnh", "Độ chính xác (%)", "Điều trị", "Ảnh"];
    const diagnosisTableRows = [];

    resultsData.forEach((res, index) => {
      const diseaseName = res.disease || 'N/A';
      const confidence = typeof res.confidence === 'number' ? (res.confidence * 100).toFixed(2) : 'N/A';
      const treatment = res.treatment || res.recommendation || 'N/A';

      diagnosisTableRows.push([
        index + 1,
        res.fileName,
        diseaseName,
        confidence,
        treatment,
        '', // Pass an empty string here for the image column
      ]);
    });

    autoTable(doc, {
      startY: currentY,
      head: [diagnosisTableColumn],
      body: diagnosisTableRows,
      theme: 'grid',
      styles: { font: fontToUse, fontSize: 8, fontStyle: 'normal', cellPadding: 2, valign: 'middle', rowHeight: 38 },
      headStyles: { font: fontToUse, fontStyle: 'bold', fillColor: [33, 150, 243], textColor: [255,255,255], fontSize: 9, halign: 'center', valign: 'middle', rowHeight: 15 },
      columnStyles: {
        0: { cellWidth: 27 }, 
        1: { cellWidth: 25 }, 
        2: { cellWidth: 30 }, 
        3: { cellWidth: 20 }, 
        4: { cellWidth: 40 },
        5: { cellWidth: 40, minCellHeight: 38 }  // Đảm bảo ô ảnh đủ cao
      },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 5) { 
          const currentRowData = resultsData[data.row.index];
          if (currentRowData && currentRowData.fileName) {
            const imgElement = imageElementsMap[currentRowData.fileName];

            if (imgElement instanceof HTMLImageElement) {
              const img = imgElement;
              const fixedImgSize = 36; // Kích thước ảnh cố định (points)

              let scaledWidth = img.width;
              let scaledHeight = img.height;
              const aspectRatio = scaledWidth / scaledHeight;

              if (aspectRatio > 1) { // Ảnh rộng hơn cao
                  scaledWidth = fixedImgSize;
                  scaledHeight = fixedImgSize / aspectRatio;
              } else { // Ảnh cao hơn rộng hoặc vuông
                  scaledHeight = fixedImgSize;
                  scaledWidth = fixedImgSize * aspectRatio;
              }
                                
              const x = data.cell.x + (data.cell.width - scaledWidth) / 2;
              const y = data.cell.y + (data.cell.height - scaledHeight) / 2;

              try {
                doc.addImage(img, 'JPEG', x, y, scaledWidth, scaledHeight);
              } catch (e) {
                console.error("Lỗi khi vẽ ảnh vào PDF (diagnosis):", e);
                doc.setFontSize(6);
                doc.setTextColor(255, 0, 0);
                doc.text("Lỗi vẽ ảnh", data.cell.x + data.cell.padding('left'), data.cell.y + data.cell.padding('top') + 3);
              }
            } else {
              doc.setFontSize(6);
              doc.setTextColor(150, 150, 150);
              doc.text(typeof imgElement === 'string' ? imgElement : "Không có ảnh", data.cell.x + data.cell.padding('left'), data.cell.y + data.cell.padding('top') + 3);
            }
          }
        }
      },
      didDrawPage: function(data) {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Trang ' + data.pageNumber + '/' + pageCount, data.settings.margin.left, doc.internal.pageSize.height - 10);
      }
    });

    doc.save(`BaoCao_ChanDoan_${user.uid}_${Date.now()}.pdf`);
    console.log("Đã lưu PDF Chẩn đoán.");
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

              {!loading && results.length === 0 && (
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
                        <ListItem 
                            alignItems="flex-start" 
                            sx={{
                                py: 1.5, 
                                backgroundColor: index % 2 ? '#f9f9f9' : 'transparent', 
                                borderRadius: 1,
                                display: 'flex', 
                                gap: 2 
                            }}
                        >
                          {res.previewUrl && (
                            <Avatar 
                                src={res.previewUrl} 
                                alt={`Xem trước ${res.fileName}`} 
                                variant="rounded" 
                                sx={{ width: 80, height: 80, mr: 1.5 }} 
                            />
                          )}
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