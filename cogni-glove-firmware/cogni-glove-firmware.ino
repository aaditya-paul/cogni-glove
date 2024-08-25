#if !defined(ESP32)
#error this is only build for esp32 devices
#endif

#include <WiFi.h>
#include <HTTPClient.h>

#include <Adafruit_MPU6050.h>  // MPU
#include <Adafruit_Sensor.h>
#include <Wire.h>
#include <SPI.h>  // OLED
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <FastLED.h>  // RGB
#include "actions.h"  // different actions
#include "RGBHandler.h"

#define SCREEN_WIDTH 128  // OLED display width, in pixels
#define SCREEN_HEIGHT 32  // OLED display height, in pixels
#define OLED_RESET -1     // Reset pin # (or -1 if sharing Arduino reset pin)

#define NUM_SAMPLES 120
#define NUM_AXES 6
#define TRUNCATE 20
#define ACCEL_THRESHOLD 0.5f

#define RGB_PIN 2
#define RGB_COUNT 2
#define BRIGHTNESS 50

#define GESTURE_COUNT 4

RGBHandler<RGB_PIN, RGB_COUNT, GRB, BRIGHTNESS> rgbHandler;

const char* ssid = "Jai Sree Ram ";
const char* password = "00000002";

// const char* mouseEndpoint = "http://192.168.131.78:3000/api/endpoint";
const char* csvEndpoint = "http://192.168.131.78:3000/api/csv";

int BTN1_PIN = 15;
int BTN2_PIN = 13;
int BTN3_PIN = 18;

int fingerOne = 32;
int fingerTwo = 36;

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
Adafruit_MPU6050 mpu;

enum InputMode {
  HID_IDLE,
  MOUSE_MODE,
  KEYBOARD_MODE
} inputMode;

double calibration[NUM_AXES];

float gestureArray[NUM_AXES * NUM_SAMPLES];

float ax, ay, az;
float gx, gy, gz;
sensors_event_t a, g, temp;

//modes and flags
volatile bool menu = false;
volatile bool infrencing = false;
volatile bool recording = false;
volatile bool demo = false;

bool acceptRecording = false;

volatile bool BTN1 = false;
volatile bool BTN2 = false;
volatile bool BTN3 = false;

volatile bool CONNECTED_WIFI = false;
// modes
volatile bool GESTURE_MODE = false;
volatile bool HID_MODE = false;
volatile bool SETTINGS_PAGE = false;

void ICACHE_RAM_ATTR BTN1IntCallback() {
  BTN1 = true;
  // recording = true;
}

void ICACHE_RAM_ATTR BTN2IntCallback() {
  BTN2 = true;
  // menu = true;
}

void ICACHE_RAM_ATTR BTN3IntCallback() {
  BTN3 = true;
  // menu = true;
}

// FORWARD DECLERATION
InputMode getGlyph();
void calibrate();
bool motionDetected(float ax, float ay, float az);
void animateText(String text);

void setup(void) {
  Serial.begin(115200);

  // interrupt Thingi
  pinMode(BTN1_PIN, INPUT_PULLUP);
  pinMode(BTN2_PIN, INPUT_PULLUP);
  pinMode(BTN3_PIN, INPUT_PULLUP);

  attachInterrupt(digitalPinToInterrupt(BTN1_PIN), BTN1IntCallback, FALLING);
  attachInterrupt(digitalPinToInterrupt(BTN2_PIN), BTN2IntCallback, FALLING);
  attachInterrupt(digitalPinToInterrupt(BTN3_PIN), BTN3IntCallback, FALLING);

  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {  // Address 0x3C for 128x32
    Serial.println(F("SSD1306 allocation failed"));
    for (;;){
      rgbHandler.error();
      delay(500);
    }
      ;  // Don't proceed, loop forever
  }
  animateText("Starting...");

  // Try to initialize!
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    animateText("MPU Error !!! ");
    rgbHandler.error();
    while (1) {
      delay(1000);
      if (mpu.begin()) {
        animateText("MPU Found !");
        break;
      }
    }
  }

  mpu.setAccelerometerRange(MPU6050_RANGE_4_G);
  mpu.setGyroRange(MPU6050_RANGE_500_DEG);
  mpu.setFilterBandwidth(MPU6050_BAND_21_HZ);
  delay(100);
  calibrate();

  delay(200);

  int connectionCounter = 1;
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    animateText("connecting..." + String(connectionCounter));
    delay(100);
    connectionCounter++;
    if (connectionCounter > 7)
      break;
  }
  if (connectionCounter > 7) {
    animateText("Connection Failed !");
  } else {
    animateText("Connected");
    CONNECTED_WIFI = true;
    delay(1000);
    animateText("IP:" + String(WiFi.localIP()));
    Serial.println("IP:" + String(WiFi.localIP()));
  }
  Serial.println("Connected to Wi-Fi");

  delay(1000);
}

