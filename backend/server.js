import express from "express";
import ledRouter from "./routers/ledRouter.js"
import doorRouter from "./routers/doorRouter.js"
import tempRouter from "./routers/tempRouter.js"
//import servoRouter from "./routers/servoRouter.js"
const app = express(); 

 app.get("/", (req,res) => {
    res.send("hello")
    })

app.use("/api/led", ledRouter)
app.use("/api/door", doorRouter)
app.use("/api/temp", tempRouter)
//app.use("/api/servo", servoRouter)
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`)
})
