const express = require('express');
const User = require('../DB/Modals/LandingSchema');  // Import the schema

const router = express.Router();


// Route to handle password upload
router.post('/upload', async (req, res) => {
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

module.exports = router;
