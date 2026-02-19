const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const seedDatabase = require('./scripts/seed');


// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware - CORS (Allow all origins in development)
app.use(cors());

app.use(express.json());

// Routes
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Temporary Seed Route (REMOVE after use)
app.get('/run-seed', async (req, res) => {
  try {
    await seedDatabase();
    res.send('Database Seeded Successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Seeding Failed');
  }
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

