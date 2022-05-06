import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import five from "johnny-five";
import Raspi from "raspi-io";
import gpio from "onoff";
import cors from "cors";
import { generateToken, isAdmin, isAuth } from "./utils.js";

const app = express();
const board = new five.Board({
  io: new Raspi.RaspiIO(),
});

import dotenv from "dotenv";
dotenv.config();

//test
import data from "./data.js";
import User from "./models/userModel.js";

import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://test:test@smarthome.94gjg.mongodb.net/smarthome?retryWrites=true&w=majority";
mongoose.connect(process.env.MONGO_URI || uri, { useNewUrlParser: true }, () =>
  console.log("MongoDB Connected")
);

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

// Sensor
import sensorLib from "node-dht-sensor";

// Datastore
import Datastore from "nedb";
var db = new Datastore();

//Test
app.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    //await User.remove({});
    const createUsers = await User.insertMany(data.users);
    res.send({ createUsers });
  })
);

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

// signin
app.post(
  "/api/users/sign",
  expressAsyncHandler(async (req, res) => {
    console.log("signing");
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      }
    }
    res.status(401).send({ message: "Invalid username of password" });
  })
);

// LIST USERS
app.get(
  "/api/users/list",
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    if (users) {
      res.send(users);
    }
    res.status(401).send({ message: "Invalid User" });
  })
);

// list details single user from id
app.get(
  "/api/users/:id",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

// register
app.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      dob: req.body.dob,
      password: bcrypt.hashSync(req.body.password, 8),
      isAdmin: req.body.admin,
    });

    
    
    const emailc = await User.findOne({ email: req.body.email });
    if(emailc){
	res.send("Email has been used");
}
const usernamec = await User.findOne({ username: req.body.username });
    if(usernamec){
	res.send("Username has been used");
}
const createdUser = await user.save();
console.log(createdUser);
        res.send({
      _id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      phone: createdUser.phone,
      dob: createdUser.dob,
    });
  })
);

//delete user
app.delete(
  "/api/users/delete/:id",

  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    console.log(user);
    if (user) {
      const deledtedUser = await user.remove();
      console.log("complete");
      res.send({ message: "remove user commpleted", user: deledtedUser });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  })
);

app.put(
  "/api/users/update/:id",

  expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    const user = await User.findById(req.params.id);
    console.log(req.body);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.admin ;
      user.phone = req.body.phone || user.phone;
      user.dob = req.body.dob || user.dob;

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        phone: updatedUser.phone,
        dob: updatedUser.dob,
      });
    } else {
      res.status(404).send({ message: "Profile is not found " });
    }
  })
);

app.put(
  "/api/users/changepass/:id",

  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.password = bcrypt.hashSync(req.body.password, 8);
      const updatedPassword = await user.save();
      res.send({
        message: "Update password successfull!",
      });
    } else {
      res.status(404).send({ message: "Profile is not found " });
    }
  })
);

app.put(
  "/api/users/permission/:id",

  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.led31 = req.body.led31;
      user.led32 = req.body.led32;
      user.led21 = req.body.led21;
      user.led22 = req.body.led22;
      user.led11 = req.body.led11;
      user.car = req.body.car;
      user.gate = req.body.gate;
      user.roof = req.body.roof;

      const updatedPermission = await user.save();
      res.send({
        message: "Update permission successfull!",
      });
    } else {
      res.status(404).send({ message: "Profile is not found " });
    }
  })
);

// LED Permission
app.post(
  "/api/users/details/led",
  expressAsyncHandler(async (req, res) => {
    console.log("signing");
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      res.send({
        led31: user.led31,
        led32: user.led32,
        led21: user.led21,
        led22: user.led22,
        led11: user.led11,
        car: user.car,
        roof: user.roof,
        gate: user.gate,
      });
    }
    res.status(401).send({ message: "invalid user" });
  })
);

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
  res.status(200).send({
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
  motor1.forward(60);
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
    console.log("not rain");
  } else {
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
    led.writeSync(1);
    console.log("turn on light!");
  } else {
    led.writeSync(0);
    console.log("turn off light");
  }
});

soil.watch(function (err, value) {
  if (value == 1) {
    console.log("watering");
    relay.writeSync(1);
  } else {
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
  motor.reverse(51);
  console.log("Wait 5s until gate is Close");
  setTimeout(() => {
    motor.stop();
    console.log("Gate was Closed");
  }, 5000);
  res.json({ message: "success! Close the gate" });
});

app.get("/api/gate/close", function (req, res) {
  const motor = new five.Motor({
    pins: { pwm: "GPIO12", dir: "GPIO6" },
    invertPWM: true,
  });
  motor.forward(50);
  console.log("Wait 5s until gate is Open");
  setTimeout(() => {
    motor.stop();
    console.log("Gate was Opened");
  }, 5000);
  res.json({ message: "success! Open the gate" });
});

app.get("/api/gate/stop", function (req, res) {
  const motor = new five.Motor({
    pins: { pwm: "GPIO12", dir: "GPIO6" },
    invertPWM: true,
  });
  motor.stop();
  res.json({ message: "success! stopped the gate" });
});

//app.use((err, req, res, next) => {
//  res.status(500).send({ message: err.message });
//});

function startServer() {
  app.listen("5000", () => {
    console.log("App listening on port 5000");
  });
}

board.on("ready", startServer);
