#ifndef ACTION_H
#define ACTION_H

#include <Arduino.h>
#include <WiFiClient.h>
#include <HTTPClient.h>
#include <WiFi.h>

int postCall(HTTPClient &http, WiFiClient &client, String endpoint, String payload) {
  http.setTimeout(1000);
  http.begin(client, endpoint);
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(payload);

  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);

  return httpResponseCode;
}

#endif
