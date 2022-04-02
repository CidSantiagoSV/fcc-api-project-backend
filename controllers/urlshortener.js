import path from 'path';
import {fileURLToPath} from 'url';
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
  const short_url = 1;
  const options = {
    family: 6,
    hints: dns.ADDRCONFIG | dns.V4MAPPED,
  };
  dns.lookup(original_url, options, (err, address, family) =>
    console.log('address: %j family: IPv%s', address, family));
  options.all = true;
  dns.lookup(original_url, options, (err, addresses) => {
    if (err) {
      console.log(err), addresses
    }
    console.log('addresses: %j', addresses)
    console.log(req.body.url);
    res.json({ original_url, short_url, addresses });
  });
}