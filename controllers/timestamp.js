import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const callHtml = (req, res) => {
  let absolutPath = path.normalize(__dirname + '/..');
  res.sendFile(absolutPath + "/views/timestamp.html");
}

export const emptyDate = (req, res) => {
  const now = new Date();
  
  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  });
}

export const helloApi = (req, res) => {
  res.json({greeting: 'hello API'});
}

export const formattedData = (req, res) => {
  const date = req.params.date;
  let dateObject = new Date(date);
  if (date > 10000) {
    let timeStamp = dateObject.setTime(date);
    res.json({
      "unix": dateObject.getTime(),
      "utc": dateObject.toUTCString()
    });
  }
  if (dateObject == "Invalid Date") {
    res.json({
      error: "Invalid Date"
    });
  }else {
    res.json({
      "unix": dateObject.getTime(),
      "utc": dateObject.toUTCString()
    });
  }
}