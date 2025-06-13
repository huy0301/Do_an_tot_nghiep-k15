import * as tf from '@tensorflow/tfjs';

class MLService {
  constructor() {
    this.model = null;
    this.isModelLoaded = false;
  }

  async loadModel() {
    try {
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
      
      //
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
    //
    const treatments = {
      'Black Rot': `
- Biện pháp canh tác:
  + Cắt bỏ và tiêu hủy ngay lập tức các cành, lá, và quả bị nhiễm bệnh để giảm nguồn lây lan.
  + Loại bỏ các quả khô (xác quả) còn sót lại trên cây từ vụ trước vì đây là nguồn bệnh chính.
- Biện pháp hóa học:
  + Phun thuốc trừ nấm gốc đồng (Bordeaux, Copper Oxychloride) vào giai đoạn cây ngủ đông.
  + Trong mùa sinh trưởng, sử dụng các loại thuốc như Captan, Mancozeb, Myclobutanil hoặc Thiophanate-methyl. Tuân thủ lịch phun và liều lượng theo khuyến cáo.`,
      'frog_eye_leaf_spot': `
- Biện pháp canh tác:
  + Vệ sinh vườn: Thu gom và tiêu hủy toàn bộ lá rụng vào cuối mùa vụ.
  + Cắt tỉa: Tạo tán cây thông thoáng, loại bỏ các cành lá rậm rạp để giảm độ ẩm và tăng cường lưu thông không khí.
- Biện pháp hóa học:
  + Sử dụng các loại thuốc trừ nấm chứa hoạt chất như Mancozeb, Captan, hoặc các loại thuốc nhóm Strobilurin (ví dụ: Trifloxystrobin). Phun khi các triệu chứng đầu tiên xuất hiện và lặp lại theo chu kỳ 10-14 ngày.`,
      'healthy': 'Cây khỏe mạnh, không cần điều trị. Duy trì chế độ chăm sóc tốt, tưới nước và bón phân định kỳ để cây phát triển tối ưu.',
      'powdery_mildew': `
- Biện pháp canh tác:
  + Chọn giống kháng bệnh nếu có thể.
  + Cắt tỉa và tiêu hủy các chồi hoặc cành bị nhiễm bệnh nặng vào đầu mùa.
  + Trồng cây ở nơi có ánh sáng mặt trời đầy đủ và thông thoáng.
- Biện pháp hóa học:
  + Phun dầu khoáng hoặc dầu neem vào giai đoạn sớm để ngăn chặn sự phát triển của nấm.
  + Sử dụng các loại thuốc trừ nấm chuyên trị như Myclobutanil, Fenarimol, hoặc các thuốc gốc Lưu huỳnh. Phun luân phiên các loại thuốc để tránh kháng thuốc.`,
      'rust': `
- Biện pháp canh tác (Rất quan trọng):
  + Loại bỏ ký chủ phụ: Không trồng táo gần các loại cây bách xù (Juniperus) vì nấm gỉ sắt cần cả hai ký chủ để hoàn thành vòng đời. Nếu có, hãy loại bỏ hoặc kiểm tra và cắt bỏ các u bệnh trên cây bách xù.
  + Cắt bỏ và tiêu hủy lá, cành có triệu chứng bệnh.
- Biện pháp hóa học:
  + Phun thuốc phòng ngừa từ khi nụ hoa bắt đầu nở. Sử dụng các hoạt chất như Myclobutanil, Fenarimol, hoặc Mancozeb.`,
      'scab': `
- Biện pháp canh tác:
  + Vệ sinh: Tiêu hủy lá rụng là biện pháp quan trọng hàng đầu. Có thể cào và đốt, hoặc dùng máy cắt cỏ có túi gom để nghiền nát lá, hoặc phun urê 5% lên lá rụng để đẩy nhanh quá trình phân hủy.
- Chọn giống: Luôn ưu tiên các giống kháng bệnh ghẻ khi trồng mới.
- Tưới tiêu: Tránh tưới nước lên lá. Sử dụng hệ thống tưới nhỏ giọt.
- Lịch phun thuốc: Theo dõi dự báo thời tiết và phun thuốc phòng ngừa trước các đợt mưa kéo dài trong mùa xuân.`
    };
    return treatments[disease] || 'Hiện chưa có thông tin điều trị chi tiết cho bệnh này. Vui lòng tham khảo ý kiến chuyên gia nông nghiệp.';
  }

  getPrevention(disease) {
    // TODO: Thay thế bằng dữ liệu thực tế
    const preventions = {
      'Black Rot': `
- Vệ sinh vườn: Đây là biện pháp quan trọng nhất. Loại bỏ hoàn toàn các quả khô còn treo trên cây và quả rụng dưới đất. Cắt bỏ các cành khô, cành chết và các vết loét trên thân cây.
- Cắt tỉa: Duy trì tán cây thông thoáng để giảm độ ẩm và giúp thuốc phun phủ đều.
- Quản lý côn trùng và tổn thương: Tránh gây ra các vết thương không cần thiết trên vỏ cây. Kiểm soát côn trùng gây hại có thể tạo đường vào cho nấm.
- Bón phân cân đối: Cây khỏe mạnh có khả năng chống chịu bệnh tốt hơn.`,
      'frog_eye_leaf_spot': `
- Vệ sinh: Thu gom và đốt hoặc ủ chôn lá rụng vào mùa thu để tiêu diệt nguồn bệnh trú đông.
- Cắt tỉa: Hàng năm, cắt tỉa cành để cải thiện luồng không khí và sự xâm nhập của ánh sáng vào tán cây.
- Bón phân: Tránh bón thừa đạm vì sẽ làm lá non phát triển quá mức, dễ bị nhiễm bệnh hơn. Bón phân cân đối N-P-K.`,
      'healthy': 'Duy trì lịch tưới nước và bón phân đều đặn. Thường xuyên kiểm tra cây để phát hiện sớm các dấu hiệu bất thường. Cắt tỉa cành lá đúng kỹ thuật để cây thông thoáng.',
      'powdery_mildew': `
- Chọn giống: Lựa chọn các giống táo có khả năng kháng bệnh phấn trắng.
- Vị trí trồng: Đảm bảo cây được trồng ở nơi có đủ ánh sáng mặt trời và không khí lưu thông tốt.
- Cắt tỉa: Loại bỏ các chồi non bị nhiễm bệnh ngay khi chúng xuất hiện vào mùa xuân.
- Tưới nước: Tưới nước vào gốc cây, tránh làm ướt lá, đặc biệt là vào buổi chiều tối vì độ ẩm cao vào ban đêm tạo điều kiện cho nấm phát triển.`,
      'rust': `
- Loại bỏ ký chủ phụ: Biện pháp hiệu quả nhất là loại bỏ tất cả các cây thuộc chi Bách xù (Juniperus) trong bán kính ít nhất 1-2 km. Nếu không thể, hãy thường xuyên kiểm tra cây bách xù vào mùa xuân và cắt bỏ các túi bào tử màu cam.
- Chọn giống: Một số giống táo có khả năng kháng bệnh gỉ sắt tốt hơn các giống khác.
- Phun thuốc phòng ngừa: Nếu bệnh thường xuyên xảy ra, có thể phun thuốc trừ nấm vào giai đoạn hoa nở để bảo vệ cây.`,
      'scab': `
- Vệ sinh: Tiêu hủy lá rụng là biện pháp quan trọng hàng đầu. Có thể cào và đốt, hoặc dùng máy cắt cỏ có túi gom để nghiền nát lá, hoặc phun urê 5% lên lá rụng để đẩy nhanh quá trình phân hủy.
- Chọn giống: Luôn ưu tiên các giống kháng bệnh ghẻ khi trồng mới.
- Tưới tiêu: Tránh tưới nước lên lá. Sử dụng hệ thống tưới nhỏ giọt.
- Lịch phun thuốc: Theo dõi dự báo thời tiết và phun thuốc phòng ngừa trước các đợt mưa kéo dài trong mùa xuân.`
    };
    return preventions[disease] || 'Hiện chưa có thông tin phòng ngừa chi tiết cho bệnh này. Vui lòng tham khảo ý kiến chuyên gia nông nghiệp.';
  }
}

export const mlService = new MLService(); 