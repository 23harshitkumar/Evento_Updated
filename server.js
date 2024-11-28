const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve the events from a file or data source
app.get('/api/events', (req, res) => {
  // Sample event data or replace with a JSON file
  const events = [
    { "id": 1, "title": "Rock Concert", "city": "Stockholm", "category": "Concerts", "description": "Live rock concert with top artists." },
    { "id": 2, "title": "Football Match", "city": "Stockholm", "category": "Sports", "description": "Exciting football match between two top teams." },
    { "id": 3, "title": "Tech Conference", "city": "Stockholm", "category": "Conferences", "description": "A conference on emerging technologies." },
    { "id": 4, "title": "Jazz Night", "city": "New York", "category": "Concerts", "description": "A night of soothing jazz music." }
  ];

  // Filter events by city if query parameter 'city' is provided
  const { city } = req.query;
  if (city) {
    const filteredEvents = events.filter(event => event.city.toLowerCase() === city.toLowerCase());
    return res.json(filteredEvents);
  }
  
  res.json(events); // Return all events if no city is provided
});

// Serve static files (if you're using a front-end folder, like 'public')
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve the front-end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
