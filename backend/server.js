const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n💡 Troubleshooting tips:');
      console.error('1. Check if your MongoDB password is correct');
      console.error('2. If password contains special characters, URL-encode them:');
      console.error('   - @ becomes %40');
      console.error('   - # becomes %23');
      console.error('   - / becomes %2F');
      console.error('   - : becomes %3A');
      console.error('3. Make sure your IP address is whitelisted in MongoDB Atlas');
      console.error('4. Verify the database user exists in MongoDB Atlas');
      console.error('\n📝 Connection string format:');
      console.error('mongodb+srv://username:password@cluster.mongodb.net/database');
    }
    
    process.exit(1);
  }
};

connectDB();

