import express from "express";
import gpio from "onoff"; 

const ledRouter = express.Router();
const ledThree1 = new gpio.Gpio(23, 'out');
const ledThree2 = new gpio.Gpio(24, 'out');
const ledTwo1 = new gpio.Gpio(14, 'out');
const ledTwo2 = new gpio.Gpio(27, 'out');
const ledOne1 = new gpio.Gpio(22, 'out'); 
const ledOne2 = new gpio.Gpio(9, 'out'); 
const allLed = [{id: "led3-1", led:ledThree1},  {id: "led3-2", led:ledThree2}, {id: "led2-1", led:ledTwo1},{id: "led2-2", led:ledTwo2},{id: "led1-1", led:ledOne1},{id: "led1-2", led:ledOne2}]

ledRouter.get("/status", (req,res) => {
const status = [];	
allLed.map((data)=>{
	data.status = data.led.readSync();
	status.push(data)});
	res.status(200).send(status);
});

ledRouter.get('/:id', (req,res) =>{
	allLed.map((data) =>{
	if (data.id === req.params.id){
		if(data.led.readSync() === 0){
			data.led.writeSync(1);
			res.send({message: "Success turned on light", status:"on"})
		} else{
			data.led.writeSync(0);
			res.send({message: "Success turned off light", status:"off"})
		}
	} 
});
  
})

export default ledRouter;
