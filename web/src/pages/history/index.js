import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  TextField,
  InputAdornment,
  Stack,
} from '@mui/material';
import { Search as SearchIcon, PictureAsPdf as PictureAsPdfIcon, Clear as ClearIcon } from '@mui/icons-material';
import MainLayout from '../../components/Layout/MainLayout';
import { db, auth } from '../../services/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { startOfDay, endOfDay, isWithinInterval, parseISO } from 'date-fns';
// Import tệp JavaScript định nghĩa font Roboto (đặt đúng đường dẫn)
// Quan trọng: Tệp này cần được tạo ra từ việc convert .ttf sang định dạng jsPDF
// Ví dụ: import '../../public/fonts/roboto-regular-font.js'; // Đường dẫn này có thể cần điều chỉnh
// Hoặc nếu tệp font.js tự đăng ký font vào đối tượng jsPDF toàn cục, bạn chỉ cần import nó.

// Để jsPDF hoạt động với font tùy chỉnh, chúng ta cần import và đăng ký nó.
// Giả sử bạn đã có tệp `Roboto-Regular-normal.js` được tạo từ font converter và đặt trong `public/fonts`
// Bạn sẽ cần import nó. Tuy nhiên, việc import trực tiếp tệp .js từ public vào mã nguồn src
// có thể không phải là cách tiếp cận chuẩn của Next.js. 
// Một cách tốt hơn là tải font qua <script> trong _document.js hoặc _app.js, 
// hoặc fetch nội dung font rồi add thủ công. 

// Cách tiếp cận đơn giản nhất nếu font converter tạo ra file .js tự đăng ký:
// 1. Đặt file font .js vào thư mục public/fonts
// 2. Trong _app.js hoặc một useEffect ở đây, load script đó.

