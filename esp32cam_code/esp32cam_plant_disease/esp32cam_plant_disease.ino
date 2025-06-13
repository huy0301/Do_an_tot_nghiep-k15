#include "esp_camera.h"
#include <WiFi.h>
#include <WebSocketsServer.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>
#include "camera_pins.h"

const char* ssid = "Esp_8266";
const char* password = "0000000000";


//IPAddress local_IP(192, 168, 1, 184);
//IPAddress gateway(192, 168, 1, 1); 
//IPAddress subnet(255, 255, 255, 0);

IPAddress local_IP(172, 20, 10, 10);  
IPAddress gateway(172, 20, 10, 1);     
IPAddress subnet(255, 255, 255, 240);  

// ESP32-CAM pins
#define CAMERA_MODEL_AI_THINKER // Has PSRAM
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
WebSocketsServer webSocket = WebSocketsServer(81);

bool cameraInitialized = false;
bool spiffsInitialized = false;
bool wifiConnected = false;

void setupLedFlash(int pin);

// Function to setup LED Flash
void setupLedFlash(int pin) {
  pinMode(pin, OUTPUT);
  digitalWrite(pin, LOW);
}

void initCamera() {
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sccb_sda = SIOD_GPIO_NUM;
  config.pin_sccb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.frame_size = FRAMESIZE_UXGA;
  config.pixel_format = PIXFORMAT_JPEG;  // for streaming
  config.grab_mode = CAMERA_GRAB_WHEN_EMPTY;
  config.fb_location = CAMERA_FB_IN_PSRAM;
  config.jpeg_quality = 12;
  config.fb_count = 1;

  
  if (config.pixel_format == PIXFORMAT_JPEG) {
    if (psramFound()) {
      config.jpeg_quality = 8;
      config.fb_count = 2;
      config.grab_mode = CAMERA_GRAB_LATEST;
    } else {
      // Limit the frame size when PSRAM is not available
      config.frame_size = FRAMESIZE_SVGA;
      config.fb_location = CAMERA_FB_IN_DRAM;
    }
  }

  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }

  sensor_t *s = esp_camera_sensor_get();

  // CÀI ĐẶT CHO CẢM BIẾN (OV2640 hoặc chung)
  // Thử nghiệm với các giá trị này để cải thiện màu sắc và độ sáng
  // s->set_vflip(s, 1);      // Bỏ comment nếu ảnh bị lật ngược theo chiều dọc
  // s->set_hmirror(s, 1);    // Bỏ comment nếu ảnh bị lật ngược theo chiều ngang
  
  s->set_brightness(s, 0); // Giá trị từ -2 đến 2. Thử 0 (mặc định), 1 (sáng hơn).
  s->set_contrast(s, 0);   // Giá trị từ -2 đến 2. Thử 0 (mặc định), 1 (tương phản cao hơn).
  s->set_saturation(s, 0); // Giá trị từ -2 đến 2. Thử 0 (mặc định) hoặc 1 để màu sắc đậm hơn.
                         
  // Cân bằng trắng (White Balance) - rất quan trọng cho màu sắc tự nhiên
  s->set_whitebal(s, 1);   // 1 = Bật chế độ tự động cân bằng trắng (AWB)
  s->set_awb_gain(s, 1);   // 1 = Bật tự động điều chỉnh gain cho AWB (thường cải thiện màu)

  // initial sensors are flipped vertically and colors are a bit saturated
  // Khối if này có thể không cần thiết nữa nếu các cài đặt trên đã tốt, hoặc chỉ áp dụng nếu PID là OV3660
  if (s->id.PID == OV3660_PID) { 
    s->set_vflip(s, 1);        // flip it back
    s->set_brightness(s, 1);   // up the brightness just a bit
    s->set_saturation(s, -2);  // lower the saturation
  }

  // drop down frame size for higher initial frame rate
  if (config.pixel_format == PIXFORMAT_JPEG) {
    // s->set_framesize(s, FRAMESIZE_QVGA); // Comment out hoặc xóa dòng này
    s->set_framesize(s, FRAMESIZE_VGA); // << TĂNG ĐỘ PHÂN GIẢI LÊN VGA
  }

  // Setup LED FLash if LED pin is defined in camera_pins.h
  #if defined(LED_GPIO_NUM)
    setupLedFlash(LED_GPIO_NUM);
  #endif

  cameraInitialized = true;
  Serial.println("Camera initialized successfully");
}

void initSPIFFS() {
  if(!SPIFFS.begin(true)){
    Serial.println("SPIFFS initialization failed!");
    delay(1000);
    ESP.restart();
    return;
  }
  spiffsInitialized = true;
  Serial.println("SPIFFS initialized successfully");
}

void initWiFi() {
  // Set Static IP
  if (!WiFi.config(local_IP, gateway, subnet)) {
    Serial.println("STA Failed to configure");
  }
  
  WiFi.begin(ssid, password);
  WiFi.setSleep(false);

  Serial.print("WiFi connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  wifiConnected = true;
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Serial.println();

  // Add delay before initialization
  delay(2000);

  // Initialize components
  initCamera();
  if (!cameraInitialized) return;

  initSPIFFS();
  if (!spiffsInitialized) return;

  initWiFi();
  if (!wifiConnected) return;

  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.html", "text/html");
  });

  // Route for stream
  server.on("/stream", HTTP_GET, [](AsyncWebServerRequest *request){
    camera_fb_t * fb = esp_camera_fb_get();
    if (!fb) {
      request->send(500, "text/plain", "Camera capture failed");
      return;
    }
    AsyncWebServerResponse *response = request->beginResponse_P(200, "image/jpeg", fb->buf, fb->len);
    response->addHeader("Access-Control-Allow-Origin", "*");
    request->send(response);
    esp_camera_fb_return(fb);
  });

  // Start server and WebSocket
  server.begin();
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
  Serial.println("WebSocket server started");

  // Create task for sending frames with higher priority
  xTaskCreatePinnedToCore(
    sendFrameTask,
    "SendFrame",
    8192,
    NULL,
    2,  // Higher priority
    NULL,
    1   // Run on core 1
  );

  Serial.print("Camera Ready! Use 'http://");
  Serial.print(WiFi.localIP());
  Serial.println("' to connect");
}

void loop() {
  if (cameraInitialized && spiffsInitialized && wifiConnected) {
    webSocket.loop();
  } else {
    Serial.println("System not fully initialized. Restarting...");
    delay(1000);
    ESP.restart();
  }
  delay(10);
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.printf("[%u] Disconnected!\n", num);
      break;
    case WStype_CONNECTED:
      {
        IPAddress ip = webSocket.remoteIP(num);
        Serial.printf("[%u] Connected from %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);
      }
      break;
    case WStype_TEXT:
      Serial.printf("[%u] Received Text: %s\n", num, payload);
      break;
    case WStype_BIN:
      Serial.printf("[%u] Received Binary Data of size %u:\n", num, length);
      break;
  }
}

void sendFrame() {
  if (!cameraInitialized) return;

  camera_fb_t * fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Camera capture failed");
    return;
  }

  if (webSocket.connectedClients() > 0) {
    webSocket.broadcastBIN(fb->buf, fb->len);
  }
  
  esp_camera_fb_return(fb);
}

void sendFrameTask(void * parameter) {
  for(;;) {
    if (cameraInitialized && wifiConnected) {
      sendFrame();
    }
    // Nếu stream bị giật sau khi tăng chất lượng/độ phân giải,

    vTaskDelay(pdMS_TO_TICKS(100)); // Giữ nguyên 10 FPS hiện tại để thử nghiệm
  }
}
