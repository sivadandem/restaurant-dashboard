# 🍽️ Restaurant Admin Dashboard

A full-stack restaurant management application built for the Eatoes Intern Technical Assessment. This dashboard allows restaurant owners to manage menu items, track orders, and monitor business analytics.

![Dashboard Preview](screenshots/dashboard.png)

## 🌟 Features

### Menu Management
- ✅ View all menu items in a responsive grid layout
- ✅ Search menu items with **debouncing** (300ms delay)
- ✅ Filter by category (Appetizer, Main Course, Dessert, Beverage)
- ✅ Filter by availability status
- ✅ Add new menu items with form validation
- ✅ Edit existing menu items
- ✅ Delete menu items with confirmation
- ✅ Toggle availability with **optimistic UI updates**

### Orders Management
- ✅ View all orders with status badges
- ✅ Filter orders by status (Pending, Preparing, Ready, Delivered, Cancelled)
- ✅ Pagination for large order lists
- ✅ Update order status with dropdown
- ✅ Expandable order details view
- ✅ Order statistics overview

### Dashboard Analytics
- ✅ Total menu items and availability count
- ✅ Total orders and pending orders count
- ✅ Revenue from delivered orders
- ✅ Top 5 selling items (MongoDB Aggregation)
- ✅ Recent orders list

### Technical Highlights
- ✅ RESTful API design
- ✅ MongoDB text indexing for search
- ✅ Custom React hooks (useDebounce)
- ✅ Context API for global state management
- ✅ Optimistic UI updates with rollback
- ✅ Toast notifications for user feedback
- ✅ Responsive design with Tailwind CSS

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| State Management | React Context API |
| HTTP Client | Axios |
| Icons | Lucide React |
| Notifications | React Hot Toast |

## 📁 Project Structure

```
restaurant-dashboard/
├── server/
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── menuController.js        # Menu CRUD logic
│   │   └── orderController.js       # Order logic + aggregation
│   ├── middleware/
│   │   └── errorHandler.js          # Global error handler
│   ├── models/
│   │   ├── MenuItem.js              # Menu schema with text index
│   │   └── Order.js                 # Order schema with auto-generated orderNumber
│   ├── routes/
│   │   ├── menuRoutes.js            # Menu API routes
│   │   └── orderRoutes.js           # Order API routes
│   ├── scripts/
│   │   └── seed.js                  # Database seeding script
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Example env file
│   ├── package.json
│   └── server.js                    # Express app entry point
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Pagination.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── menu/
│   │   │   │   ├── MenuCard.jsx
│   │   │   │   ├── MenuFilters.jsx
│   │   │   │   └── MenuForm.jsx
│   │   │   └── orders/
│   │   │       ├── OrderCard.jsx
│   │   │       ├── OrderFilters.jsx
│   │   │       └── OrderStats.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx       # Global state management
│   │   ├── hooks/
│   │   │   └── useDebounce.js       # Debounce custom hook
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MenuManagement.jsx
│   │   │   └── OrdersPage.jsx
│   │   ├── services/
│   │   │   └── api.js               # Axios API configuration
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- MongoDB Atlas account (free tier)
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/restaurant-dashboard.git
cd restaurant-dashboard
```

**2. Setup Backend**
```bash
cd server
npm install
```

**3. Configure Backend Environment**

Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/restaurant_db?retryWrites=true&w=majority
NODE_ENV=development
```

**4. Setup Frontend**
```bash
cd ../client
npm install
```

**5. Configure Frontend Environment**

Create a `.env` file in the `client` folder:
```env
VITE_API_URL=http://localhost:5000/api
```

**6. Seed the Database**
```bash
cd ../server
npm run seed
```

**7. Start the Application**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

**8. Open in Browser**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 📡 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-app.onrender.com/api
```

### Menu Endpoints

#### Get All Menu Items
```http
GET /api/menu
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category |
| isAvailable | boolean | Filter by availability |
| minPrice | number | Minimum price filter |
| maxPrice | number | Maximum price filter |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 10) |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Grilled Salmon",
      "description": "Fresh Atlantic salmon...",
      "category": "Main Course",
      "price": 24.99,
      "ingredients": ["Salmon", "Lemon", "Herbs"],
      "isAvailable": true,
      "preparationTime": 25,
      "imageUrl": "https://...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 15,
    "itemsPerPage": 10
  }
}
```

#### Search Menu Items
```http
GET /api/menu/search?q=chicken
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 3
}
```

#### Get Single Menu Item
```http
GET /api/menu/:id
```

#### Create Menu Item
```http
POST /api/menu
Content-Type: application/json

{
  "name": "New Dish",
  "description": "Delicious new dish",
  "category": "Main Course",
  "price": 19.99,
  "ingredients": ["Ingredient 1", "Ingredient 2"],
  "isAvailable": true,
  "preparationTime": 20,
  "imageUrl": "https://example.com/image.jpg"
}
```

#### Update Menu Item
```http
PUT /api/menu/:id
Content-Type: application/json

{
  "name": "Updated Dish Name",
  "price": 21.99
}
```

