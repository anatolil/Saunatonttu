const int tempSensorPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorVal = analogRead(tempSensorPin);
  Serial.println(getTemperaturesInDegrees(sensorVal));
  delay(100);
}

float getTemperaturesInDegrees(int sensorValue)
{
  float voltage = (sensorValue / 1024.0) * 5.0;
  return (voltage - 0.5) * 100;
}
