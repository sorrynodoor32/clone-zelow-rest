const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConn = require('./config/dbConnect.js');
const initRoutes = require('./routes/index');
require('./config/redis.config');

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConn();
initRoutes(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Sever running on ${PORT} `));
