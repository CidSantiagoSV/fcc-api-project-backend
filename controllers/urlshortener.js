import path from 'path';
import {fileURLToPath} from 'url';
import { UrlShortener } from '../models/urlshortener.model.js';
import bodyParser from 'body-parser';
import dns from 'dns';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUrlShortener = (req, res) => {
  let absolutePath = path.normalize(__dirname + '/..');
  
  res.sendFile(absolutePath + '/views/urlshortener.html');
}

export const postShortUrl = (req, res) => {
  const original_url = req.body.url;
  let short_url = 0;

  const newUrl = new UrlShortener({
    original_url
  })

  newUrl.save(function(err, data){
    if(err)
      return res.json({ error: 'invalid url' });
    else
      return res.json({ original_url, short_url });
  })
};

export const getShortUrl = (req, res) => {
  res.redirect(200, 'www.google.com');
};