int menuSelectedOption = 0;
int menuPage = 0;

void loop() {
  if (menu) {
    if (menuPage == 0) {
      display.clearDisplay();
      display.setTextSize(1);               // Normal 1:1 pixel scale
      display.setTextColor(SSD1306_WHITE);  // Draw white text
      display.setCursor(54, 0);
      display.print("Menu");
      display.setCursor(0, 8);
      display.print("  1. Gesture Mode");
      display.setCursor(0, 16);
      display.print("  2. HID mode");
      display.setCursor(0, 24);
      display.print("  3. Settings");
      display.setCursor(0, 8 * (menuSelectedOption + 1));
      display.print(">");
      display.display();
    } else if (menuPage == 1) {  //GESTURE_MODE
      display.clearDisplay();
      display.setTextSize(1);               // Normal 1:1 pixel scale
      display.setTextColor(SSD1306_WHITE);  // Draw white text
      display.setCursor(30, 0);
      display.print("Gesture Mode");
      display.setCursor(0, 8);
      display.print("  1. Infrence");
      display.setCursor(0, 16);
      display.print("  2. Training");
      display.setCursor(0, 24);
      display.print("  3. Demo");
      display.setCursor(0, 8 * (menuSelectedOption + 1));
      display.print(">");
      display.display();
      // GESTURE_MODE = true;
    } else if (menuPage == 2) {  // HID_MODE
      display.clearDisplay();
      display.setTextSize(1);               // Normal 1:1 pixel scale
      display.setTextColor(SSD1306_WHITE);  // Draw white text
      display.setCursor(42, 0);
      display.print("HID MODE");
      display.display();
      HID_MODE = true;
      GESTURE_MODE = false;
      SETTINGS_PAGE = false;
      menu = false;
    } else if (menuPage == 3) {  // SETTINGS PAGE
      display.clearDisplay();
      display.setTextSize(1);               // Normal 1:1 pixel scale
      display.setTextColor(SSD1306_WHITE);  // Draw white text
      display.setCursor(42, 0);
      display.print("Settings");
      display.setCursor(0, 8);
      display.print("  1. IP: " + String(WiFi.localIP()));
      display.setCursor(0, 16);
      display.print("  2. Gestures Count: " + GESTURE_COUNT);
      display.setCursor(0, 24);
      display.print("  3. Calibrate");
      display.setCursor(0, 8 * (menuSelectedOption + 1));
      display.print(">");
      display.display();
      // HID_MODE = false;
      // GESTURE_MODE = false;
      // SETTINGS_PAGE = true;
    }

    if (BTN1) {
      BTN1 = false;
      menuSelectedOption += menuSelectedOption < 2 ? 1 : 0;
    }
    if (BTN2) {
      BTN2 = false;
      menuSelectedOption -= menuSelectedOption > 0 ? 1 : 0;
    }
    if (BTN3) {                                              // Navigation logic
      BTN3 = false;                                          // pressed ok
      if (menuPage == 0) menuPage = menuSelectedOption + 1;  // main menu
      else if (menuPage == 1) {                              // gesture page
        GESTURE_MODE = true;
        HID_MODE = false;
        SETTINGS_PAGE = false;
        menu = false;
        switch (menuSelectedOption) {  // sub modes in gesture
          case 0:                      // infrence mode
            infrencing = true;
            recording = false;
            demo = false;
            display.clearDisplay();
            display.setTextSize(2);               // Normal 1:1 pixel scale
            display.setTextColor(SSD1306_WHITE);  // Draw white text
            display.setCursor(17, 8);
            display.print("INFRENCE");
            display.display();
            break;
          case 1:  // training
            infrencing = false;
            recording = true;
            demo = false;
            display.clearDisplay();
            display.setTextSize(2);               // Normal 1:1 pixel scale
            display.setTextColor(SSD1306_WHITE);  // Draw white text
            display.setCursor(17, 8);
            display.print("TRAINING");
            display.display();
            break;
          case 2:  // demo
            infrencing = false;
            recording = false;
            demo = true;
            display.clearDisplay();
            display.setTextSize(2);               // Normal 1:1 pixel scale
            display.setTextColor(SSD1306_WHITE);  // Draw white text
            display.setCursor(36, 8);
            display.print("DEMO");
            display.display();
            break;
          default:
            break;
        }
      } else if (menuPage == 2) {
        GESTURE_MODE = false;
        HID_MODE = true;
        SETTINGS_PAGE = false;
      } else if (menuPage == 3) {
        GESTURE_MODE = false;
        HID_MODE = false;
        SETTINGS_PAGE = true;
        menu = false;
        switch (menuSelectedOption) {  // sub modes in gesture
          case 0:                      // infrence mode
            // infrencing = true;
            // recording = false;
            // demo = false;
            // display.clearDisplay();
            // display.setTextSize(2);               // Normal 1:1 pixel scale
            // display.setTextColor(SSD1306_WHITE);  // Draw white text
            // display.setCursor(17, 8);
            // display.print("INFRENCE");
            // display.display();
            break;
          case 1:  // training
            // infrencing = false;
            // recording = true;
            // demo = false;
            // display.clearDisplay();
            // display.setTextSize(2);               // Normal 1:1 pixel scale
            // display.setTextColor(SSD1306_WHITE);  // Draw white text
            // display.setCursor(17, 8);
            // display.print("TRAINING");
            // display.display();
            break;
          case 2:  // Calibration
            calibrate();
            delay(100);
            break;
          default:
            break;
        }
      }

      menuSelectedOption = 0;
    }
    delay(100);
    return;
  }

  if (BTN2) {
    BTN2 = false;
    menu = true;
    menuPage = 0;
    menuSelectedOption = 0;
    recording = false;
    GESTURE_MODE = false;
    HID_MODE = false;
    SETTINGS_PAGE = false;
  }

  if (GESTURE_MODE) {  // Gesture based interactions //
    getMotion();

    if (demo) {
      Serial.println(String(ax) + "," + String(ay) + "," + String(az) + "," + String(gx) + "," + String(gy) + "," + String(gz));
      delay(10);
      return;
    }

    if (!motionDetected(gx, gy, gz)) {
      delay(10);
      return;
    }

    // Record 100 sample
    rgbHandler.inMotion();
    for (int i = 0; i < NUM_SAMPLES; i++) {
      mpu.getEvent(&a, &g, &temp);
      gestureArray[0 + i * 6] = a.acceleration.x / 39.23;
      gestureArray[1 + i * 6] = a.acceleration.y / 39.23;
      gestureArray[2 + i * 6] = a.acceleration.z / 39.23;
      gestureArray[3 + i * 6] = (g.gyro.x - calibration[3]) / 8.73;
      gestureArray[4 + i * 6] = (g.gyro.y - calibration[4]) / 8.73;
      gestureArray[5 + i * 6] = (g.gyro.z - calibration[5]) / 8.73;
      delay(10);
    }
    rgbHandler.turnOff();

    if (recording) {
      if (BTN1) acceptRecording = true;
      if (!acceptRecording) return;
      String csvFormattedREC = "";
      for (float reading : gestureArray) {
        csvFormattedREC += String(reading) + ", ";
      }
      csvFormattedREC += "f";  // FIX / implement

      if (BTN1) {
        Serial.println(csvFormattedREC);
      }
      // may send to computer via serial / wifi
      acceptRecording = false;
      BTN1 = false;
      delay(1000);
    }

    if (infrencing) {

      int fingerOneValue = analogRead(fingerOne);
      // int fingerTwoValue = analogRead(fingerTwo);
      Serial.println("fingerOne: " + String(fingerOneValue));
      // Serial.println("fingerTwo: " + String(fingerTwoValue));

      if(fingerOneValue > 3300) return; // dont invoke if finger not extended

      String csvFormattedREC = "";
      for (float reading : gestureArray) {
        csvFormattedREC += String(reading) + ", ";
      }
      csvFormattedREC += "f";

      // API call
      if (WiFi.status() != WL_CONNECTED) {
        animateText("Network Disconnected");
        return;
      }

      WiFiClient client;
      HTTPClient http;

      String postData = "{\"csv\":\"" + csvFormattedREC + "\", \"finger_one\":\"" + fingerOneValue + /*"\", \"finger_two\":\"" + fingerTwoValue*/ + "\"}";
      postCall(http, client, csvEndpoint, postData);

      acceptRecording = false;
      BTN1 = false;
      delay(500);
    }

    if (false) {  // other modes
    }
  }

  if (HID_MODE) {  // HID IS NOT IMPLEMENTED , THIS IS DUE TO LOW MEMORY ON MY ESP32
    // IF HID NOT CONNECTED RETURN;
    if (WiFi.status() != WL_CONNECTED) return;

    // WiFiClient client;
    // HTTPClient http;

    // Get motion
    getMotion();

    // check finger Glyph for keeb / mouse
    inputMode = getGlyph();  // TO IMPLEMENT
    if (inputMode == MOUSE_MODE) {
      Serial.println("Mouse Mobeeeee");
      // HTTP request
      String postData = "{\"x\":\"" + String(gx) + "\",\"y\":\"" + String(-gz) + "\"}";
      // postCall(http, client, mouseEndpoint, postData);
    }

    else if (inputMode == KEYBOARD_MODE) {
      Serial.println("Keebb Mobeeeee");
      // postCall(http, client, keebEndpoint, "{\"x\":\"" + String(ax) + "\",\"y\":\"" + String(-ay) + "\"}");
    }
    delay(20);
  }

  // webSocket.loop();
}


