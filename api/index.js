const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConn = require('./config/dbConnect.js');

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConn();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Sever running on ${PORT} `));
