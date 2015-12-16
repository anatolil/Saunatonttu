var fs = require('fs');
var wyliodrin = require("wyliodrin");

var SerialPort = require("serialport");
var serialport = new SerialPort.SerialPort("/dev/ttyACM0", {
    baudrate: 9600,
    parser: SerialPort.parsers.readline("\n")
}, false);

var currentTemperature;

serialport.open(function (error) {
    if (error) {
        console.log('Serial port error');
    }
    else {
        wyliodrin.pinMode(0, 1);
        serialport.on('data', function (data) {
            if (data.match(/(\d{2}\.\d{2})/)) {
                temperature = data.trim()
                if (Math.abs(temperature - currentTemperature) < 5 || !currentTemperature) {
                    currentTemperature = temperature;
                    fs.writeFileSync('temperature.txt', temperature, 'utf8');
                    
                    temperatureGoal = fs.readFileSync('temperatureGoal.txt', 'utf8');
                    console.log('Current: ' + temperature + ' Goal:' + temperatureGoal);
                    if (temperature > temperatureGoal + 5) {
                        wyliodrin.digitalWrite(0, 0);
                        console.log('Relay off');
                    }
                    else if (temperature < temperatureGoal - 5) {
                        wyliodrin.digitalWrite(0, 1);
                        console.log('Relay on');
                    }
                }
            }
        });
    }
 });