const mongoose = require('mongoose');
const path = require('path');

// ✅ load .env from server folder
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');


// =====================================================
// FULL MENU ITEMS
// =====================================================

const menuItems = [
  // ================= Appetizers =================
  {
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled to perfection with spices and mint chutney',
    category: 'Appetizer',
    price: 280,
    ingredients: ['Paneer', 'Yogurt', 'Spices', 'Bell Peppers', 'Onions'],
    isAvailable: true,
    preparationTime: 20,
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400',
  },
  {
    name: 'Chicken Tikka',
    description: 'Tender chicken pieces marinated in yogurt and spices, grilled in tandoor',
    category: 'Appetizer',
    price: 320,
    ingredients: ['Chicken', 'Yogurt', 'Ginger', 'Garlic', 'Spices'],
    isAvailable: true,
    preparationTime: 25,
    imageUrl: 'https://www.whiskaffair.com/wp-content/uploads/2020/06/Chicken-Tikka-2-3.jpg',
  },
  {
    name: 'Samosa',
    description: 'Crispy fried pastry filled with spiced potatoes and peas',
    category: 'Appetizer',
    price: 80,
    ingredients: ['Potatoes', 'Peas', 'Flour'],
    isAvailable: true,
    preparationTime: 15,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
  },
  {
    name: 'Veg Spring Rolls',
    description: 'Crispy rolls stuffed with vegetables served with schezwan sauce',
    category: 'Appetizer',
    price: 180,
    ingredients: ['Cabbage', 'Carrots', 'Spring Onions', 'Wrapper'],
    isAvailable: true,
    preparationTime: 15,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
  },

  // ================= Main Course =================
  {
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in rich creamy tomato gravy',
    category: 'Main Course',
    price: 350,
    ingredients: ['Chicken', 'Tomatoes', 'Butter', 'Cream'],
    isAvailable: true,
    preparationTime: 30,
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
  },
  {
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken',
    category: 'Main Course',
    price: 320,
    ingredients: ['Rice', 'Chicken', 'Spices'],
    isAvailable: true,
    preparationTime: 45,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
  },
  {
    name: 'Paneer Butter Masala',
    description: 'Soft paneer cubes in creamy tomato gravy',
    category: 'Main Course',
    price: 280,
    ingredients: ['Paneer', 'Tomatoes', 'Butter', 'Cream'],
    isAvailable: true,
    preparationTime: 25,
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
  },
  {
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils in buttery creamy sauce',
    category: 'Main Course',
    price: 220,
    ingredients: ['Black Lentils', 'Kidney Beans', 'Butter'],
    isAvailable: true,
    preparationTime: 35,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
  },
  {
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with potato masala',
    category: 'Main Course',
    price: 150,
    ingredients: ['Rice Batter', 'Potatoes'],
    isAvailable: true,
    preparationTime: 20,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Rameshwaram_Cafe_Dosa.jpg',
  },
  {
    name: 'Chole Bhature',
    description: 'Spicy chickpea curry served with fried bread',
    category: 'Main Course',
    price: 180,
    ingredients: ['Chickpeas', 'Flour'],
    isAvailable: false,
    preparationTime: 25,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyta2FEc05FPDkoHtzey9a8nmlgumGb7lDew&s',
  },

  // ================= Desserts =================
  {
    name: 'Gulab Jamun',
    description: 'Soft dumplings soaked in sugar syrup',
    category: 'Dessert',
    price: 120,
    ingredients: ['Khoya', 'Sugar'],
    isAvailable: true,
    preparationTime: 10,
    imageUrl: 'https://static.toiimg.com/thumb/63799510.cms?imgsize=1091643&width=800&height=800',
  },
  {
    name: 'Rasmalai',
    description: 'Cottage cheese patties soaked in sweetened milk',
    category: 'Dessert',
    price: 150,
    ingredients: ['Paneer', 'Milk', 'Sugar'],
    isAvailable: true,
    preparationTime: 10,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKRN8_L8bzbrsJNA3ksQpgMMD8ynTG6aUnQ&s',
  },
  {
    name: 'Gajar Ka Halwa',
    description: 'Traditional carrot pudding with dry fruits',
    category: 'Dessert',
    price: 140,
    ingredients: ['Carrots', 'Milk', 'Sugar'],
    isAvailable: true,
    preparationTime: 15,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdnhw0csQkb9wbxS2RSX_HXyrLloLm12QM0g&s',
  },

  // ================= Beverages =================
  {
    name: 'Mango Lassi',
    description: 'Sweet mango yogurt drink',
    category: 'Beverage',
    price: 100,
    ingredients: ['Yogurt', 'Mango'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400',
  },
  {
    name: 'Masala Chai',
    description: 'Indian spiced tea with milk',
    category: 'Beverage',
    price: 50,
    ingredients: ['Tea', 'Milk', 'Spices'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400',
  },
  {
    name: 'Sweet Lassi',
    description: 'Creamy sweet yogurt drink',
    category: 'Beverage',
    price: 80,
    ingredients: ['Yogurt', 'Sugar'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDJl5giiE26PIj2AiDVRiVzwuqVuXVJX7MHg&s',
  },
  {
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime soda',
    category: 'Beverage',
    price: 60,
    ingredients: ['Lime', 'Soda'],
    isAvailable: true,
    preparationTime: 3,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400',
  },
];


// =====================================================
// SEED FUNCTION
// =====================================================

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await MenuItem.deleteMany({});
    await Order.deleteMany({});
    console.log('🗑 Old data cleared');

    const createdMenuItems = await MenuItem.insertMany(menuItems);
    console.log(`✅ ${createdMenuItems.length} menu items inserted`);

    await mongoose.connection.close();
    console.log('🎉 Seeding completed');

    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
