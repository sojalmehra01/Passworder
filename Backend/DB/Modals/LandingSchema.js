const mongoose = require('mongoose');

const LandingSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure each email is unique
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);  // Simple email validation
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
  type: String,
  validate: {
    validator: function (v) {
      return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{9}$/.test(v);
    },
    message: props => `${props.value} is not a valid phone number!`
  }
},
  websiteName: {
    type: String,
    required: true
  },
  passwordLength: {
    type: Number,
    required: true,
    min: 8,  // Ensure minimum length of 8 characters
    max: 20
  },
  generatedPassword: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now  // Automatically set the creation date
  }
});

module.exports = mongoose.model('User', LandingSchema);
