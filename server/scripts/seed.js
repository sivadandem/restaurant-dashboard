const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

dotenv.config();

const menuItems = [
  // Appetizers (Starters)
  {
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled to perfection with spices and served with mint chutney',
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
    description: 'Crispy fried pastry filled with spiced potatoes and peas, served with tamarind chutney',
    category: 'Appetizer',
    price: 80,
    ingredients: ['Potatoes', 'Peas', 'Flour', 'Cumin', 'Coriander'],
    isAvailable: true,
    preparationTime: 15,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
  },
  {
    name: 'Veg Spring Rolls',
    description: 'Crispy rolls stuffed with mixed vegetables and served with schezwan sauce',
    category: 'Appetizer',
    price: 180,
    ingredients: ['Cabbage', 'Carrots', 'Spring Onions', 'Noodles', 'Wrapper'],
    isAvailable: true,
    preparationTime: 15,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
  },

  // Main Course
  {
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in rich creamy tomato gravy with butter and aromatic spices',
    category: 'Main Course',
    price: 350,
    ingredients: ['Chicken', 'Tomatoes', 'Butter', 'Cream', 'Kasuri Methi'],
    isAvailable: true,
    preparationTime: 30,
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
  },
  {
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken, saffron, and fried onions',
    category: 'Main Course',
    price: 320,
    ingredients: ['Basmati Rice', 'Chicken', 'Saffron', 'Yogurt', 'Biryani Masala'],
    isAvailable: true,
    preparationTime: 45,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400',
  },
  {
    name: 'Paneer Butter Masala',
    description: 'Soft paneer cubes in rich, creamy tomato-based gravy with Indian spices',
    category: 'Main Course',
    price: 280,
    ingredients: ['Paneer', 'Tomatoes', 'Butter', 'Cream', 'Cashews'],
    isAvailable: true,
    preparationTime: 25,
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
  },
  {
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils in creamy butter sauce, a Punjabi specialty',
    category: 'Main Course',
    price: 220,
    ingredients: ['Black Lentils', 'Kidney Beans', 'Butter', 'Cream', 'Tomatoes'],
    isAvailable: true,
    preparationTime: 35,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
  },
  {
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato masala, served with sambar and chutneys',
    category: 'Main Course',
    price: 150,
    ingredients: ['Rice Batter', 'Potatoes', 'Onions', 'Mustard Seeds', 'Curry Leaves'],
    isAvailable: true,
    preparationTime: 20,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Rameshwaram_Cafe_Dosa.jpg',
  },
  {
    name: 'Chole Bhature',
    description: 'Spicy chickpea curry served with fluffy deep-fried bread',
    category: 'Main Course',
    price: 180,
    ingredients: ['Chickpeas', 'Onions', 'Tomatoes', 'Flour', 'Chole Masala'],
    isAvailable: false,
    preparationTime: 25,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyta2FEc05FPDkoHtzey9a8nmlgumGb7lDew&s',
  },

  // Desserts
  {
    name: 'Gulab Jamun',
    description: 'Soft milk solid dumplings soaked in rose-flavored sugar syrup',
    category: 'Dessert',
    price: 120,
    ingredients: ['Khoya', 'Flour', 'Sugar', 'Rose Water', 'Cardamom'],
    isAvailable: true,
    preparationTime: 10,
    imageUrl: 'https://static.toiimg.com/thumb/63799510.cms?imgsize=1091643&width=800&height=800',
  },
  {
    name: 'Rasmalai',
    description: 'Soft cottage cheese patties soaked in sweetened, thickened milk with saffron',
    category: 'Dessert',
    price: 150,
    ingredients: ['Paneer', 'Milk', 'Sugar', 'Saffron', 'Cardamom'],
    isAvailable: true,
    preparationTime: 10,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKRN8_L8bzbrsJNA3ksQpgMMD8ynTG6aUnQ&s',
  },
  {
    name: 'Gajar Ka Halwa',
    description: 'Traditional carrot pudding cooked with milk, ghee, and topped with dry fruits',
    category: 'Dessert',
    price: 140,
    ingredients: ['Carrots', 'Milk', 'Ghee', 'Sugar', 'Almonds', 'Cashews'],
    isAvailable: true,
    preparationTime: 15,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdnhw0csQkb9wbxS2RSX_HXyrLloLm12QM0g&s',
  },

  // Beverages
  {
    name: 'Mango Lassi',
    description: 'Refreshing yogurt-based drink blended with sweet mango pulp',
    category: 'Beverage',
    price: 100,
    ingredients: ['Yogurt', 'Mango Pulp', 'Sugar', 'Cardamom'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400',
  },
  {
    name: 'Masala Chai',
    description: 'Traditional Indian spiced tea brewed with milk and aromatic spices',
    category: 'Beverage',
    price: 50,
    ingredients: ['Tea Leaves', 'Milk', 'Ginger', 'Cardamom', 'Cinnamon'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400',
  },
  {
    name: 'Sweet Lassi',
    description: 'Creamy yogurt drink sweetened with sugar and flavored with cardamom',
    category: 'Beverage',
    price: 80,
    ingredients: ['Yogurt', 'Sugar', 'Cardamom', 'Ice'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDJl5giiE26PIj2AiDVRiVzwuqVuXVJX7MHg&s',
  },
  {
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime juice mixed with soda, available sweet or salted',
    category: 'Beverage',
    price: 60,
    ingredients: ['Lime', 'Soda', 'Sugar', 'Salt', 'Mint'],
    isAvailable: true,
    preparationTime: 3,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await MenuItem.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing data');

    // Insert menu items
    const createdMenuItems = await MenuItem.insertMany(menuItems);
    console.log(`Inserted ${createdMenuItems.length} menu items`);

    // Create sample orders with Indian names
    const sampleOrders = [
      {
        items: [
          { menuItem: createdMenuItems[0]._id, quantity: 2, price: createdMenuItems[0].price },
          { menuItem: createdMenuItems[4]._id, quantity: 1, price: createdMenuItems[4].price },
        ],
        totalAmount: createdMenuItems[0].price * 2 + createdMenuItems[4].price,
        customerName: 'Rahul Sharma',
        tableNumber: 5,
        status: 'Delivered',
      },
      {
        items: [
          { menuItem: createdMenuItems[5]._id, quantity: 2, price: createdMenuItems[5].price },
          { menuItem: createdMenuItems[10]._id, quantity: 2, price: createdMenuItems[10].price },
        ],
        totalAmount: createdMenuItems[5].price * 2 + createdMenuItems[10].price * 2,
        customerName: 'Priya Patel',
        tableNumber: 3,
        status: 'Preparing',
      },
      {
        items: [
          { menuItem: createdMenuItems[6]._id, quantity: 3, price: createdMenuItems[6].price },
        ],
        totalAmount: createdMenuItems[6].price * 3,
        customerName: 'Amit Kumar',
        tableNumber: 8,
        status: 'Pending',
      },
      {
        items: [
          { menuItem: createdMenuItems[1]._id, quantity: 1, price: createdMenuItems[1].price },
          { menuItem: createdMenuItems[7]._id, quantity: 1, price: createdMenuItems[7].price },
          { menuItem: createdMenuItems[13]._id, quantity: 2, price: createdMenuItems[13].price },
        ],
        totalAmount: createdMenuItems[1].price + createdMenuItems[7].price + createdMenuItems[13].price * 2,
        customerName: 'Sneha Reddy',
        tableNumber: 12,
        status: 'Ready',
      },
      {
        items: [
          { menuItem: createdMenuItems[2]._id, quantity: 4, price: createdMenuItems[2].price },
          { menuItem: createdMenuItems[4]._id, quantity: 2, price: createdMenuItems[4].price },
        ],
        totalAmount: createdMenuItems[2].price * 4 + createdMenuItems[4].price * 2,
        customerName: 'Vikram Singh',
        tableNumber: 7,
        status: 'Delivered',
      },
      {
        items: [
          { menuItem: createdMenuItems[3]._id, quantity: 1, price: createdMenuItems[3].price },
          { menuItem: createdMenuItems[5]._id, quantity: 1, price: createdMenuItems[5].price },
          { menuItem: createdMenuItems[11]._id, quantity: 2, price: createdMenuItems[11].price },
        ],
        totalAmount: createdMenuItems[3].price + createdMenuItems[5].price + createdMenuItems[11].price * 2,
        customerName: 'Ananya Gupta',
        tableNumber: 2,
        status: 'Delivered',
      },
      {
        items: [
          { menuItem: createdMenuItems[8]._id, quantity: 2, price: createdMenuItems[8].price },
          { menuItem: createdMenuItems[14]._id, quantity: 2, price: createdMenuItems[14].price },
        ],
        totalAmount: createdMenuItems[8].price * 2 + createdMenuItems[14].price * 2,
        customerName: 'Arjun Nair',
        tableNumber: 9,
        status: 'Cancelled',
      },
      {
        items: [
          { menuItem: createdMenuItems[0]._id, quantity: 3, price: createdMenuItems[0].price },
          { menuItem: createdMenuItems[7]._id, quantity: 2, price: createdMenuItems[7].price },
        ],
        totalAmount: createdMenuItems[0].price * 3 + createdMenuItems[7].price * 2,
        customerName: 'Deepika Joshi',
        tableNumber: 4,
        status: 'Preparing',
      },
      {
        items: [
          { menuItem: createdMenuItems[4]._id, quantity: 1, price: createdMenuItems[4].price },
          { menuItem: createdMenuItems[12]._id, quantity: 1, price: createdMenuItems[12].price },
        ],
        totalAmount: createdMenuItems[4].price + createdMenuItems[12].price,
        customerName: 'Karthik Menon',
        tableNumber: 6,
        status: 'Delivered',
      },
      {
        items: [
          { menuItem: createdMenuItems[1]._id, quantity: 2, price: createdMenuItems[1].price },
          { menuItem: createdMenuItems[5]._id, quantity: 1, price: createdMenuItems[5].price },
          { menuItem: createdMenuItems[15]._id, quantity: 3, price: createdMenuItems[15].price },
        ],
        totalAmount: createdMenuItems[1].price * 2 + createdMenuItems[5].price + createdMenuItems[15].price * 3,
        customerName: 'Meera Iyer',
        tableNumber: 10,
        status: 'Pending',
      },
    ];

    const createdOrders = await Order.insertMany(sampleOrders);
    console.log(`Inserted ${createdOrders.length} orders`);

    console.log('Database seeded successfully!');
    console.log('\n--- Sample Menu Items ---');
    console.log('Appetizers: Paneer Tikka, Chicken Tikka, Samosa, Veg Spring Rolls');
    console.log('Main Course: Butter Chicken, Biryani, Dal Makhani, Masala Dosa, Chole Bhature');
    console.log('Desserts: Gulab Jamun, Rasmalai, Gajar Ka Halwa');
    console.log('Beverages: Mango Lassi, Masala Chai, Sweet Lassi, Fresh Lime Soda');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();