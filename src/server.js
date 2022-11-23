import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routes from './routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


const app = express()
app.use(cors())

app.use(cookieParser())
app.use(bodyParser.json())

app.use(routes)

app.use(function (req, res, next) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});

// Connect to MongoDB:
mongoose.connect(
  `mongodb://localhost:27017/test`,
  { useNewUrlParser: true }
)

app.listen(4000, () => {
  console.log('Web server is listening on port 4000.')
})
