const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userSchema');  // Import the schema

const app = express();
app.use(express.json());  // Parse JSON data

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/passwordGenerator', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Route to handle password upload
app.post('/upload-password', async (req, res) => {
  const { email, name, phoneNumber, websiteName, passwordLength, generatedPassword } = req.body;

  try {
    // Validate that all required fields are present
    if (!email || !name || !phoneNumber || !websiteName || !passwordLength || !generatedPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new user record
    const user = new User({
      email,
      name,
      phoneNumber,
      websiteName,
      passwordLength,
      generatedPassword
    });

    // Save the user data to the database
    await user.save();

    // Send a success response
    res.status(200).json({ message: 'Password successfully uploaded!' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'An error occurred while saving the data.' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
