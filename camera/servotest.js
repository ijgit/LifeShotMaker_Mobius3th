const Gpio = require('pigpio').Gpio;
const Gpio1 = require('pigpio').Gpio;

const motor = new Gpio(12, { mode: Gpio.OUTPUT });
const motor1 = new Gpio(13, { mode: Gpio1.OUTPUT });

setTimeout(()=>{
    motor.servoWrite(1500);
    motor1.servoWrite(1500)
},1000)
