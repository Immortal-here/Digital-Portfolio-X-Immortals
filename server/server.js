import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/portfoliobuilder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// User Model
const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const User = mongoose.model('User', UserSchema);

// Signup Route
app.post('/api/portfoliobuilder', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'All fields are required',
        error: 'MISSING_FIELDS'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Email already registered. Please use a different email.',
        error: 'EMAIL_EXISTS'
      });
    }

    // Create new user
    const newUser = new User({ 
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password  
    });

    // Save user to database
    const savedUser = await newUser.save();
    
    console.log('✅ New user created:', {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      createdAt: savedUser.createdAt
    });

    res.status(201).json({ 
      message: 'User registered successfully! 🎉',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        createdAt: savedUser.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Signup error:', error);
    
    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: validationErrors,
        error: 'VALIDATION_ERROR'
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Email already exists',
        error: 'DUPLICATE_EMAIL'
      });
    }

    res.status(500).json({ 
      message: 'Internal server error. Please try again later.',
      error: 'SERVER_ERROR'
    });
  }
});

// Login Route - NEW ROUTE ADDED
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required',
        error: 'MISSING_FIELDS'
      });
    }

    // Email format validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please enter a valid email address',
        error: 'INVALID_EMAIL'
      });
    }

    // Find user in database
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ 
        message: 'No account found with this email. Please sign up first.',
        error: 'USER_NOT_FOUND'
      });
    }

   
    if (user.password !== password) {
      return res.status(400).json({ 
        message: 'Incorrect password. Please try again.',
        error: 'INVALID_PASSWORD'
      });
    }

    // Login successful
    console.log('✅ User logged in successfully:', {
      id: user._id,
      name: user.name,
      email: user.email,
      loginTime: new Date().toISOString()
    });

    res.status(200).json({ 
      success: true,
      message: 'Login successful! Welcome back! 🎉',
      token: 'jwt_token_placeholder', // In production, use proper JWT token
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    
    res.status(500).json({ 
      message: 'Internal server error. Please try again later.',
      error: 'SERVER_ERROR'
    });
  }
});

// Get all users route (for testing - remove in production)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field
    res.json({
      message: 'Users retrieved successfully',
      count: users.length,
      users: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running! 🚀',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Test route to check all endpoints
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API Test Successful! 🎉',
    availableEndpoints: [
      'GET /api/health',
      'GET /api/users',
      'GET /api/test',
      'POST /api/portfoliobuilder',
      'POST /api/login'
    ],
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Users endpoint: http://localhost:${PORT}/api/users`);
  console.log(`🔐 Login endpoint: http://localhost:${PORT}/api/login`);
  console.log(`📋 Test endpoint: http://localhost:${PORT}/api/test`);
});
// Existing imports ke baad add karein
const PortfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  template: {
    type: Object,
    required: true
  },
  personalInfo: {
    name: String,
    title: String,
    bio: String,
    email: String,
    phone: String,
    location: String,
    website: String,
    avatar: String
  },
  skills: [String],
  projects: [{
    title: String,
    description: String,
    technologies: [String],
    liveUrl: String,
    githubUrl: String,
    image: String,
    featured: Boolean
  }],
  experience: [{
    position: String,
    company: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String
  }],
  education: [{
    degree: String,
    field: String,
    institution: String,
    startDate: String,
    endDate: String,
    current: Boolean
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

// Existing routes ke baad add karein
app.post('/api/portfolio', async (req, res) => {
  try {
    const { userId, template } = req.body;
    
    if (!userId || !template) {
      return res.status(400).json({ message: 'User ID and template are required' });
    }

    const newPortfolio = new Portfolio({
      userId,
      template
    });

    const savedPortfolio = await newPortfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({ message: 'Error creating portfolio' });
  }
});

app.put('/api/portfolio/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.json(updatedPortfolio);
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ message: 'Error updating portfolio' });
  }
});

app.get('/api/portfolio/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const portfolio = await Portfolio.findOne({ userId });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ message: 'Error fetching portfolio' });
  }
});