import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import {fileURLToPath} from 'url';
import timeStampRoutes from './routes/timestamp.js';
import headParserRoutes from './routes/headerparser.js';
import shortUrlRoutes from './routes/urlshortener.js';
import 'dotenv/config';

var app = express();
var port = process.env.PORT || 3000;

app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true });


const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfully");
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/timestamp', timeStampRoutes);
app.use('/headerparser', headParserRoutes);
app.use('/shorturl', shortUrlRoutes);

var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
