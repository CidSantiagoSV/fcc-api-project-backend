// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req, res) => {
  console.log(req.params);
  const now = new Date();

  res.json({
    "unix": now.getTime(),
    "utc": now.toUTCString()
  });
});
app.get("/api/:unix?", (req, res) => {
  const unix = req.params.unix;
  let dateObject = new Date();
  const timeStamp = dateObject.setTime(unix * 1000);

  if (dateObject == "Invalid Date") {
    res.json({ error : "Invalid Date" });
  } else {
    res.json({
      "unix": dateObject.getTime(),
      "utc": dateObject.toUTCString()
    });
  }
});

app.get("/api/:date?", (req, res) => {
  console.log(req.params);
  const date = req.params.date;
  let dateObject = new Date(date);

  if (dateObject == "Invalid Date") {
    res.json({ error : "Invalid Date" });
  } else {
    res.json({
      "unix": dateObject.getTime(),
      "utc": dateObject.toUTCString()
    });
  }
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