// Tạm thời, chúng ta sẽ giả định font đã được load và đăng ký bằng cách nào đó
// và jsPDF có thể tìm thấy nó bằng tên. Nếu không, chúng ta cần cơ chế load font phức tạp hơn.

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export default function History() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      if (!auth.currentUser) {
        const timer = setTimeout(() => {
          if (!auth.currentUser) router.push('/auth');
        }, 500);
        return () => clearTimeout(timer);
      }
      return;
    }

    const fetchHistory = async () => {
      setLoading(true);
      try {
        // Query 1: Read from the user-specific 'diagnosis' subcollection
        const userDiagnosisQuery = query(
          collection(db, 'users', user.uid, 'diagnosis'), // Path updated
          orderBy('timestamp', 'desc')
        );
        // Query 2: Read from the user-specific 'esp32cam' subcollection
        const userEsp32Query = query(
          collection(db, 'users', user.uid, 'esp32cam'), // Path updated
          orderBy('timestamp', 'desc')
        );

        const [userDiagnosisSnapshot, userEsp32Snapshot] = await Promise.all([
          getDocs(userDiagnosisQuery),
          getDocs(userEsp32Query)
        ]);

        const transformData = (doc) => {
          const data = doc.data();
          const result = data.result || {}; // Use existing result if present (for older data)

          // Map flat fields to the nested 'result' structure if not already there
          // and provide defaults.
          const diseaseName = result.disease || data.diseaseName || 'N/A';
          const confidence = typeof result.confidence === 'number' ? result.confidence : (typeof data.confidence === 'number' ? data.confidence : 0);
          
          // Sửa logic để ưu tiên data.treatment và data.prevention
          const treatment = (result && result.treatment) || data.treatment || data.recommendation || 'N/A';
          const prevention = (result && result.prevention) || data.prevention || 'N/A';
          
          let source = 'Không rõ';
          if (data.platform === 'web') {
            source = 'Web';
          } else if (data.platform === 'flutter') {
            source = 'Mobile App';
          } else if (data.platform === 'esp32cam') {
            source = 'ESP32-CAM';
          } else if (data.source) { // Fallback for older data that might have 'source'
            source = data.source;
          }


          return {
            id: doc.id,
            ...data, // Spread the original data
            result: { // Ensure the result object expected by the component
                disease: diseaseName,
                confidence: confidence,
                treatment: treatment,
                prevention: prevention,
            },
            timestamp: data.timestamp && data.timestamp.toDate ? data.timestamp.toDate() : (data.timestamp ? parseISO(data.timestamp) : new Date()),
            source: source // Use the determined source
          };
        };

        const diagnosisData = userDiagnosisSnapshot.docs.map(transformData);
        const esp32Data = userEsp32Snapshot.docs.map(transformData);

        const combinedData = [...diagnosisData, ...esp32Data];
        combinedData.sort((a, b) => (b.timestamp && a.timestamp ? b.timestamp - a.timestamp : 0));

        setDiagnosisHistory(combinedData);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user, router]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setStartDate(null);
    setEndDate(null);
  };

  const filteredHistory = diagnosisHistory.filter(item => {
    const matchesSearchTerm = item && 
                              item.result && 
                              typeof item.result.disease === 'string' && 
                              item.result.disease.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearchTerm) return false;

    if (startDate && endDate) {
      const itemDate = item.timestamp instanceof Date ? item.timestamp : new Date(item.timestamp);
      if (isNaN(itemDate)) return false;
      return isWithinInterval(itemDate, { start: startOfDay(startDate), end: endOfDay(endDate) });
    } else if (startDate) {
      const itemDate = item.timestamp instanceof Date ? item.timestamp : new Date(item.timestamp);
      if (isNaN(itemDate)) return false;
      return isWithinInterval(itemDate, { start: startOfDay(startDate), end: endOfDay(startDate) });
    } else if (endDate) {
      const itemDate = item.timestamp instanceof Date ? item.timestamp : new Date(item.timestamp);
      if (isNaN(itemDate)) return false;
      return isWithinInterval(itemDate, { start: startOfDay(endDate), end: endOfDay(endDate) });
    }
    return true;
  });

  const handleExportPDF = async () => {
    if (!user) return;
    const doc = new jsPDF();
    let fontToUse = 'Helvetica';
    const FONT_NAME_CUSTOM = 'NotoSansCustom';

    // Tải font (giữ nguyên logic hiện tại của bạn)
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
      console.log("Font NotoSans đã được tải cho PDF Lịch sử.");
    } catch (e) {
      console.error("Lỗi tải font NotoSans cho PDF Lịch sử, dùng Helvetica:", e);
    }
    doc.setFont(fontToUse);

    // Thông tin chung (giữ nguyên)
    doc.setFontSize(18);
    doc.text('Báo cáo Lịch sử Chẩn đoán', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Người dùng: ${user.displayName || user.email || user.uid}`, 14, 30);
    doc.text(`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`, 14, 36);

    // === THÊM BẢNG TỔNG HỢP KẾT QUẢ CHO LỊCH SỬ ===
    let currentY = 45;
    doc.setFontSize(14);
    doc.setFont(fontToUse, 'bold');
    doc.setTextColor(0,0,0);
    doc.text('Tổng hợp kết quả lịch sử:', 14, currentY);
    currentY +=10;
    const diseaseCounts = {};
    let healthyLeavesCount = 0;
    filteredHistory.forEach(item => {
      if (item.error) return; // Bỏ qua các mục lỗi
      const diseaseName = (item.result && item.result.disease) || item.diseaseName || null;
      if (diseaseName) {
        if (diseaseName.toLowerCase() === 'healthy' || diseaseName.toLowerCase() === 'khỏe mạnh') {
          healthyLeavesCount++;
        } else {
          diseaseCounts[diseaseName] = (diseaseCounts[diseaseName] || 0) + 1;
        }
      }
    });
    const summaryTableBody = [];
    for (const disease in diseaseCounts) {
      summaryTableBody.push([disease, diseaseCounts[disease]]);
    }
    if (healthyLeavesCount > 0) {
      summaryTableBody.push(['Lá khỏe mạnh', healthyLeavesCount]);
    }
    if (summaryTableBody.length === 0 && filteredHistory.filter(r => !r.error).length > 0) {
        summaryTableBody.push(['Không xác định được bệnh cụ thể từ kết quả lịch sử.', '']);
    } else if (summaryTableBody.length === 0) {
        summaryTableBody.push(['Không có dữ liệu lịch sử hợp lệ để tổng hợp.', '']);
    }
    autoTable(doc, {
        startY: currentY,
        head: [['Loại bệnh / Tình trạng', 'Số lượng']],
        body: summaryTableBody,
        theme: 'grid',
        styles: { font: fontToUse, fontSize: 10, fontStyle: 'normal', cellPadding: 2, valign: 'middle' },
        headStyles: { font: fontToUse, fontStyle: 'bold', fillColor: [22, 160, 133], textColor: [255,255,255], fontSize: 11, halign: 'center', valign: 'middle' },
        didDrawPage: function (data) { currentY = data.cursor.y; }
    });
    currentY += 15; // Thêm khoảng trống trước bảng chi tiết
    // === KẾT THÚC BẢNG TỔNG HỢP ===

    // === BẮT ĐẦU LOGIC TẢI ẢNH CHO PDF LỊCH SỬ ===
    console.log("Đang tải trước ảnh cho PDF Lịch sử...");
    const imageElementsMap = {};
    // Sử dụng filteredHistory vì đó là dữ liệu đang được hiển thị và sẽ được xuất
    const imagePromises = filteredHistory.map(item => {
      // Giả sử mỗi item trong filteredHistory có thuộc tính imageUrl
      if (item.imageUrl && !item.error) { // Chỉ tải nếu có imageUrl và không phải là item lỗi từ fetch ban đầu
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = () => {
            console.log(`Ảnh Lịch sử đã tải cho PDF: ${item.id || 'unknown_id'}`);
            resolve({ itemId: item.id, imageElement: img, success: true });
          };
          img.onerror = (err) => {
            console.error(`Lỗi tải ảnh PDF Lịch sử cho item ${item.id || 'unknown_id'}:`, err);
            resolve({ itemId: item.id, error: 'Lỗi tải ảnh cho PDF', success: false });
          };
          img.src = item.imageUrl;
        });
      }
      return Promise.resolve({ itemId: item.id, error: item.error || 'Không có ảnh URL', success: false });
    });

    const loadedImageResults = await Promise.allSettled(imagePromises);
    loadedImageResults.forEach(promiseResult => {
      if (promiseResult.status === 'fulfilled') {
        const value = promiseResult.value;
        if (value.success) {
          imageElementsMap[value.itemId] = value.imageElement; // Dùng item.id làm key
        } else {
          imageElementsMap[value.itemId] = value.error || 'Lỗi không xác định khi tải ảnh';
        }
      }
    });
    console.log("Hoàn tất tải trước ảnh cho PDF Lịch sử.", imageElementsMap);
    // === KẾT THÚC LOGIC TẢI ẢNH ===

    // Cập nhật tiêu đề cột và nội dung bảng
    const tableColumn = ["Ngày giờ", "Nguồn", "Bệnh", "Độ chính xác (%)", "Điều trị", "Ảnh"]; // Thêm cột Ảnh
    const tableRows = [];

    filteredHistory.forEach(item => {
      const disease = (item.result && item.result.disease) || item.diseaseName || 'N/A';
      const confidence = (item.result && typeof item.result.confidence === 'number') 
                         ? (item.result.confidence * 100).toFixed(2) 
                         : (typeof item.confidence === 'number' ? (item.confidence * 100).toFixed(2) : 'N/A');
      const treatment = (item.result && item.result.treatment) || item.treatment || item.recommendation || 'N/A';
      // const imageContent = imageElementsMap[item.id]; // Lấy HTMLImageElement hoặc string lỗi

      tableRows.push([
        item.timestamp ? item.timestamp.toLocaleString('vi-VN') : 'N/A',
        item.source || 'Không rõ',
        disease,
        confidence,
        treatment,
        '', // Pass an empty string here. The image will be drawn in didDrawCell.
      ]);
    });

    // LOG KIỂM TRA tableRows ngay trước khi gọi autoTable
    console.log("Dữ liệu tableRows sẽ được truyền vào autoTable (trước stringify):", tableRows);
    // Dùng console.table để xem có cấu trúc hơn không, nhưng có thể không hiện rõ đối tượng Image
    // console.table(tableRows);

    autoTable(doc, { 
      head: [tableColumn], 
      body: tableRows, 
      startY: currentY, // Bắt đầu bảng chi tiết sau bảng tổng hợp
      styles: { font: fontToUse, fontStyle: 'normal', fontSize: 7, rowHeight: 38 }, // Đặt chiều cao dòng cố định
      headStyles: { font: fontToUse, fontStyle: 'bold',fillColor: [22, 160, 133], fontSize: 9, rowHeight: 15 },
      columnStyles: { 
          0: { cellWidth: 27 }, 
          1: { cellWidth: 25 }, 
          2: { cellWidth: 30 }, 
          3: { cellWidth: 20 }, 
          4: { cellWidth: 40 }, 
          5: { cellWidth: 40, minCellHeight: 38 } // Đảm bảo ô ảnh đủ cao
      },
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 5) { 
            const currentRowData = filteredHistory[data.row.index];
            
            if (currentRowData && currentRowData.id) {
                const imgElement = imageElementsMap[currentRowData.id];

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
                        console.error("   Lỗi khi thực sự vẽ ảnh vào ô PDF Lịch sử với addImage:", e);
                        doc.setFontSize(6);
                        doc.setTextColor(255, 0, 0);
                        doc.text("Lỗi vẽ ảnh", data.cell.x + data.cell.padding('left'), data.cell.y + data.cell.padding('top') + 3);
                    }
                } else {
                    doc.setFontSize(6);
                    doc.setTextColor(150, 150, 150);
                    doc.text(typeof imgElement === 'string' ? imgElement : "Ảnh lỗi/N/A", data.cell.x + data.cell.padding('left'), data.cell.y + data.cell.padding('top') + 3);
                }
            } 
        }
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      tableLineColor: [44, 62, 80],
      tableLineWidth: 0.2,
      didDrawPage: function(data) {
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Trang ' + data.pageNumber + '/' + pageCount, data.settings.margin.left, doc.internal.pageSize.height - 10);
      }
    });

    doc.save(`BaoCao_LichSu_${user.uid}_${Date.now()}.pdf`);
    console.log("Đã lưu PDF Lịch sử.");
  };

  if (loading && !user) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }
  
  if (!user && !loading) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography>Vui lòng đăng nhập để xem lịch sử.</Typography>
        </Box>
      </MainLayout>
    );
  }

  if (loading && user) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Lịch sử chẩn đoán
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, alignItems: 'center' }}>
          <TextField
            variant="outlined"
            placeholder="Tìm kiếm theo loại bệnh..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: '100%', sm: 'auto' }, flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <DatePicker
            label="Từ ngày"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{ textField: { variant: 'outlined', fullWidth: true } }}
          />
          <DatePicker
            label="Đến ngày"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{ textField: { variant: 'outlined', fullWidth: true } }}
            minDate={startDate}
          />
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button 
            onClick={handleClearFilters}
            startIcon={<ClearIcon />}
            disabled={!searchTerm && !startDate && !endDate}
          >
            Xóa bộ lọc
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleExportPDF}
            disabled={filteredHistory.length === 0}
            startIcon={<PictureAsPdfIcon />}
          >
            Xuất PDF
          </Button>
        </Box>

        <Grid container spacing={3}>
          {filteredHistory.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imageUrl}
                  alt={item.result?.disease || 'Leaf image'}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.result && item.result.disease ? item.result.disease : 'Không rõ bệnh'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {item.timestamp ? (item.timestamp instanceof Date ? item.timestamp.toLocaleString('vi-VN') : new Date(item.timestamp).toLocaleString('vi-VN')) : 'Không rõ thời gian'}
                  </Typography>
                  <Chip
                    label={item.result && typeof item.result.confidence === 'number' ? `${(item.result.confidence * 100).toFixed(2)}%` : 'N/A'}
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                  {item.source && (
                    <Typography variant="caption" display="block" color="text.secondary" sx={{mt: 0.5}}>
                      Nguồn: {item.source}
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => router.push(`/diagnosis/${item.id}`)}>
                    Xem chi tiết
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredHistory.length === 0 && (
          <Paper sx={{ p: 3, textAlign: 'center', mt: 4 }}>
            <Typography variant="body1" color="text.secondary">
              {searchTerm || startDate || endDate
                ? 'Không tìm thấy kết quả chẩn đoán nào khớp với bộ lọc.'
                : 'Chưa có lịch sử chẩn đoán nào.'}
            </Typography>
          </Paper>
        )}
      </Box>
    </MainLayout>
  );
} 