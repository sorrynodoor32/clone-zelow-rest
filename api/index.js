import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Sever running on ${PORT} `));
