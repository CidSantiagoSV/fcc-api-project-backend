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
  const original_url = req.body.url;
  if (!validUrl.isUri(original_url)) {
    return res.json({ error: 'invalid url' });
  }
  const short_url = shortid.generate();
  
  if (validUrl.isUri(original_url)) {
    try {
      let url = await UrlShortener.findOne({
        original_url
      });
      if (url) {
        res.json(url)
      } else {
        const url = new UrlShortener({
          original_url,
          short_url
        });
        url.save()
        res.json(url)
      }
    }
    catch (err) {
      console.error(err)
      res.status(500).json('Server Error')
    }
  } else {
    return res.json({ error: 'invalid url' });
  }
};

export const getShortUrl = (req, res) => {
  let generatedShortUrl = req.params.short_url;
  UrlShortener.find({  short_url: generatedShortUrl  }).then(function(foundUrl){
    let urlRedirect = foundUrl[0];
    res.redirect(urlRedirect.original_url);
  });
}