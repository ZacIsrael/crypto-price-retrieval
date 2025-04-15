// Import required modules
const express = require('express');          // Express is used to create the HTTP server
const WebSocket = require('ws');             // 'ws' is a WebSocket client library
require('dotenv').config();                  // Loads environment variables from .env file

// Create an instance of an Express app
const app = express();
const PORT = 3000;                           // Port the server will run on

/**
 * This route is triggered when someone accesses:
 * http://localhost:3000/connect-to-blockchain
 */
app.get('/connect-to-blockchain', (req, res) => {
  // URL of the Blockchain.com WebSocket gateway
  const url = "wss://ws.blockchain.info/mercury-gateway/v1/ws";

  // WebSocket connection options — including the required 'Origin' header
  const options = {
    headers: {
      Origin: 'https://exchange.blockchain.com'
    }
  };

  // Create a WebSocket connection to the specified URL with the headers
  const ws = new WebSocket(url, options);

  // This event fires when the WebSocket connection is successfully opened
  ws.on('open', () => {
    console.log('WebSocket connection opened');

    // Construct the subscription message with your API secret
    const msg = JSON.stringify({
      token: process.env.API_SECRET,   // Your API secret loaded from .env file
      action: 'subscribe',             // The action to perform
      channel: 'auth'                  // The channel to subscribe to
    });

    // Send the subscription message to the WebSocket server
    ws.send(msg);
  });

  // This event is triggered when a message is received from the WebSocket server
  ws.on('message', (data) => {
    console.log('Received from WebSocket:', data.toString());

    // Send the WebSocket response back to the user who hit the HTTP route
    res.send(`WebSocket response: ${data.toString()}`);

    // Close the WebSocket connection (just like the original Python code)
    ws.close();
  });

  // Handle any WebSocket errors (like network issues or bad token)
  ws.on('error', (err) => {
    console.error('WebSocket error:', err);

    // Return an HTTP 500 error to the client
    res.status(500).send('WebSocket connection failed');
  });
});

// Start the Express HTTP server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
