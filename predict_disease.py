import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import cv2 # OpenCV được sử dụng nếu bạn muốn các cách khác để tải/xử lý ảnh
import math # Cần cho hàm GELU
from tensorflow.keras.layers import (
    GlobalAveragePooling2D, Dense, Activation, Conv2D, BatchNormalization, 
    DepthwiseConv2D, AveragePooling2D, add
)
from tensorflow.keras.models import Sequential # Cần cho ResMLP

# Định nghĩa các hằng số
IMG_WIDTH = 300
IMG_HEIGHT = 300
MODEL_PATH = './web/public/modeljs'
CLASS_NAMES = ['Black Rot', 'frog_eye_leaf_spot', 'healthy', 'powdery_mildew', 'rust', 'scab']

# --- BẮT ĐẦU ĐỊNH NGHĨA CÁC LỚP/HÀM TÙY CHỈNH TỪ NOTEBOOK ---
def h_sigmoid(x):
    res = tf.nn.relu6(x + 3) / 6
    return res

def h_swish(x):
    res = x * h_sigmoid(x)
    return res

class SEBlock(tf.keras.layers.Layer):
    def __init__(self, input_channels, r=16, **kwargs): # Thêm **kwargs
        super(SEBlock, self).__init__(**kwargs) # Thêm **kwargs
        self.input_channels = input_channels # Lưu input_channels
        self.r = r # Lưu r
        self.P1 = GlobalAveragePooling2D()
        self.D1 = Dense(input_channels // r)
        self.A1 = Activation('relu')
        self.D2 = Dense(input_channels)

    def call(self, inputs, **kwargs):
        branch = self.P1(inputs)
        branch = self.D1(branch)
        branch = self.A1(branch)
        branch = self.D2(branch)
        branch = h_sigmoid(branch)
        branch = tf.expand_dims(input=branch, axis=1)
        branch = tf.expand_dims(input=branch, axis=1)
        y = inputs * branch
        return y
    
    # Thêm get_config để lưu và tải đúng cách
    def get_config(self):
        config = super(SEBlock, self).get_config()
        config.update({
            "input_channels": self.input_channels,
            "r": self.r
        })
        return config

class BottleNeck(tf.keras.layers.Layer):
    def __init__(self, in_size, exp_size, out_size, s, is_se_existing, NL, k, **kwargs): #Thêm **kwargs
        super(BottleNeck, self).__init__(**kwargs) #Thêm **kwargs
        self.in_size = in_size
        self.exp_size = exp_size
        self.out_size = out_size
        self.stride = s
        self.is_se_existing = is_se_existing
        self.NL = NL
        self.k = k

        self.C1 = Conv2D(filters=exp_size, kernel_size=(1, 1), strides=1, padding='same')
        self.B1 = BatchNormalization()

        self.DWC1 = DepthwiseConv2D(kernel_size=(k, k), strides=s, padding='same')
        self.B2 = BatchNormalization()

        if self.is_se_existing: # Chỉ tạo SEBlock nếu cần
            self.se = SEBlock(input_channels=exp_size)
        self.C2 = Conv2D(filters=out_size, kernel_size=(1, 1), strides=1, padding='same')
        self.B3 = BatchNormalization()
        self.linear = Activation(tf.keras.activations.linear)

    def call(self, inputs, training=None, **kwargs):
        x = self.C1(inputs)
        x = self.B1(x, training=training)

        if self.NL == 'HS':
            x = h_swish(x)
        elif self.NL == 'RE':
            x = tf.nn.relu6(x)

        x = self.DWC1(x)
        x = self.B2(x, training=training)

        if self.NL == 'HS':
            x = h_swish(x)
        elif self.NL == 'RE':
            x = tf.nn.relu6(x)

        if self.is_se_existing:
            x = self.se(x)

        x = self.C2(x)
        x = self.B3(x)
        y = self.linear(x)

        if self.stride == 1 and self.in_size == self.out_size:
            y = add([y, inputs])
        return y

    def get_config(self):
        config = super(BottleNeck, self).get_config()
        config.update({
            "in_size": self.in_size,
            "exp_size": self.exp_size,
            "out_size": self.out_size,
            "s": self.stride,
            "is_se_existing": self.is_se_existing,
            "NL": self.NL,
            "k": self.k
        })
        return config

class MobileNetV3Small(tf.keras.layers.Layer):
    def __init__(self, input_shape, **kwargs): #Thêm **kwargs
        super(MobileNetV3Small, self).__init__(**kwargs) #Thêm **kwargs
        self.input_shape_custom = input_shape # Lưu input_shape

        self.C1 = Conv2D(filters=16, kernel_size=(3, 3), strides=2, padding="same", input_shape=input_shape)
        self.B1 = BatchNormalization()
        self.bneck1 = BottleNeck(in_size=16, exp_size=16, out_size=16, s=2, is_se_existing=True, NL="RE", k=3)
        self.bneck2 = BottleNeck(in_size=16, exp_size=72, out_size=24, s=2, is_se_existing=False, NL="RE", k=3)
        self.bneck3 = BottleNeck(in_size=24, exp_size=88, out_size=24, s=1, is_se_existing=False, NL="RE", k=3)
        self.bneck4 = BottleNeck(in_size=24, exp_size=96, out_size=40, s=2, is_se_existing=True, NL="HS", k=5)
        self.bneck5 = BottleNeck(in_size=40, exp_size=240, out_size=40, s=1, is_se_existing=True, NL="HS", k=5)
        self.bneck6 = BottleNeck(in_size=40, exp_size=240, out_size=40, s=1, is_se_existing=True, NL="HS", k=5)
        self.bneck7 = BottleNeck(in_size=40, exp_size=120, out_size=48, s=1, is_se_existing=True, NL="HS", k=5)
        self.bneck8 = BottleNeck(in_size=48, exp_size=144, out_size=48, s=1, is_se_existing=True, NL="HS", k=5)
        self.bneck9 = BottleNeck(in_size=48, exp_size=288, out_size=96, s=2, is_se_existing=True, NL="HS", k=5)
        self.bneck10 = BottleNeck(in_size=96, exp_size=576, out_size=96, s=1, is_se_existing=True, NL="HS", k=5)
        self.bneck11 = BottleNeck(in_size=96, exp_size=576, out_size=96, s=1, is_se_existing=True, NL="HS", k=5)

        self.C2 = Conv2D(filters=576, kernel_size=(1, 1), strides=1, padding="same")
        self.B2 = BatchNormalization()
        self.P1 = AveragePooling2D(pool_size=(7, 7), strides=1)
        self.C3 = Conv2D(filters=1280, kernel_size=(1, 1), strides=1, padding="same")
        self.C4 = Conv2D(filters=1024, kernel_size=(1, 1), strides=1, padding="same", activation='softmax')
        self.P2 = GlobalAveragePooling2D()
        
    def call(self, inputs, training=None, mask=None):
        x = self.C1(inputs)
        x = self.B1(x, training=training)
        x = h_swish(x)

        x = self.bneck1(x, training=training)
        x = self.bneck2(x, training=training)
        x = self.bneck3(x, training=training)
        x = self.bneck4(x, training=training)
        x = self.bneck5(x, training=training)
        x = self.bneck6(x, training=training)
        x = self.bneck7(x, training=training)
        x = self.bneck8(x, training=training)
        x = self.bneck9(x, training=training)
        x = self.bneck10(x, training=training)
        x = self.bneck11(x, training=training)

        x = self.C2(x)
        x = self.B2(x, training=training)
        x = h_swish(x)
        x = self.P1(x)
        x = self.C3(x)
        x = h_swish(x)
        x = self.C4(x)
        y = self.P2(x)
        return y

    def get_config(self):
        config = super(MobileNetV3Small, self).get_config()
        config.update({"input_shape": self.input_shape_custom})
        return config

def GELU(x):
    res = 0.5 * x * (1 + tf.nn.tanh(math.sqrt(2 / math.pi) * (x + 0.044715 * (x ** 3))))
    return res

class ResMLPBlock(tf.keras.layers.Layer):
    def __init__(self, units, residual_path, **kwargs): #Thêm **kwargs
        super(ResMLPBlock, self).__init__(**kwargs) #Thêm **kwargs
        self.units = units
        self.residual_path = residual_path
        self.D1 = Dense(units, activation='relu')
        self.D2 = Dense(units, activation='relu')

        if self.residual_path:
            self.D3 = Dense(units)
            self.D4 = Dense(units)

    def call(self, inputs):
        residual = inputs
        x = self.D1(inputs)
        y = self.D2(x)

        if self.residual_path:
            residual = self.D3(inputs)
            residual = GELU(residual)
            residual = self.D4(residual)
            residual = GELU(residual)

        output = y + residual
        return output

    def get_config(self):
        config = super(ResMLPBlock, self).get_config()
        config.update({
            "units": self.units,
            "residual_path": self.residual_path
        })
        return config

class ResMLP(tf.keras.layers.Layer):
    def __init__(self, initial_filters, block_list, num_classes, **kwargs): #Thêm **kwargs
        super(ResMLP, self).__init__(**kwargs) #Thêm **kwargs
        self.initial_filters_config = initial_filters # Đổi tên để tránh xung đột
        self.block_list = block_list
        self.num_classes = num_classes

        self.D1 = Dense(self.initial_filters_config, activation='relu')
        self.B1 = BatchNormalization()

        self.blocks = Sequential() # Sử dụng tf.keras.models.Sequential
        current_filters = self.initial_filters_config
        for block_id in range(len(block_list)):
            for layer_id in range(block_list[block_id]):
                if block_id != 0 and layer_id == 0:
                    block = ResMLPBlock(units=current_filters, residual_path=True)
                else:
                    block = ResMLPBlock(units=current_filters, residual_path=False)
                self.blocks.add(block)
            current_filters *= 2 # Cập nhật cho block tiếp theo dựa trên current_filters

        self.D2 = Dense(num_classes, activation='softmax')

    def call(self, inputs):
        x = self.D1(inputs)
        x = self.B1(x)
        x = self.blocks(x)
        y = self.D2(x)
        return y

    def get_config(self):
        config = super(ResMLP, self).get_config()
        config.update({
            "initial_filters": self.initial_filters_config, #Sử dụng tên đã đổi
            "block_list": self.block_list,
            "num_classes": self.num_classes
        })
        return config

class NeuralNetwork(tf.keras.Model): # Kế thừa từ tf.keras.Model
    def __init__(self, input_shape, initial_filters, block_list, num_classes, **kwargs): #Thêm **kwargs
        super(NeuralNetwork, self).__init__(**kwargs) #Thêm **kwargs
        self.input_shape_config = input_shape # Đổi tên
        self.initial_filters_config = initial_filters # Đổi tên
        self.block_list_config = block_list # Đổi tên
        self.num_classes_config = num_classes # Đổi tên
        
        self.layer1 = MobileNetV3Small(input_shape=input_shape)
        self.layer2 = ResMLP(initial_filters=initial_filters, block_list=block_list, num_classes=num_classes)
        
    def call(self, x):
        x = self.layer1(x)
        y = self.layer2(x)
        return y

    def get_config(self): # Cần thiết cho việc lưu/tải model subclassed
        config = super(NeuralNetwork, self).get_config()
        config.update({
            "input_shape": self.input_shape_config,
            "initial_filters": self.initial_filters_config,
            "block_list": self.block_list_config,
            "num_classes": self.num_classes_config
        })
        return config
# --- KẾT THÚC ĐỊNH NGHĨA CÁC LỚP/HÀM TÙY CHỈNH ---

# Tải mô hình đã lưu với các đối tượng tùy chỉnh
custom_objects = {
    'h_sigmoid': h_sigmoid,
    'h_swish': h_swish,
    'SEBlock': SEBlock,
    'BottleNeck': BottleNeck,
    'MobileNetV3Small': MobileNetV3Small,
    'GELU': GELU,
    'ResMLPBlock': ResMLPBlock,
    'ResMLP': ResMLP,
    'NeuralNetwork': NeuralNetwork
}
try:
    model = tf.keras.models.load_model(MODEL_PATH, custom_objects=custom_objects)
    print(f"Mô hình đã được tải thành công từ {MODEL_PATH} với các đối tượng tùy chỉnh.")
except Exception as e:
    print(f"Lỗi khi tải mô hình với các đối tượng tùy chỉnh: {e}")
    model = None

def preprocess_image(img_path):
    """
    Tải và tiền xử lý một hình ảnh để dự đoán.
    """
    try:
        img = image.load_img(img_path, target_size=(IMG_HEIGHT, IMG_WIDTH))
        img_array = image.img_to_array(img) # Chuyển đổi sang mảng numpy, giá trị pixel [0, 255], dtype=float32
        # Mô hình được huấn luyện với pixel trong khoảng [0, 255] vì ImageDataGenerator không có rescale
        img_array_expanded_dims = np.expand_dims(img_array, axis=0)
        return img_array_expanded_dims
    except Exception as e:
        print(f"Lỗi khi tiền xử lý hình ảnh {img_path}: {e}")
        return None

def predict_disease(image_path, loaded_model, class_names_list):
    """
    Dự đoán bệnh cho một hình ảnh đầu vào.
    """
    if loaded_model is None:
        print("Mô hình chưa được tải. Không thể dự đoán.")
        return None

    processed_image = preprocess_image(image_path)
    if processed_image is None:
        return None

    predictions = loaded_model.predict(processed_image)
    
    # predictions là một mảng các xác suất, ví dụ: [[0.1, 0.2, 0.7, ...]]
    predicted_class_index = np.argmax(predictions[0])
    predicted_class_name = class_names_list[predicted_class_index]
    confidence = np.max(predictions[0])
    
    return predicted_class_name, confidence

if __name__ == '__main__':
    # Thay thế 'path_to_your_image.jpg' bằng đường dẫn thực tế đến hình ảnh bạn muốn dự đoán
    test_image_path = 'path_to_your_image.jpg' 
    
    print(f"Đang dự đoán cho hình ảnh: {test_image_path}")
    
    # Tạo một file ảnh giả để kiểm thử nếu bạn không có sẵn
    # Ví dụ: tạo một ảnh đen 300x300
    try:
        # Kiểm tra xem người dùng đã thay thế đường dẫn ảnh mẫu chưa
        if test_image_path == 'path_to_your_image.jpg':
            print("\nCẢNH BÁO: Vui lòng thay thế 'path_to_your_image.jpg' bằng đường dẫn thực tế đến hình ảnh của bạn.")
            # Tạo một ảnh giả để script có thể chạy
            dummy_image = np.zeros((IMG_HEIGHT, IMG_WIDTH, 3), dtype=np.uint8)
            cv2.imwrite("dummy_test_image.jpg", dummy_image)
            test_image_path = "dummy_test_image.jpg"
            print(f"Đã tạo ảnh giả tại '{test_image_path}' để kiểm thử. Kết quả dự đoán trên ảnh này có thể không có ý nghĩa.\n")

        predicted_class, confidence_score = predict_disease(test_image_path, model, CLASS_NAMES)
        
        if predicted_class and confidence_score:
            print(f"Lớp bệnh được dự đoán: {predicted_class}")
            print(f"Độ tin cậy: {confidence_score*100:.2f}%")
            
    except Exception as e:
        print(f"Đã xảy ra lỗi trong quá trình dự đoán: {e}")

    # Có thể bạn muốn xóa ảnh giả sau khi kiểm thử
    # import os
    # if test_image_path == "dummy_test_image.jpg" and os.path.exists("dummy_test_image.jpg"):
    #     os.remove("dummy_test_image.jpg")

# Hướng dẫn sử dụng:
# 1. Đảm bảo bạn đã cài đặt TensorFlow, NumPy và OpenCV (ví dụ: pip install tensorflow numpy opencv-python).
# 2. Đảm bảo rằng mô hình đã lưu ('./model/mobilenetV3_resmlp') tồn tại trong cùng thư mục hoặc cung cấp đường dẫn chính xác.
# 3. Thay đổi 'path_to_your_image.jpg' trong khối if __name__ == '__main__': thành đường dẫn đến hình ảnh bạn muốn kiểm tra.
# 4. Chạy script: python predict_disease.py
#
# Lưu ý quan trọng về các lớp tùy chỉnh:
# Nếu mô hình của bạn sử dụng các lớp tùy chỉnh (như SEBlock, BottleNeck, v.v.) và chúng không được
# tự động nhận dạng khi tải mô hình, bạn có thể cần phải:
#   a) Định nghĩa các lớp này trong file predict_disease.py trước khi gọi tf.keras.models.load_model.
#   b) Hoặc, nếu bạn đã lưu mô hình bằng cách sử dụng net.save(MODEL_PATH, save_format='tf'), 
#      TensorFlow thường có thể tải nó mà không cần định nghĩa lại các lớp một cách rõ ràng.
#      Script này giả định trường hợp (b). Nếu gặp lỗi liên quan đến lớp tùy chỉnh, hãy xem xét phương án (a).
#
#   Ví dụ về việc truyền các đối tượng tùy chỉnh (nếu cần):
#   custom_objects = {
#       'h_sigmoid': h_sigmoid, 
#       'h_swish': h_swish, 
#       'SEBlock': SEBlock, 
#       'BottleNeck': BottleNeck,
#       'MobileNetV3Small': MobileNetV3Small,
#       'GELU': GELU,
#       'ResMLPBlock': ResMLPBlock,
#       'ResMLP': ResMLP,
#       'NeuralNetwork': NeuralNetwork
#   }
#   model = tf.keras.models.load_model(MODEL_PATH, custom_objects=custom_objects)
#   (Bạn sẽ cần định nghĩa các hàm/lớp h_sigmoid, h_swish, SEBlock, v.v. trong file này) 