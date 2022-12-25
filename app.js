import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import secretRoutes from './routes/User.js';

const app = express();
dotenv.config();

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ 
  extended: true 
}));

app.use('/', secretRoutes);

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true })
  .then(() => app.listen(3000, () => console.log(`Server running on port: 3000`)))
  .catch((error) => console.log(error));
