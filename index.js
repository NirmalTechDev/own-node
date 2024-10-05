import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
var app = express()
const port = process.env.PORT||5000
mongoose.connect(process.env.MONGOURL)
  .then(() => console.log('Connected!'));






app.listen(port,function(){
    console.log('Server start At',port )
})