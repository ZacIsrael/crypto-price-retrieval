// import express (application)
import express from "express";
// import axios (making API calls)
import axios from "axios";

//used for parsing through requests & repsonses
import bodyParse from "body-parser";

// 'ws' is a WebSocket client library
import WebSocket from "ws";

// allows me to access my API KEY & API Secret
import dotenv from "dotenv";
dotenv.config();
// require("dotenv").config();

// create express application
const app = express();

// PORT # for application
const port = 3000;

// URL of Blockchain.com's API
const BLOCKCHAIN_URL = 'https://api.blockchain.com/v3/exchange/tickers';

// Set EJS as the templating engine
app.set("view engine", "ejs");

// tells EJS that all of the static files are in the public folder
app.use(express.static("public"));

// API Key allows this application to make requests to blockchain's API
const headers = {
  "X-API-Token": process.env.API_KEY, // header
  "Content-Type": "application/json",
};

// configuration object that will be used in axios requests
const config = {
  // API Key allows this application to make requests to blockchain's API
  headers: headers,
};

// this endpoint retrieves all the crypto currencies
app.get('/all-coins', async (req, res) => {

  try {
    // gets the ticker price for all of the cryptocurrencies 
    const result = await axios.get(BLOCKCHAIN_URL);
    // so much data that it'll need to be paginated
    let traidingPairs = result.data;
    console.log('traidingPairs = ', traidingPairs);
    // send the object that contains the trading pairs to the ejs file
    // res.send('index', {
    //   content: traidingPairs
    // });

    // Testing purposes
    res.send(traidingPairs);

  } catch(error){
    console.log('Error: ', error);
    res.send('index', {
      content: error.data
    });
  }
});



// default request (when the page loads up)
app.get('/', async (req, res) => {
  console.log("Home page");
});

// retrieve a cryptocurrency by its name
app.post("/get-coin-by-name", async (req, res) => {
  console.log("req.body = ", req.body);
});

// listen for requests on port # and start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
