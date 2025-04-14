
// import express 
import express from "express";
// import axios 
import axios from "axios";

// create express application
const app = express();

// PORT # for application
const port = 3000;


// listen for requests on port # and start the server
app.listen(port, () => {
    console.log(`Serever is running on port ${port}`);
});