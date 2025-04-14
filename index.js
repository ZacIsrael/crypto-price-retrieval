
// import express (application)
import express from "express";
// import axios (making API calls)
import axios from "axios";

//used for parsing through requests & repsonses 
import bodyParse from "body-parser";

// create express application
const app = express();

// PORT # for application
const port = 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");

// tells EJS that all of the static files are in the public folder
app.use(express.static("public"));

// default request (when the page loads up)
app.get('/', async (req, res) => {
    console.log('Home page');
});

// listen for requests on port # and start the server
app.listen(port, () => {
    console.log(`Serever is running on port ${port}`);
});