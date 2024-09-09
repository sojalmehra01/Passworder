const express = require('express');
const mongoose = require('mongoose')
const connectDB = require('./DB/Connection')
const passwordRoutes = require('./Routes/PasswordRoutes');  // Import the password routes

const app = express();

app.use(express.json());  // Parse JSON data

// Connect to MongoDB
connectDB();  // Call the connectDB function to connect to the database

// Use the password-related routes
app.use('/password', passwordRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
