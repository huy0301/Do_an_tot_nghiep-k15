import React, { useState, useRef } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ImageUploader = ({ onImageUpload }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFileCount, setSelectedFileCount] = useState(0);

  // Refs for the hidden file and directory input elements
  const fileInputRef = useRef(null);
  const directoryInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setSelectedFileCount(0);
      // Reset input value to allow re-selection of the same files/folder
      event.target.value = null; 
      return;
    }

    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      alert('Không tìm thấy file ảnh nào hoặc định dạng không được hỗ trợ.');
      setSelectedFileCount(0);
      event.target.value = null;
      return;
    }

    setSelectedFileCount(imageFiles.length);
    setLoading(true);
    try {
      await onImageUpload(imageFiles);
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Có lỗi xảy ra khi xử lý các ảnh.');
      setSelectedFileCount(0);
    } finally {
      setLoading(false);
      event.target.value = null; 
    }
  };

  // Handler to trigger file input click
  const handleSelectFilesClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handler to trigger directory input click
  const handleSelectDirectoryClick = () => {
    if (directoryInputRef.current) {
      directoryInputRef.current.click();
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
      {/* Hidden input for file selection */}
      <input
        ref={fileInputRef}
        accept="image/*" // Specify accepted image types
        style={{ display: 'none' }}
        id="file-upload-input"
        type="file"
        multiple // Allow multiple file selection
        onChange={handleFileChange}
      />
      {/* Hidden input for directory selection */}
      <input
        ref={directoryInputRef}
        style={{ display: 'none' }}
        id="directory-upload-input"
        type="file"
        webkitdirectory=""
        directory=""
        onChange={handleFileChange}
      />
      
      {/* Main upload box triggers file selection */}
      <UploadBox onClick={handleSelectFilesClick}>
        {loading ? (
          <CircularProgress />
        ) : selectedFileCount > 0 ? (
          <Box>
            <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Đã chọn {selectedFileCount} ảnh.
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Nhấn vào đây để chọn lại tệp hoặc thư mục khác.
            </Typography>
          </Box>
        ) : (
          <Box>
            <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Kéo thả hoặc nhấn để tải TỆP ảnh lên
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Hỗ trợ: JPG, PNG
            </Typography>
          </Box>
        )}
      </UploadBox>

      {/* Button to specifically select a directory */}
      {!loading && selectedFileCount === 0 && (
        <Button
          variant="outlined"
          onClick={handleSelectDirectoryClick}
          sx={{ mt: 2, display: 'block', mx: 'auto' }}
        >
          Hoặc chọn cả thư mục
        </Button>
      )}
    </Box>
  );
};

export default ImageUploader; 