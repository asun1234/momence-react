// server/index.js

const express = require("express");
const axios = require('axios');
const cors = require('cors')

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

const serverUrl = 'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

app.get('/cors', function (req, res) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('/', function (req, res) {
  res.json('WELCOME TO THE SERVER.');
})

// scraping web data from url (conversion page)
app.get("/fetchConversionData", (request, response) => {
  var arr = [];
  axios.get(serverUrl)
  .then((response) => {
    // parse scraped data into readable array for client
     arr = response.data.split("\n");
     arr = arr.splice(2, arr.length - 3);
     for(let i = 0; i< arr.length; i++){
      arr[i] = arr[i].split("|");
     }
     this.arr = arr;
    })
    .catch((error) => {
      console.error(error)
    });
    response.json(this.arr);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
