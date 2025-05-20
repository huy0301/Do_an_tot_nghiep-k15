import * as tf from '@tensorflow/tfjs';

class MLService {
  constructor() {
    this.model = null;
    this.isModelLoaded = false;
  }

  async loadModel() {
    try {
      // TODO: Thay thế URL bằng URL thực của model đã được convert sang TensorFlow.js
      this.model = await tf.loadGraphModel('/modeljs/model.json');
      this.isModelLoaded = true;
      console.log('Graph Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      throw error;
    }
  }

  async preprocessImage(imageElement) {
    // Convert image to tensor
    const tensor = tf.browser.fromPixels(imageElement);
    
    // Resize image to match model input size
    const resized = tf.image.resizeBilinear(tensor, [300, 300]);
    
    // Bỏ qua bước chuẩn hóa
    // const normalized = resized.div(255.0);
    
    // Add batch dimension
    // const batched = normalized.expandDims(0);
    const batched = resized.expandDims(0); // Sử dụng resized trực tiếp nếu không chuẩn hóa
    
    // Clean up tensors
    tensor.dispose();
    // resized.dispose(); // Không dispose resized nếu nó là output
    // normalized.dispose();
    
    return batched;
  }

  async predict(imageElement) {
    if (!this.isModelLoaded) {
      await this.loadModel();
    }

    try {
      // Preprocess image
      const preprocessed = await this.preprocessImage(imageElement);
      
      // Get prediction
      const prediction = await this.model.predict(preprocessed);
      
      // Get class with highest probability
      const probabilities = await prediction.data();
      const maxIndex = probabilities.indexOf(Math.max(...probabilities));
      
      // Clean up tensors
      preprocessed.dispose();
      prediction.dispose();
      
      // TODO: Thay thế bằng danh sách classes thực tế
      const classes = ['Black Rot', 'frog_eye_leaf_spot', 'healthy', 'powdery_mildew', 'rust', 'scab'];
      
      return {
        disease: classes[maxIndex],
        confidence: probabilities[maxIndex],
        treatment: this.getTreatment(classes[maxIndex]),
        prevention: this.getPrevention(classes[maxIndex])
      };
    } catch (error) {
      console.error('Error during prediction:', error);
      throw error;
    }
  }

  getTreatment(disease) {
    // TODO: Thay thế bằng dữ liệu thực tế
    const treatments = {
      'Black Rot': 'Loại bỏ cành, quả bị bệnh. Phun thuốc фунгицид có chứa captan hoặc mancozeb theo hướng dẫn. Đảm bảo cây đủ dinh dưỡng và nước.',
      'frog_eye_leaf_spot': 'Cắt tỉa và tiêu hủy lá bị bệnh. Phun thuốc фунгицид có gốc đồng hoặc mancozeb. Cải thiện lưu thông không khí xung quanh cây.',
      'healthy': 'Không cần điều trị, duy trì chăm sóc tốt.',
      'powdery_mildew': 'Phun thuốc фунгициd chứa lưu huỳnh, myclobutanil hoặc trifloxystrobin. Cắt tỉa cành bị nhiễm nặng. Tăng cường lưu thông không khí.',
      'rust': 'Loại bỏ lá và cành bị bệnh. Phun thuốc фунгициd có chứa myclobutanil, propiconazole hoặc triadimefon. Tránh trồng gần cây bách xù (juniper).',
      'scab': 'Phun thuốc фунгициd như captan, mancozeb, hoặc dodine. Vệ sinh vườn, loại bỏ lá rụng và quả bị bệnh. Chọn giống kháng bệnh nếu có thể.'
    };
    return treatments[disease] || 'Không có thông tin điều trị';
  }

  getPrevention(disease) {
    // TODO: Thay thế bằng dữ liệu thực tế
    const preventions = {
      'Black Rot': 'Vệ sinh vườn triệt để, loại bỏ quả khô, cành chết. Cắt tỉa táo táo thông thoáng. Tránh làm tổn thương vỏ cây.',
      'frog_eye_leaf_spot': 'Thu gom và tiêu hủy lá rụng vào cuối mùa. Cắt tỉa hợp lý để tăng lưu thông không khí. Bón phân cân đối.',
      'healthy': 'Duy trì lịch tưới nước và bón phân đều đặn. Kiểm tra cây thường xuyên để phát hiện sớm dấu hiệu bệnh.',
      'powdery_mildew': 'Chọn giống kháng bệnh. Trồng cây ở nơi có đủ nắng và thông thoáng. Tránh tưới nước lên lá vào buổi tối.',
      'rust': 'Không trồng cây táo gần cây bách xù hoặc các cây thuộc chi Juniperus. Kiểm tra và loại bỏ sớm các ổ bệnh trên cây bách xù nếu có.',
      'scab': 'Vệ sinh vườn sạch sẽ, đặc biệt là loại bỏ lá rụng vào mùa thu. Chọn giống kháng bệnh. Phun thuốc phòng ngừa vào đầu mùa xuân trước khi lá non nhú.'
    };
    return preventions[disease] || 'Không có thông tin phòng ngừa';
  }
}

export const mlService = new MLService(); 