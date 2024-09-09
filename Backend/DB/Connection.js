require('dotenv').config();
const mongoose = require('mongoose');

// Use the URI from environment variables
const mongoURL = process.env.MONGODB_URI; // Should come from .env


const connectDB = async () => {
  await mongoose.connect(mongoURL, {
      autoIndex: true, //make this also true
  })
  .then(() => console.log('Connected'))
  .catch(err => console.error('Could not connect to MongoDB', err));
};

// const connectDB = async () => {
//   try {
//     if (!uri) {
//       throw new Error('MongoDB URI is not set in environment variables');
//     }
//     await mongoose.connect(uri,{
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection failed:', error);
//     process.exit(1);
//   }
// };

module.exports = connectDB;
