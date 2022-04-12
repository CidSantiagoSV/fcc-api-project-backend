import path from 'path';
import {fileURLToPath} from 'url';
import { UrlShortener } from '../models/urlshortener.model.js';
import bodyParser from 'body-parser';
import dns from 'dns';
import validUrl from 'valid-url';
import shortid from 'shortid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getUrlShortener = (req, res) => {
  let absolutePath = path.normalize(__dirname + '/..');
  
  res.sendFile(absolutePath + '/views/urlshortener.html');
}

export const postShortUrl = async (req, res) => {
  const baseUrl = 'http:localhost:3000';

  const long_url = req.body.url;
  
  if (!validUrl.isUri(baseUrl)) {
    return res.json({ error: 'invalid url' });
  }
  
  const original_url = shortid.generate();
  
  if (validUrl.isUri(long_url)) {
    try {
      let url = await UrlShortener.findOne({
        long_url
      });
      if (url) {
        res.json(url)
      } else {
        const short_url = baseUrl + '/' + original_url;
        
        const url = new UrlShortener({
          long_url,
          original_url,
          short_url
        });
        await url.save()
        res.json(url)
      }
    } catch (err) {
      console.log(err)
      res.status(500).json('Server Error');
    }
  } else {
    res.status(401).json('Invalid longUrl');
  }
};

export const getShortUrl = (req, res) => {
  res.redirect(200, 'www.google.com');
};