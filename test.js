import GPIO from "pigpio"

const motor = new GPIO.Gpio(10, {mode: GPIO.Gpio.OUTPUT});

let pulseWidth = 1000;
let increment = -100;


  motor.servoWrite(pulseWidth);
