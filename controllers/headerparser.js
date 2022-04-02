import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getHeaderparser = (req, res) => {
  let absolutePath = path.normalize(__dirname + '/..');
  res.sendFile(absolutePath + '/views/headerparser.html');
}

export const getHeaders = (req, res) => {
  res.json({
    "ipaddress": req.ip,
    "language: ": req.headers["accept-language"],
    "software: ": req.headers["user-agent"],
  })
}