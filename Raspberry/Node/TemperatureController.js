var wyliodrin = require("wyliodrin");

var route;

var grove;
var B;

function TemperatureController()
{
    route = "/get/temperature";
    
    if (process.env.wyliodrin_board == "raspberrypi") { 
        grove = 300; 
        wyliodrin.grovepiSetup (grove, 4); 
    } else { 
        grove = 0; 
    }

    B = 3975;                  //B value of the thermistor
}

TemperatureController.prototype.getRoute = function()
{
    return route;
}

TemperatureController.prototype.action = function(response, json, query)
{
    response.writeHead(200, {'Content-Type': 'application/json'});
    var jsonResponse = JSON.stringify({ temperature: getTemperature (wyliodrin.analogRead (grove+1))});
    response.end(jsonResponse);
}

function getTemperature (value){
  if (value==0) value=0.0001;
  value =(1023-value)*10000/value;
  var celsius=Math.round((1/(Math.log(value/10000.0)/B+1/298.15)-273.15)*100)/100;
  return celsius;
}

module.exports = TemperatureController;
