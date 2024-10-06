import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import bodyParser from 'body-parser'
import multer from 'multer'
var app = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/.')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage:storage});
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 5000
mongoose.connect(process.env.MONGOURL)
  .then(() => console.log('Connected!'));



import profileController from './controller/profile.js'

app.post('/create',upload.single('profilePic'),profileController.createProfile)
app.post('/update/:id',upload.none(),profileController.updateDetails)
app.post('/link-add/',upload.none(),profileController.link)




app.listen(port, function () {
  console.log('Server start At', port)
})