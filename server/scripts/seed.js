/*************************************************
  Load env FIRST (must be first line)
**************************************************/
require('dotenv').config();

const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

/*************************************************
  Mongo Connection
**************************************************/
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB');
};

/*************************************************
  Menu Items Data
**************************************************/
const menuItems = [
  {
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled with spices',
    category: 'Appetizer',
    price: 280,
    ingredients: ['Paneer', 'Yogurt', 'Spices'],
    isAvailable: true,
    preparationTime: 20,
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',
  },
  {
    name: 'Chicken Tikka',
    description: 'Tender chicken grilled in tandoor',
    category: 'Appetizer',
    price: 320,
    ingredients: ['Chicken', 'Yogurt', 'Spices'],
    isAvailable: true,
    preparationTime: 25,
    imageUrl: 'https://www.whiskaffair.com/wp-content/uploads/2020/06/Chicken-Tikka-2-3.jpg',
  },
  {
    name: 'Samosa',
    description: 'Crispy fried pastry with potato filling',
    category: 'Appetizer',
    price: 80,
    ingredients: ['Potatoes', 'Flour'],
    isAvailable: true,
    preparationTime: 15,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
  },
  {
    name: 'Butter Chicken',
    description: 'Chicken cooked in creamy tomato gravy',
    category: 'Main Course',
    price: 350,
    ingredients: ['Chicken', 'Butter', 'Cream'],
    isAvailable: true,
    preparationTime: 30,
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
  },
  {
    name: 'Chicken Biryani',
    description: 'Fragrant rice with spiced chicken',
    category: 'Main Course',
    price: 320,
    ingredients: ['Rice', 'Chicken'],
    isAvailable: true,
    preparationTime: 45,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
  },
  {
    name: 'Paneer Butter Masala',
    description: 'Paneer in rich creamy gravy',
    category: 'Main Course',
    price: 280,
    ingredients: ['Paneer', 'Cream'],
    isAvailable: true,
    preparationTime: 25,
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
  },
  {
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils with butter',
    category: 'Main Course',
    price: 220,
    ingredients: ['Lentils', 'Butter'],
    isAvailable: true,
    preparationTime: 35,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
  },
  {
    name: 'Gulab Jamun',
    description: 'Sweet milk dumplings in syrup',
    category: 'Dessert',
    price: 120,
    ingredients: ['Khoya', 'Sugar'],
    isAvailable: true,
    preparationTime: 10,
    imageUrl: 'https://static.toiimg.com/thumb/63799510.cms?width=800',
  },
  {
    name: 'Mango Lassi',
    description: 'Refreshing mango yogurt drink',
    category: 'Beverage',
    price: 100,
    ingredients: ['Yogurt', 'Mango'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400',
  },
];

/*************************************************
  Seed Database
**************************************************/
const seedDatabase = async () => {
  try {

    console.log('🧹 Clearing old data...');
    await MenuItem.deleteMany({});
    await Order.deleteMany({});

    console.log('📦 Inserting menu items...');
    const createdMenuItems = await MenuItem.insertMany(menuItems);

    const sampleOrders = [
      {
        items: [
          { menuItem: createdMenuItems[0]._id, quantity: 2, price: 280 },
          { menuItem: createdMenuItems[3]._id, quantity: 1, price: 350 },
        ],
        totalAmount: 910,
        customerName: 'Rahul Sharma',
        tableNumber: 5,
        status: 'Delivered',
      },
      {
        items: [
          { menuItem: createdMenuItems[4]._id, quantity: 1, price: 320 },
        ],
        totalAmount: 320,
        customerName: 'Priya Patel',
        tableNumber: 3,
        status: 'Preparing',
      },
    ];

    console.log('🧾 Inserting orders...');
    await Order.insertMany(sampleOrders);

    console.log('🎉 Database seeded successfully!');


  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error
  } 
};

module.exports = seedDatabase;

