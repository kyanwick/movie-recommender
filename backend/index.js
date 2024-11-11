const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();
const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movieRoutes");
const preferencesRouter = require('./routes/preferences');
const path = require('path');

const app = express();
const PORT = 5000;

// Serve static files from the 'public' directory (where frontend build is)
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve the React app for all non-API requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Enable CORS to allow requests from frontend
app.use(cors({
    origin: 'http://localhost:3000',  // Replace with your frontend origin
    credentials: true,                // If you need to handle cookies
}));

mongoose.connect(process.env.MONGO_URI) // mongodb://localhost:27017/testdb

.then(() => console.log("Connected to Azure Cosmos DB"))
.catch(err => console.error("Failed to connect to Azure Cosmos DB", err));

app.use(bodyParser.json());

// for authentication movie routes
app.use(express.json());

app.use("/api/auth", authRoutes);       // Authentication routes
app.use("/api/movies", movieRoutes);    // Movie and preference routes
app.use("/api", preferencesRouter); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

