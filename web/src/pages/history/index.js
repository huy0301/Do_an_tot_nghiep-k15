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
          // 'recommendation' from our flat structure maps to 'treatment' in the component's expectation for 'result'
          const treatment = result.treatment || data.recommendation || 'N/A';
          // 'prevention' might not exist in newer flat data, handled by OR 'N/A'
          const prevention = result.prevention || 'N/A';
          
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

    let fontToUse = 'Helvetica'; // Default fallback font
    const FONT_NAME_CUSTOM = 'NotoSansCustom';

    try {
      // Load Regular font
      const fontRegularUrl = '/fonts/NotoSans-Regular.ttf'; 
      const fontRegularResponse = await fetch(fontRegularUrl);
      if (!fontRegularResponse.ok) {
        throw new Error(`Failed to fetch regular font: ${fontRegularResponse.statusText}`);
      }
      const fontRegularBuffer = await fontRegularResponse.arrayBuffer();
      const base64FontRegular = arrayBufferToBase64(fontRegularBuffer);
      doc.addFileToVFS('NotoSans-Regular.ttf', base64FontRegular);
      doc.addFont('NotoSans-Regular.ttf', FONT_NAME_CUSTOM, 'normal');
      // console.log("Custom font 'NotoSans-Regular' (normal) loaded."); // Optional log

      // Load Bold font
      const fontBoldUrl = '/fonts/NotoSans-Bold.ttf'; 
      const fontBoldResponse = await fetch(fontBoldUrl);
      if (!fontBoldResponse.ok) {
        throw new Error(`Failed to fetch bold font: ${fontBoldResponse.statusText}`);
      }
      const fontBoldBuffer = await fontBoldResponse.arrayBuffer();
      const base64FontBold = arrayBufferToBase64(fontBoldBuffer);
      doc.addFileToVFS('NotoSans-Bold.ttf', base64FontBold);
      doc.addFont('NotoSans-Bold.ttf', FONT_NAME_CUSTOM, 'bold');
      // console.log("Custom font 'NotoSans-Bold' (bold) loaded."); // Optional log

      fontToUse = FONT_NAME_CUSTOM;
      console.log("Font family '", FONT_NAME_CUSTOM, "' with normal and bold styles is now active.");
    } catch (e) {
      console.error("Error loading custom fonts, falling back to Helvetica:", e);
      // fontToUse will remain 'Helvetica'
    }
    
    doc.setFont(fontToUse); // Set the font family, jsPDF will pick normal/bold as needed
    doc.setFontSize(18);
    doc.text('Báo cáo Lịch sử Chẩn đoán', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Người dùng: ${user.displayName || user.email || user.uid}`, 14, 30);
    doc.text(`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`, 14, 36);

    const tableColumn = ["Ngày giờ", "Nguồn", "Bệnh", "Độ chính xác (%)", "Điều trị", "Phòng ngừa"];
    const tableRows = [];
    filteredHistory.forEach(item => {
       tableRows.push([
        item.timestamp ? item.timestamp.toLocaleString('vi-VN') : 'N/A',
        item.source || 'Không rõ',
        item.result && item.result.disease ? item.result.disease : 'N/A',
        item.result && typeof item.result.confidence === 'number' ? (item.result.confidence * 100).toFixed(2) : 'N/A',
        (item.result && item.result.treatment) || 'N/A',
        (item.result && item.result.prevention) || 'N/A',
      ]);
    });
    autoTable(doc, { 
      head: [tableColumn], 
      body: tableRows, 
      startY: 45,
      styles: { font: fontToUse, fontStyle: 'normal', fontSize: 7 },
      headStyles: { 
        font: fontToUse, 
        fontStyle: 'bold',
        fillColor: [22, 160, 133],
        fontSize: 9
      },
      columnStyles: {
        0: { cellWidth: 27 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30 },
        3: { cellWidth: 20 },
        4: { cellWidth: 40 },
        5: { cellWidth: 40 }
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      tableLineColor: [44, 62, 80],
      tableLineWidth: 0.2,
    });

    doc.save(`bao_cao_chan_doan_${user.uid}_${Date.now()}.pdf`);
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