#ifndef RGB_HANDLER_H
#define RGB_HANDLER_H

#include <FastLED.h>

template<uint8_t LED_PIN, uint8_t NUM_LEDS, EOrder RGB_ORDER = GRB, uint8_t BRIGHTNESS = 50>
class RGBHandler {
public:
    RGBHandler() {
        FastLED.addLeds<WS2812B, LED_PIN, RGB_ORDER>(leds, NUM_LEDS);
        FastLED.setBrightness(BRIGHTNESS);
    }

    void setHue(uint8_t hue, uint8_t brightness = 255) {
        for (int i = 0; i < NUM_LEDS; i++) {
            leds[i] = CHSV(hue, 255, brightness);
        }
        FastLED.show();
    }

    void turnOff() {
        for (int i = 0; i < NUM_LEDS; i++) {
            leds[i] = CHSV(0, 0, 0);
        }
        FastLED.show();
    }

    void error() {
        for (int i = 0; i < 3; i++) {
            setHue(0, 0); // Red color off
            delay(200);
            setHue(0, 255); // Red color on
            delay(200);
        }
    }

    void motionDetected() {
        setHue(128); // Green color
        delay(300);
        turnOff();
    }

    void inMotion() {
        setHue(128); // Green color
    }

    void recording() {
        setHue(0); // Red color
    }

    void recStop() {
        for (int i = 0; i < 2; i++) {
            setHue(128); // Green color
            delay(300);
            setHue(0, 255); // Red color
        }
    }

private:
    CRGB leds[NUM_LEDS];
};

#endif
