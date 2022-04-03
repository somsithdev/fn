// Sensor
import sensorLib from 'node-dht-sensor'

// Datastore
import Datastore from 'nedb'

// Express app
import express from'express'
var tempRouter = express.Router();
var db = new Datastore();

// Main route
tempRouter.get('/status', function (req, res) {
  
  var readout = sensor.readStatus();
  const data = {temperature:readout.temperature.toFixed(2),humidity:readout.humidity.toFixed(2)};
	res.send(data);

});

//Data route
tempRouter.get('/data', function (req, res) {
db.find({}, function (err, docs) {
res.json(docs);
});
});

// Sensor
var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function () {

        // Read
        var readout = sensorLib.read();
        //return readout;  

	// Log
        var data = {
            humidity: readout.humidity.toFixed(2),
            temperature: readout.temperature.toFixed(2),
            date: new Date()
        };
        db.insert(data, function (err, newDoc) { 
            console.log(newDoc);
        }); 

        // Repeat
        setTimeout(function () {
            sensor.read();
        }, 10000); 
    },

    readStatus: function () {

        // Read
        var readout = sensorLib.read();
        return readout;   
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}

export default tempRouter;
