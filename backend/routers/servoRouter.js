import express from "express";
import bodyParser from "body-parser";
import five from "johnny-five";
import Raspi from "raspi-io";
import gpio from "onoff";
import cors from "cors";
const app = express();
const board = new five.Board({
  io: new Raspi.RaspiIO(),
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//generate valueble
const pir = new gpio.Gpio(18, "in", "both");
const led = new gpio.Gpio(26, "out");
const soil = new gpio.Gpio(15, "in", "both");
const relay = new gpio.Gpio(5, "out");
const raindrop = new gpio.Gpio(16, "in", "both");
const photoresistor = new gpio.Gpio(3, "in", "both");
const motor1 = new five.Motor({
  pins: { pwm: "GPIO13", dir: "GPIO19" },
  invertPWM: true,
});
const gardenLight1 = new gpio.Gpio(21, "out");
const gardenLight2 = new gpio.Gpio(20, "out");
const gardenLight3 = new gpio.Gpio(1, "out");
const sensorGate = new gpio.Gpio(7, "in", "both");
const sensorCar = new gpio.Gpio(8, "in", "both");
const sensorRoof = new gpio.Gpio(25, "in", "both");

sensorGate.watch(function (err, value) {
  if (value == 1) {
    console.log("Opening Gate . . .");
  } else {
    console.log("Closing Gate . . .");
  }
});

sensorRoof.watch(function (err, value) {
  if (value == 1) {
    console.log("Opening Roof . . .");
  } else {
    console.log("Closing Roof . . .");
  }
});

sensorCar.watch(function (err, value) {
  if (value == 1) {
    console.log("Opening Car . . .");
  } else {
    console.log("Closing Car . . .");
  }
});

gardenLight1.writeSync(1);
gardenLight2.writeSync(1);
gardenLight3.writeSync(1);

//motor1.reverse(50);
//setTimeout(()=>{motor1.stop()},5000)

// Sensor
import sensorLib from "node-dht-sensor";

// Datastore
import Datastore from "nedb";
var db = new Datastore();

// Main route
app.get("/api/temp/status", function (req, res) {
  var readout = sensor.readStatus();
  const data = {
    temperature: readout.temperature.toFixed(2),
    humidity: readout.humidity.toFixed(2),
  };
  res.send(data);
});

//Data route
app.get("/api/temp/data", function (req, res) {
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
      date: new Date(),
    };
    //   db.insert(data, function (err, newDoc) {
    //     console.log(newDoc);
    //   });

    // Repeat
    //   setTimeout(function () {
    //     sensor.read();
    //   }, 10000);
  },

  readStatus: function () {
    // Read
    var readout = sensorLib.read();
    return readout;
  },
};

if (sensor.initialize()) {
  sensor.read();
} else {
  console.warn("Failed to initialize sensor");
}
/////////////////////////////////////////////
const ledThree1 = new gpio.Gpio(23, "out");
const ledThree2 = new gpio.Gpio(24, "out");
const ledTwo1 = new gpio.Gpio(14, "out");
const ledTwo2 = new gpio.Gpio(27, "out");
const ledOne1 = new gpio.Gpio(22, "out");
const ledOne2 = new gpio.Gpio(9, "out");
const allLed = [
  { id: "led3-1", led: ledThree1 },
  { id: "led3-2", led: ledThree2 },
  { id: "led2-1", led: ledTwo1 },
  { id: "led2-2", led: ledTwo2 },
  { id: "led1-1", led: ledOne1 },
];

app.get("/api/status", (req, res) => {
  const status = [];
  allLed.map((data) => {
    data.status = data.led.readSync();
    status.push(data);
  });
  const pirRead = pir.readSync();
  const soilRead = soil.readSync();
  const raindropRead = raindrop.readSync();
  const roofRead = sensorRoof.readSync();
  const carRead = sensorCar.readSync();
  const gateRead = sensorGate.readSync();
  const photoresistorRead = photoresistor.readSync();
  var readout = sensor.readStatus();
  const tempRead = {
    temperature: readout.temperature.toFixed(2),
    humidity: readout.humidity.toFixed(2),
  };
  res
    .status(200)
    .send({
      led: status,
      pir: pirRead,
      raindrop: raindropRead,
      soil: soilRead,
      temp: tempRead,
      car: carRead,
      gate: gateRead,
      roof: roofRead,
      photoresistor: photoresistorRead,
    });
});

app.get("/api/led/:id", (req, res) => {
  allLed.map((data) => {
    if (data.id === req.params.id) {
      if (data.led.readSync() === 0) {
        data.led.writeSync(1);
        res.send({ message: "Success turned on light", status: "on" });
      } else {
        data.led.writeSync(0); //
        res.send({ message: "Success turned off light", status: "off" });
      }
    }
  });
});
//////////////////////////////////////

app.get("/api/roof/open", (req, res) => {
  //const motor1 = new five.Motor({pins:{ pwm: 'GPIO13', dir: 'GPIO19'}, invertPWM: true});
  motor1.reverse(50);
  console.log("wait for 3 seconds until rooftop is close . . .");
  setTimeout(() => {
    motor1.stop();
    console.log("rooftop is closed . . .");
  }, 2800);
  res.json({ message: "success! closed the rooftop" });
});

app.get("/api/roof/close", (req, res) => {
  //const motor1 = new five.Motor({pins:{ pwm: 'GPIO13', dir: 'GPIO19'}, invertPWM: true});
  motor1.forward(50);
  console.log("wait for 3 seconds until rooftop is open . . .");
  setTimeout(() => {
    motor1.stop();
    console.log("rooftop is opened . . .");
  }, 2800);
  res.json({ message: "success! closed the rooftop" });
});

app.get("/api/roof/stop", async (req, res) => {
  //const motor1 = new five.Motor({pins:{ pwm: 'GPIO13', dir: 'GPIO9'}, invertPWM: true});
  motor1.stop();
  res.json({ message: "success! stopped the rooftop" });
});

raindrop.watch(function (err, value) {
  if (value == 1) {
    //         const motor = new five.Motor({pins:{ pwm: 'GPIO12', dir: 'GPIO6'}, invertPWM: true});
    //      motor.reverse(35);
    //   await setTimeout(()=>{motor.stop()},25000)
    console.log("not rain");
  } else {
    //        const motor = new five.Motor({pins:{ pwm: 'GPIO12', dir: 'GPIO6'}, invertPWM: true});
    //motor.forward(35);
    // await setTimeout(()=>{motor.stop()},25000)
    //const motor1 = new five.Motor({pins:{ pwm: 'GPIO13', dir: 'GPIO9'}, invertPWM: true});
    motor1.reverse(50);
    console.log("It's raining !");
    console.log("Wait 4 seconds until rooftop is close");
    setTimeout(() => {
      motor1.stop();
      console.log("rooftop closed");
    }, 4000);
  }
});

photoresistor.watch(function (err, value) {
  if (value == 1) {
    console.log("turn on garden's light");
    gardenLight1.writeSync(0);
    gardenLight2.writeSync(0);
    gardenLight3.writeSync(0);
  } else {
    gardenLight1.writeSync(1);
    gardenLight2.writeSync(1);
    gardenLight3.writeSync(1);
    console.log("turn off garden's light");
  }
});

pir.watch(async function (err, value) {
  if (value == 1) {
    //         const motor = new five.Motor({pins:{ pwm: 'GPIO12', dir: 'GPIO6'}, invertPWM: true});
    //      motor.reverse(35);
    //   await setTimeout(()=>{motor.stop()},25000)
    led.writeSync(1);
    console.log("turn on light!");
  } else {
    //        const motor = new five.Motor({pins:{ pwm: 'GPIO12', dir: 'GPIO6'}, invertPWM: true});
    //motor.forward(35);
    // await setTimeout(()=>{motor.stop()},25000)
    led.writeSync(0);
    console.log("turn off light");
  }
});

soil.watch(function (err, value) {
  if (value == 1) {
    console.log("watering");
    relay.writeSync(1);
  } else {
    //        const motor = new five.Motor({pins:{ pwm: 'GPIO12', dir: 'GPIO6'}, invertPWM: true});
    //motor.forward(35);
    // await setTimeout(()=>{motor.stop()},25000)
    relay.writeSync(0);
    console.log("stop watering");
  }
});

app.get("/api/car/close", function (req, res) {
  var servo = new five.Servo("P1-19");
  servo.to(0);
  res.json({ message: "success! close" });
});

app.get("/api/car/open", function (req, res) {
  var servo = new five.Servo("P1-19");
  servo.to(180);

  res.json({ message: "success! open" });
});

app.get("/api/gate/open", function (req, res) {
  const motor = new five.Motor({
    pins: { pwm: "GPIO12", dir: "GPIO6" },
    invertPWM: true,
  });
  motor.reverse(50);
  console.log("Wait 3s until gate is open");
  setTimeout(() => {
    motor.stop();
    console.log("Gate was opened");
  }, 3000);
  res.json({ message: "success! opened the gate" });
});

app.get("/api/gate/close", function (req, res) {
  const motor = new five.Motor({
    pins: { pwm: "GPIO12", dir: "GPIO6" },
    invertPWM: true,
  });
  motor.forward(50);
  console.log("Wait 3s until gate is close");
  setTimeout(() => {
    motor.stop();
    console.log("Gate was closed");
  }, 3000);
  res.json({ message: "success! closed the gate" });
});

app.get("/api/gate/stop", function (req, res) {
  const motor = new five.Motor({
    pins: { pwm: "GPIO12", dir: "GPIO6" },
    invertPWM: true,
  });
  motor.stop();
  res.json({ message: "success! stopped the gate" });
});

function startServer() {
  app.listen("5000", () => {
    console.log("App listening on port 6000");
  });
}

board.on("ready", startServer);
