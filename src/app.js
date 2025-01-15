const express = require("express");
require("dotenv").config();

const app = express();

app.use("/test",(req,res)=>res.send({message:"Hello from test middleware"}))
app.use("/hello",(req,res)=>res.send({message:"Hello from hello middleware"}))

app.listen(process.env.PORT,()=>console.log("Running on port 7777"));