#### Delete Menu Item
```http
DELETE /api/menu/:id
```

#### Toggle Availability
```http
PATCH /api/menu/:id/availability
```

### Order Endpoints

#### Get All Orders
```http
GET /api/orders
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | Filter by status |
| page | number | Page number |
| limit | number | Items per page |

#### Get Single Order
```http
GET /api/orders/:id
```

#### Create Order
```http
POST /api/orders
Content-Type: application/json

{
  "items": [
    {
      "menuItem": "menuItemId",
      "quantity": 2,
      "price": 24.99
    }
  ],
  "customerName": "John Doe",
  "tableNumber": 5
}
```

#### Update Order Status
```http
PATCH /api/orders/:id/status
Content-Type: application/json

{
  "status": "Preparing"
}
```

#### Get Top Sellers (Aggregation)
```http
GET /api/orders/analytics/top-sellers
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Grilled Salmon",
      "category": "Main Course",
      "price": 24.99,
      "totalQuantity": 15,
      "totalRevenue": 374.85
    }
  ]
}
```

## 🎯 Technical Challenges Implemented

### Challenge 1: Search with Debouncing ✅

**Implementation:** `client/src/hooks/useDebounce.js`

```javascript
import { useState, useEffect } from 'react';

export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

**Usage in MenuManagement.jsx:**

```javascript
const [searchQuery, setSearchQuery] = useState('');
const debouncedSearch = useDebounce(searchQuery, 300);

useEffect(() => {
  if (debouncedSearch) {
    searchMenuItems(debouncedSearch);
  } else {
    fetchMenuItems();
  }
}, [debouncedSearch]);
```

### Challenge 2: MongoDB Aggregation ✅

**Implementation:** `server/controllers/orderController.js`

```javascript
const getTopSellers = async (req, res) => {
  const topSellers = await Order.aggregate([
    { $match: { status: 'Delivered' } },
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.menuItem',
        totalQuantity: { $sum: '$items.quantity' },
        totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
      },
    },
    {
      $lookup: {
        from: 'menuitems',
        localField: '_id',
        foreignField: '_id',
        as: 'menuItemDetails',
      },
    },
    { $unwind: '$menuItemDetails' },
    {
      $project: {
        _id: 1,
        name: '$menuItemDetails.name',
        category: '$menuItemDetails.category',
        price: '$menuItemDetails.price',
        totalQuantity: 1,
        totalRevenue: 1,
      },
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 5 },
  ]);

  res.status(200).json({ success: true, data: topSellers });
};
```

### Challenge 3: Optimistic UI Updates ✅

**Implementation:** `client/src/context/AppContext.jsx`

```javascript
const toggleAvailability = useCallback(async (id) => {
  // Store previous state for rollback
  const previousItems = [...menuItems];
  
  // Optimistic update - immediately update UI
  setMenuItems((prev) =>
    prev.map((item) =>
      item._id === id ? { ...item, isAvailable: !item.isAvailable } : item
    )
  );

  try {
    await menuAPI.toggleAvailability(id);
    toast.success('Availability updated');
  } catch (error) {
    // Rollback on error
    setMenuItems(previousItems);
    toast.error('Failed to update availability. Changes reverted.');
  }
}, [menuItems]);
```

## 🌐 Deployment

### Live URLs
- **Frontend:** https://your-app.netlify.app
- **Backend API:** https://your-app.onrender.com

### Deployment Steps

#### Backend (Render)
1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Add environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-app.netlify.app`

#### Frontend (Netlify)
1. Create account at [netlify.com](https://netlify.com)
2. Connect GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable:
   - `VITE_API_URL=https://your-app.onrender.com/api`
6. Create `client/public/_redirects` file:
   ```
   /* /index.html 200
   ```

## 📸 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Menu Management
![Menu Management](screenshots/menu.png)

### Orders Page
![Orders](screenshots/orders.png)

## 🧪 Testing the API

### Using cURL

```bash
# Get all menu items
curl http://localhost:5000/api/menu

# Search menu items
curl "http://localhost:5000/api/menu/search?q=chicken"

# Create menu item
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","category":"Appetizer","price":9.99}'

# Toggle availability
curl -X PATCH http://localhost:5000/api/menu/ITEM_ID/availability

# Get orders
curl http://localhost:5000/api/orders

# Update order status
curl -X PATCH http://localhost:5000/api/orders/ORDER_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status":"Preparing"}'
```

## 🐛 Troubleshooting

### "Failed to fetch menu items" error
- Ensure backend is running on port 5000
- Check CORS settings in `server.js`
- Verify `VITE_API_URL` in client `.env`

### MongoDB connection error
- Check `MONGODB_URI` in server `.env`
- Whitelist IP in MongoDB Atlas (0.0.0.0/0)
- Verify database user credentials

### Tailwind styles not working
- Ensure `tailwind.config.js` content paths are correct
- Check `index.css` has Tailwind imports
- Restart dev server after config changes

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 📝 License

This project is created for the Eatoes Intern Technical Assessment.