inline InputMode getGlyph() {  // COMPLETE IMPLEMENTATION
  return MOUSE_MODE;
}

inline void getMotion() {
  mpu.getEvent(&a, &g, &temp);
  ax = a.acceleration.x / 39.23;
  ay = a.acceleration.y / 39.23;
  az = a.acceleration.z / 39.23;
  gx = (g.gyro.x - calibration[3]) / 8.73;
  gy = (g.gyro.y - calibration[4]) / 8.73;
  gz = (g.gyro.z - calibration[5]) / 8.73;
}

void calibrate() {
  Serial.println("Calibrating...");
  animateText("Calibrating...");
  for (int i = 0; i < 10; i++) {
    mpu.getEvent(&a, &g, &temp);
    delay(100);
    calibration[3] += double(g.gyro.x);
    calibration[4] += double(g.gyro.y);
    calibration[5] += double(g.gyro.z);
  }
  calibration[3] = calibration[3] / 10;
  calibration[4] = calibration[4] / 10;
  calibration[5] = calibration[5] / 10;

  Serial.println("Done Calibrating!");
  animateText("Done Calibrating...");
}

bool motionDetected(float ax, float ay, float az) {
  return (abs(ax) + abs(ay) + abs(az)) > ACCEL_THRESHOLD;
}

void animateText(String text) {
  display.clearDisplay();
  display.setTextSize(1);               // Normal 1:1 pixel scale
  display.setTextColor(SSD1306_WHITE);  // Draw white text
  int lineWidth = 22;
  int textLength = text.length();
  int startX = (lineWidth - textLength) * 6 / 2;
  display.setCursor(startX, 0);
  for (int i = 0; i < text.length(); i++) {
    display.print(text[i]);
    display.display();
    delay(15);
  }
  delay(1000);
}
