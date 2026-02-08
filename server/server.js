const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const seedDatabase = require('./scripts/seed');
const MenuItem = require('./models/MenuItem');
const errorHandler = require('./middleware/errorHandler');

const app = express();


// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());


// ================== ROUTES ==================
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use(errorHandler);


// ================== START SERVER ==================
const startServer = async () => {
  try {
    // connect DB
    await connectDB();

    console.log('✅ MongoDB Connected');

    // 🔥 AUTO SEED IF EMPTY
    const count = await MenuItem.countDocuments();

    if (count === 0) {
      console.log('🌱 Database empty → seeding...');
      await seedDatabase();
      console.log('✅ Seeding completed');
    }

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Server failed to start:', err);
    process.exit(1);
  }
};

startServer();
