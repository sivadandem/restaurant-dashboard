# 🍽️ Restaurant Admin Dashboard

A full-stack restaurant management application built for the **Eatoes Intern Technical Assessment**. This dashboard allows restaurant owners to manage menu items, track orders, and monitor business analytics.

![Dashboard Preview](screenshots/dashboard.png)

---

## 🌐 Live Demo

| Platform | URL |
|----------|-----|
| 🎨 **Frontend** | [https://eatoes-restaurantdashboard-sivadandem.netlify.app](https://eatoes-restaurantdashboard-sivadandem.netlify.app) |
| 🔧 **Backend API** | [https://restaurant-api-g6ln.onrender.com/api](https://restaurant-api-g6ln.onrender.com/api) |
| ❤️ **Health Check** | [https://restaurant-api-g6ln.onrender.com/api/health](https://restaurant-api-g6ln.onrender.com/api/health) |

> ⚠️ **Note:** Backend is hosted on Render's free tier. First request may take 30-60 seconds if the server is sleeping.

---

## 📑 Table of Contents

1. [Features](#-features)
2. [Tech Stack](#-tech-stack)
3. [Project Structure](#-project-structure)
4. [Getting Started - Local Development](#-getting-started---local-development)
   - [Prerequisites](#prerequisites)
   - [Step 1: Clone the Repository](#step-1-clone-the-repository)
   - [Step 2: Setup Backend](#step-2-setup-backend)
   - [Step 3: Configure Backend Environment](#step-3-configure-backend-environment)
   - [Step 4: Setup Frontend](#step-4-setup-frontend)
   - [Step 5: Configure Frontend Environment](#step-5-configure-frontend-environment)
   - [Step 6: Seed the Database](#step-6-seed-the-database-optional)
   - [Step 7: Start the Application](#step-7-start-the-application)
   - [Step 8: Open in Browser](#step-8-open-in-browser)
5. [API Documentation](#-api-documentation)
   - [Base URLs](#base-urls)
   - [Menu Endpoints](#-menu-endpoints)
   - [Order Endpoints](#-order-endpoints)
   - [Health Check Endpoint](#-health-check-endpoint)
6. [Technical Challenges Implemented](#-technical-challenges-implemented)
7. [Deployment Guide](#-deployment-guide)
   - [Architecture Overview](#architecture-overview)
   - [Step 1: Push Code to GitHub](#step-1-push-code-to-github)
   - [Step 2: Deploy Backend to Render](#step-2-deploy-backend-to-render)
   - [Step 3: Deploy Frontend to Netlify](#step-3-deploy-frontend-to-netlify)
   - [Step 4: Connect Frontend and Backend](#step-4-connect-frontend--backend-cors)
   - [Step 5: Seed Production Database](#step-5-seed-production-database)
   - [Auto-Deployment](#auto-deployment)
8. [Environment Variables](#-environment-variables)
9. [Screenshots](#-screenshots)
10. [Testing the API](#-testing-the-api)
11. [Troubleshooting](#-troubleshooting)
12. [Author](#-author)
13. [License](#-license)
14. [Acknowledgments](#-acknowledgments)

---

## 🌟 Features

### 📋 Menu Management

| Feature | Status |
|---------|--------|
| View all menu items in responsive grid layout | ✅ |
| Search menu items with **debouncing** (300ms delay) | ✅ |
| Filter by category (Appetizer, Main Course, Dessert, Beverage) | ✅ |
| Filter by availability status | ✅ |
| Add new menu items with form validation | ✅ |
| Edit existing menu items | ✅ |
| Delete menu items with confirmation | ✅ |
| Toggle availability with **optimistic UI updates** | ✅ |

### 📦 Orders Management

| Feature | Status |
|---------|--------|
| View all orders with status badges | ✅ |
| Filter orders by status (Pending, Preparing, Ready, Delivered, Cancelled) | ✅ |
| Pagination for large order lists | ✅ |
| Update order status with dropdown | ✅ |
| Expandable order details view | ✅ |
| Order statistics overview | ✅ |

### 📊 Dashboard Analytics

| Feature | Status |
|---------|--------|
| Total menu items and availability count | ✅ |
| Total orders and pending orders count | ✅ |
| Revenue from delivered orders | ✅ |
| Top 5 selling items (MongoDB Aggregation) | ✅ |
| Recent orders list | ✅ |

### ⚡ Technical Highlights

| Feature | Status |
|---------|--------|
| RESTful API design | ✅ |
| MongoDB text indexing for search | ✅ |
| Custom React hooks (useDebounce) | ✅ |
| Context API for global state management | ✅ |
| Optimistic UI updates with rollback | ✅ |
| Toast notifications for user feedback | ✅ |
| Responsive design with Tailwind CSS | ✅ |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| Vite | Build Tool & Dev Server |
| Tailwind CSS | Utility-First Styling |
| React Context API | Global State Management |
| Axios | HTTP Client |
| Lucide React | Icon Library |
| React Hot Toast | Toast Notifications |
| React Router DOM | Client-Side Routing |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript Runtime |
| Express.js | Web Framework |
| MongoDB Atlas | Cloud Database |
| Mongoose | MongoDB ODM |
| CORS | Cross-Origin Resource Sharing |
| dotenv | Environment Variables |
| express-validator | Input Validation |

### Deployment & DevOps

| Platform | Purpose |
|----------|---------|
| Netlify | Frontend Hosting (CDN) |
| Render | Backend Hosting (Node.js) |
| MongoDB Atlas | Database Hosting |
| GitHub | Version Control & CI/CD Trigger |

---

## 📁 Project Structure

```
restaurant-dashboard/
│
├── 📂 server/                      # ====== BACKEND ======
│   │
│   ├── 📂 config/
│   │   └── 📄 db.js                # MongoDB connection configuration
│   │
│   ├── 📂 controllers/
│   │   ├── 📄 menuController.js    # Menu CRUD operations
│   │   └── 📄 orderController.js   # Order operations & aggregation
│   │
│   ├── 📂 middleware/
│   │   └── 📄 errorHandler.js      # Global error handling middleware
│   │
│   ├── 📂 models/
│   │   ├── 📄 MenuItem.js          # Menu item schema (with text index)
│   │   └── 📄 Order.js             # Order schema (with auto orderNumber)
│   │
│   ├── 📂 routes/
│   │   ├── 📄 menuRoutes.js        # Menu API routes (/api/menu)
│   │   └── 📄 orderRoutes.js       # Order API routes (/api/orders)
│   │
│   ├── 📂 scripts/
│   │   └── 📄 seed.js              # Database seeding script
│   │
│   ├── 📄 .env.example             # Example environment variables
│   ├── 📄 .gitignore               # Git ignore rules for server
│   ├── 📄 package.json             # Server dependencies & scripts
│   └── 📄 server.js                # Express app entry point
│
├── 📂 client/                      # ====== FRONTEND ======
│   │
│   ├── 📂 public/
│   │   └── 📄 _redirects           # Netlify SPA redirect rules
│   │
│   ├── 📂 src/
│   │   │
│   │   ├── 📂 components/
│   │   │   │
│   │   │   ├── 📂 common/          # Shared/Reusable components
│   │   │   │   ├── 📄 LoadingSpinner.jsx  # Loading indicator
│   │   │   │   ├── 📄 Modal.jsx           # Reusable modal component
│   │   │   │   ├── 📄 Navbar.jsx          # Top navigation bar
│   │   │   │   ├── 📄 Pagination.jsx      # Pagination component
│   │   │   │   └── 📄 Sidebar.jsx         # Side navigation menu
│   │   │   │
│   │   │   ├── 📂 menu/            # Menu-related components
│   │   │   │   ├── 📄 MenuCard.jsx        # Individual menu item card
│   │   │   │   ├── 📄 MenuFilters.jsx     # Search & filter controls
│   │   │   │   └── 📄 MenuForm.jsx        # Add/Edit menu item form
│   │   │   │
│   │   │   └── 📂 orders/          # Order-related components
│   │   │       ├── 📄 OrderCard.jsx       # Individual order card
│   │   │       ├── 📄 OrderFilters.jsx    # Order status filters
│   │   │       └── 📄 OrderStats.jsx      # Order statistics display
│   │   │
│   │   ├── 📂 context/
│   │   │   └── 📄 AppContext.jsx   # Global state (Context API)
│   │   │
│   │   ├── 📂 hooks/
│   │   │   └── 📄 useDebounce.js   # Custom debounce hook
│   │   │
│   │   ├── 📂 pages/
│   │   │   ├── 📄 Dashboard.jsx    # Main dashboard page
│   │   │   ├── 📄 MenuManagement.jsx  # Menu management page
│   │   │   └── 📄 OrdersPage.jsx   # Orders management page
│   │   │
│   │   ├── 📂 services/
│   │   │   └── 📄 api.js           # Axios instance & API calls
│   │   │
│   │   ├── 📄 App.jsx              # Main App component with routes
│   │   ├── 📄 main.jsx             # React entry point
│   │   └── 📄 index.css            # Global styles & Tailwind imports
│   │
│   ├── 📄 .env.example             # Example environment variables
│   ├── 📄 .gitignore               # Git ignore rules for client
│   ├── 📄 index.html               # HTML entry point
│   ├── 📄 package.json             # Client dependencies & scripts
│   ├── 📄 postcss.config.js        # PostCSS configuration
│   ├── 📄 tailwind.config.js       # Tailwind CSS configuration
│   └── 📄 vite.config.js           # Vite configuration
│
├── 📂 screenshots/                 # ====== SCREENSHOTS ======
│   ├── 📷 dashboard.png            # Dashboard page screenshot
│   ├── 📷 menu.png                 # Menu page screenshot
│   └── 📷 orders.png               # Orders page screenshot
│
├── 📄 .gitignore                   # Root git ignore rules
└── 📄 README.md                    # Project documentation (this file)
```

---

## 🚀 Getting Started - Local Development

Follow these steps to run the project on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed:

| Software | Version | Download Link | How to Check |
|----------|---------|---------------|--------------|
| **Node.js** | v18.0.0 or higher | [nodejs.org](https://nodejs.org/) | `node --version` |
| **npm** | v9.0.0 or higher | Comes with Node.js | `npm --version` |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) | `git --version` |

You'll also need:

| Service | Purpose | Sign Up |
|---------|---------|---------|
| **MongoDB Atlas** | Cloud Database | [mongodb.com/atlas](https://www.mongodb.com/atlas) (Free tier available) |

---

### Step 1: Clone the Repository

Open your terminal and run:

```bash
# Clone the repository
git clone https://github.com/sivadandem/restaurant-dashboard.git

# Navigate into the project folder
cd restaurant-dashboard
```

### Step 2: Setup Backend

```bash
# Navigate to server folder
cd server

# Install all dependencies
npm install
```

Expected output:

```
added 85 packages, and audited 86 packages in 5s
found 0 vulnerabilities
```

### Step 3: Configure Backend Environment

Create a new file called `.env` inside the `server` folder:

**File: `server/.env`**

```env
# ===== SERVER CONFIGURATION =====
PORT=5000
NODE_ENV=development

# ===== DATABASE =====
# Replace with your MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/restaurant_db?retryWrites=true&w=majority

# ===== CORS =====
FRONTEND_URL=http://localhost:5173
```

📝 **How to Get Your MongoDB URI:**

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign in (or create a free account)

2. **Create a Cluster** (if you don't have one):
   - Click "Build a Database"
   - Select "FREE" tier (M0 Sandbox)
   - Choose a cloud provider and region
   - Click "Create Cluster"

3. **Create a Database User**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter a username and password (save these!)
   - Set "Database User Privileges" to "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP Address**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (adds 0.0.0.0/0)
   - Click "Confirm"

5. **Get Your Connection String**:
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Add your database name before the `?` (e.g., `/restaurant_db?`)

**Example Connection String:**

```
mongodb+srv://myuser:MyP@ssw0rd@cluster0.abc123.mongodb.net/restaurant_db?retryWrites=true&w=majority
```

### Step 4: Setup Frontend

```bash
# Navigate to client folder (from project root)
cd ../client

# OR if you're in the server folder
cd ../client

# Install all dependencies
npm install
```

Expected output:

```
added 215 packages, and audited 216 packages in 8s
found 0 vulnerabilities
```

### Step 5: Configure Frontend Environment

Create a new file called `.env` inside the `client` folder:

**File: `client/.env`**

```env
# ===== API CONFIGURATION =====
VITE_API_URL=http://localhost:5000/api
```

⚠️ **Important:** The variable MUST start with `VITE_` for Vite to expose it to the frontend.

### Step 6: Seed the Database (Optional)

Add sample menu items and orders to your database:

```bash
# Navigate to server folder
cd ../server

# Run the seed script
npm run seed
```

Expected output:

```
Connected to MongoDB
Existing data cleared
Sample menu items created
Sample orders created
Database seeded successfully!
Connection closed
```

### Step 7: Start the Application

You need **TWO terminal windows** - one for backend and one for frontend.

**Terminal 1 - Start Backend Server:**

```bash
# Make sure you're in the server folder
cd server

# Start the development server
npm run dev
```

Expected output:

```
Server running in development mode on port 5000
MongoDB Connected: cluster0.abc123.mongodb.net
```

**Terminal 2 - Start Frontend Server:**

```bash
# Open a NEW terminal window
# Navigate to the client folder
cd client

# Start the development server
npm run dev
```

Expected output:

```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 8: Open in Browser

Open your web browser and visit:

| Application | URL | Description |
|-------------|-----|-------------|
| **Frontend** | http://localhost:5173 | React application |
| **Backend API** | http://localhost:5000/api | REST API |
| **Health Check** | http://localhost:5000/api/health | Server status |
| **Menu Items** | http://localhost:5000/api/menu | Menu data |
| **Orders** | http://localhost:5000/api/orders | Order data |

---

## 📡 API Documentation

### Base URLs

| Environment | Base URL |
|-------------|----------|
| **Local Development** | `http://localhost:5000/api` |
| **Production** | `https://restaurant-api-g6ln.onrender.com/api` |

### 📋 Menu Endpoints

#### 1. Get All Menu Items

Retrieve all menu items with optional filtering and pagination.

```http
GET /api/menu
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `category` | string | No | - | Filter by category |
| `isAvailable` | boolean | No | - | Filter by availability |
| `minPrice` | number | No | - | Minimum price |
| `maxPrice` | number | No | - | Maximum price |
| `page` | number | No | 1 | Page number |
| `limit` | number | No | 10 | Items per page |

**Example Requests:**

```bash
# Get all menu items
curl http://localhost:5000/api/menu

# Get only available items
curl "http://localhost:5000/api/menu?isAvailable=true"

# Get Main Course items
curl "http://localhost:5000/api/menu?category=Main%20Course"

# Get items with price between 10 and 30
curl "http://localhost:5000/api/menu?minPrice=10&maxPrice=30"

# Get page 2 with 5 items per page
curl "http://localhost:5000/api/menu?page=2&limit=5"

# Combine multiple filters
curl "http://localhost:5000/api/menu?category=Appetizer&isAvailable=true&maxPrice=15"
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "64abc123def456789012345a",
      "name": "Grilled Salmon",
      "description": "Fresh Atlantic salmon grilled to perfection with herbs and lemon",
      "category": "Main Course",
      "price": 24.99,
      "ingredients": ["Salmon", "Lemon", "Olive Oil", "Herbs", "Garlic"],
      "isAvailable": true,
      "preparationTime": 25,
      "imageUrl": "https://example.com/images/salmon.jpg",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "64abc123def456789012345b",
      "name": "Caesar Salad",
      "description": "Crispy romaine lettuce with parmesan and croutons",
      "category": "Appetizer",
      "price": 12.99,
      "ingredients": ["Romaine Lettuce", "Parmesan", "Croutons", "Caesar Dressing"],
      "isAvailable": true,
      "preparationTime": 10,
      "imageUrl": "https://example.com/images/caesar.jpg",
      "createdAt": "2024-01-15T10:35:00.000Z",
      "updatedAt": "2024-01-15T10:35:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### 2. Search Menu Items

Search menu items by name or description using text indexing.

```http
GET /api/menu/search?q={searchTerm}
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search term |

**Example Requests:**

```bash
# Search for "chicken"
curl "http://localhost:5000/api/menu/search?q=chicken"

# Search for "salad"
curl "http://localhost:5000/api/menu/search?q=salad"

# Search for "spicy"
curl "http://localhost:5000/api/menu/search?q=spicy"
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "64abc123def456789012345c",
      "name": "Grilled Chicken Breast",
      "description": "Juicy chicken breast with seasonal vegetables",
      "category": "Main Course",
      "price": 18.99,
      "isAvailable": true
    },
    {
      "_id": "64abc123def456789012345d",
      "name": "Chicken Caesar Salad",
      "description": "Classic caesar salad topped with grilled chicken",
      "category": "Appetizer",
      "price": 14.99,
      "isAvailable": true
    }
  ],
  "count": 2
}
```

#### 3. Get Single Menu Item

Retrieve a specific menu item by its ID.

```http
GET /api/menu/:id
```

**URL Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Menu item MongoDB ObjectId |

**Example Request:**

```bash
curl http://localhost:5000/api/menu/64abc123def456789012345a
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "64abc123def456789012345a",
    "name": "Grilled Salmon",
    "description": "Fresh Atlantic salmon grilled to perfection",
    "category": "Main Course",
    "price": 24.99,
    "ingredients": ["Salmon", "Lemon", "Olive Oil", "Herbs"],
    "isAvailable": true,
    "preparationTime": 25,
    "imageUrl": "https://example.com/images/salmon.jpg",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Response (404 Not Found):**

```json
{
  "success": false,
  "message": "Menu item not found"
}
```

#### 4. Create Menu Item

Add a new menu item to the database.

```http
POST /api/menu
Content-Type: application/json
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Item name (unique) |
| `description` | string | No | Item description |
| `category` | string | Yes | Category (Appetizer, Main Course, Dessert, Beverage) |
| `price` | number | Yes | Price (must be positive) |
| `ingredients` | array | No | List of ingredients |
| `isAvailable` | boolean | No | Availability status (default: true) |
| `preparationTime` | number | No | Prep time in minutes |
| `imageUrl` | string | No | Image URL |

**Example Request:**

```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Margherita Pizza",
    "description": "Classic Italian pizza with fresh mozzarella and basil",
    "category": "Main Course",
    "price": 16.99,
    "ingredients": ["Pizza Dough", "Tomato Sauce", "Mozzarella", "Fresh Basil", "Olive Oil"],
    "isAvailable": true,
    "preparationTime": 20,
    "imageUrl": "https://example.com/images/pizza.jpg"
  }'
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "_id": "64abc123def456789012345e",
    "name": "Margherita Pizza",
    "description": "Classic Italian pizza with fresh mozzarella and basil",
    "category": "Main Course",
    "price": 16.99,
    "ingredients": ["Pizza Dough", "Tomato Sauce", "Mozzarella", "Fresh Basil", "Olive Oil"],
    "isAvailable": true,
    "preparationTime": 20,
    "imageUrl": "https://example.com/images/pizza.jpg",
    "createdAt": "2024-01-20T14:25:00.000Z",
    "updatedAt": "2024-01-20T14:25:00.000Z"
  }
}
```

**Error Response (400 Bad Request):**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    { "field": "name", "message": "Name is required" },
    { "field": "price", "message": "Price must be a positive number" }
  ]
}
```

#### 5. Update Menu Item

Update an existing menu item (partial updates supported).

```http
PUT /api/menu/:id
Content-Type: application/json
```

**Example Request:**

```bash
curl -X PUT http://localhost:5000/api/menu/64abc123def456789012345a \
  -H "Content-Type: application/json" \
  -d '{
    "price": 27.99,
    "description": "Premium Atlantic salmon with lemon butter sauce"
  }'
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "64abc123def456789012345a",
    "name": "Grilled Salmon",
    "description": "Premium Atlantic salmon with lemon butter sauce",
    "price": 27.99,
    "updatedAt": "2024-01-20T15:00:00.000Z"
  }
}
```

#### 6. Delete Menu Item

Remove a menu item from the database.

```http
DELETE /api/menu/:id
```

**Example Request:**

```bash
curl -X DELETE http://localhost:5000/api/menu/64abc123def456789012345a
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "message": "Menu item deleted successfully"
}
```

#### 7. Toggle Availability

Toggle the availability status of a menu item.

```http
PATCH /api/menu/:id/availability
```

**Example Request:**

```bash
curl -X PATCH http://localhost:5000/api/menu/64abc123def456789012345a/availability
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "64abc123def456789012345a",
    "name": "Grilled Salmon",
    "isAvailable": false,
    "updatedAt": "2024-01-20T15:30:00.000Z"
  }
}
```

### 📦 Order Endpoints

#### 1. Get All Orders

Retrieve all orders with optional filtering and pagination.

```http
GET /api/orders
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by status |
| `page` | number | No | Page number (default: 1) |
| `limit` | number | No | Items per page (default: 10) |

**Status Values:**

- `Pending` - Order just placed
- `Preparing` - Being prepared in kitchen
- `Ready` - Ready for pickup/serving
- `Delivered` - Completed
- `Cancelled` - Order cancelled

**Example Requests:**

```bash
# Get all orders
curl http://localhost:5000/api/orders

# Get pending orders
curl "http://localhost:5000/api/orders?status=Pending"

# Get delivered orders with pagination
curl "http://localhost:5000/api/orders?status=Delivered&page=1&limit=20"
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "64abc123def456789012345f",
      "orderNumber": "ORD-001",
      "items": [
        {
          "menuItem": {
            "_id": "64abc123def456789012345a",
            "name": "Grilled Salmon",
            "price": 24.99
          },
          "quantity": 2,
          "price": 24.99
        }
      ],
      "totalAmount": 49.98,
      "status": "Pending",
      "customerName": "John Doe",
      "tableNumber": 5,
      "createdAt": "2024-01-20T12:00:00.000Z",
      "updatedAt": "2024-01-20T12:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 48,
    "itemsPerPage": 10
  }
}
```

#### 2. Get Single Order

Retrieve a specific order by its ID.

```http
GET /api/orders/:id
```

**Example Request:**

```bash
curl http://localhost:5000/api/orders/64abc123def456789012345f
```

#### 3. Create Order

Create a new order.

```http
POST /api/orders
Content-Type: application/json
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | array | Yes | Array of order items |
| `items[].menuItem` | string | Yes | Menu item ObjectId |
| `items[].quantity` | number | Yes | Quantity ordered |
| `items[].price` | number | Yes | Price per item |
| `customerName` | string | No | Customer's name |
| `tableNumber` | number | No | Table number |

**Example Request:**

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "menuItem": "64abc123def456789012345a",
        "quantity": 2,
        "price": 24.99
      },
      {
        "menuItem": "64abc123def456789012345b",
        "quantity": 1,
        "price": 12.99
      }
    ],
    "customerName": "Jane Smith",
    "tableNumber": 8
  }'
```

**Success Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "_id": "64abc123def456789012346g",
    "orderNumber": "ORD-002",
    "items": [...],
    "totalAmount": 62.97,
    "status": "Pending",
    "customerName": "Jane Smith",
    "tableNumber": 8,
    "createdAt": "2024-01-20T14:00:00.000Z"
  }
}
```

#### 4. Update Order Status

Update the status of an existing order.

```http
PATCH /api/orders/:id/status
Content-Type: application/json
```

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | Yes | New status value |

**Example Request:**

```bash
curl -X PATCH http://localhost:5000/api/orders/64abc123def456789012345f/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Preparing"}'
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "64abc123def456789012345f",
    "orderNumber": "ORD-001",
    "status": "Preparing",
    "updatedAt": "2024-01-20T12:15:00.000Z"
  }
}
```

#### 5. Get Top Sellers (Analytics)

Get the top 5 best-selling menu items using MongoDB aggregation.

```http
GET /api/orders/analytics/top-sellers
```

**Example Request:**

```bash
curl http://localhost:5000/api/orders/analytics/top-sellers
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "64abc123def456789012345a",
      "name": "Grilled Salmon",
      "category": "Main Course",
      "price": 24.99,
      "totalQuantity": 45,
      "totalRevenue": 1124.55
    },
    {
      "_id": "64abc123def456789012345b",
      "name": "Caesar Salad",
      "category": "Appetizer",
      "price": 12.99,
      "totalQuantity": 38,
      "totalRevenue": 493.62
    },
    {
      "_id": "64abc123def456789012345c",
      "name": "Chocolate Lava Cake",
      "category": "Dessert",
      "price": 8.99,
      "totalQuantity": 32,
      "totalRevenue": 287.68
    }
  ]
}
```

### 🏥 Health Check Endpoint

Check if the server is running and healthy.

```http
GET /api/health
```

**Example Request:**

```bash
curl http://localhost:5000/api/health
```

**Success Response (200 OK):**

```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-20T15:00:00.000Z",
  "environment": "development"
}
```

---

## 🎯 Technical Challenges Implemented

### Challenge 1: Search with Debouncing ✅

**Problem**

Making an API call on every keystroke when searching creates:
- Unnecessary server load
- Network congestion
- Poor user experience with flickering results

**Solution**

Implement a custom `useDebounce` hook that delays the API call until the user stops typing for 300ms.

**Implementation**

**File: `client/src/hooks/useDebounce.js`**

```javascript
import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing a value
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 300ms)
 * @returns {any} - The debounced value
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up: cancel the timer if value changes before delay completes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

**Usage in MenuManagement.jsx:**

```javascript
import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

const MenuManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // This effect only runs when debouncedSearch changes
  // (i.e., 300ms after the user stops typing)
  useEffect(() => {
    if (debouncedSearch) {
      // Make API call to search
      searchMenuItems(debouncedSearch);
    } else {
      // If search is empty, fetch all items
      fetchMenuItems();
    }
  }, [debouncedSearch]);

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search menu items..."
    />
  );
};
```

**How It Works**

```
User types: "c" → "ch" → "chi" → "chic" → "chick" → "chicke" → "chicken"
             ↓      ↓       ↓       ↓        ↓         ↓          ↓
Timer:     start  reset   reset   reset    reset     reset      reset
             ↓                                                      ↓
                                                              300ms passes
                                                                    ↓
                                                            API call with "chicken"
```

---

### Challenge 2: MongoDB Aggregation Pipeline ✅

**Problem**

Need to calculate the top-selling menu items by:
- Filtering only delivered orders
- Counting total quantity sold for each item
- Calculating total revenue for each item
- Joining with menu item details

**Solution**

Use MongoDB's powerful aggregation pipeline with multiple stages.

**Implementation**

**File: `server/controllers/orderController.js`**

```javascript
const getTopSellers = async (req, res) => {
  try {
    const topSellers = await Order.aggregate([
      // ===== Stage 1: Filter =====
      // Only include delivered orders (completed sales)
      { 
        $match: { 
          status: 'Delivered' 
        } 
      },

      // ===== Stage 2: Unwind =====
      // Deconstruct the items array
      // Each order becomes multiple documents (one per item)
      { 
        $unwind: '$items' 
      },

      // ===== Stage 3: Group =====
      // Group by menu item and calculate totals
      {
        $group: {
          _id: '$items.menuItem',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { 
            $sum: { 
              $multiply: ['$items.price', '$items.quantity'] 
            } 
          },
        },
      },

      // ===== Stage 4: Lookup (Join) =====
      // Join with menuitems collection to get item details
      {
        $lookup: {
          from: 'menuitems',        // Collection to join
          localField: '_id',         // Field from current documents
          foreignField: '_id',       // Field from menuitems collection
          as: 'menuItemDetails',     // Output array field name
        },
      },

      // ===== Stage 5: Unwind Details =====
      // Flatten the menuItemDetails array (it only has 1 element)
      { 
        $unwind: '$menuItemDetails' 
      },

      // ===== Stage 6: Project =====
      // Shape the final output document
      {
        $project: {
          _id: 1,
          name: '$menuItemDetails.name',
          category: '$menuItemDetails.category',
          price: '$menuItemDetails.price',
          totalQuantity: 1,
          totalRevenue: { $round: ['$totalRevenue', 2] },
        },
      },

      // ===== Stage 7: Sort =====
      // Sort by total quantity sold (descending)
      { 
        $sort: { totalQuantity: -1 } 
      },

      // ===== Stage 8: Limit =====
      // Get only top 5
      { 
        $limit: 5 
      },
    ]);

    res.status(200).json({ 
      success: true, 
      data: topSellers 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
```

**Pipeline Visualization**

```
Orders Collection
┌─────────────────────────────────────────────────────────┐
│ { _id: 1, status: "Delivered", items: [{...}, {...}] }  │
│ { _id: 2, status: "Pending", items: [{...}] }           │
│ { _id: 3, status: "Delivered", items: [{...}, {...}] }  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼ Stage 1: $match
┌─────────────────────────────────────────────────────────┐
│ { _id: 1, status: "Delivered", items: [{...}, {...}] }  │
│ { _id: 3, status: "Delivered", items: [{...}, {...}] }  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼ Stage 2: $unwind
┌─────────────────────────────────────────────────────────┐
│ { _id: 1, item: {menuItem: A, qty: 2, price: 25} }      │
│ { _id: 1, item: {menuItem: B, qty: 1, price: 15} }      │
│ { _id: 3, item: {menuItem: A, qty: 1, price: 25} }      │
│ { _id: 3, item: {menuItem: C, qty: 3, price: 10} }      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼ Stage 3: $group
┌─────────────────────────────────────────────────────────┐
│ { _id: A, totalQuantity: 3, totalRevenue: 75 }          │
│ { _id: B, totalQuantity: 1, totalRevenue: 15 }          │
│ { _id: C, totalQuantity: 3, totalRevenue: 30 }          │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼ Stages 4-8: lookup, project, sort, limit
┌─────────────────────────────────────────────────────────┐
│ { name: "Salmon", totalQuantity: 3, totalRevenue: 75 }  │
│ { name: "Cake", totalQuantity: 3, totalRevenue: 30 }    │
│ { name: "Salad", totalQuantity: 1, totalRevenue: 15 }   │
└─────────────────────────────────────────────────────────┘
```

---

### Challenge 3: Optimistic UI Updates ✅

**Problem**

When toggling menu item availability:
1. User clicks the toggle button
2. API request is sent (takes 200-500ms)
3. Wait for response
4. Update UI

This delay makes the app feel sluggish.

**Solution**

Implement optimistic updates:
1. Update UI immediately (assume success)
2. Send API request in background
3. If request fails, rollback to previous state

**Implementation**

**File: `client/src/context/AppContext.jsx`**

```javascript
const toggleAvailability = useCallback(async (id) => {
  // ===== Step 1: Store Previous State =====
  // Save current state in case we need to rollback
  const previousItems = [...menuItems];
  
  // ===== Step 2: Optimistic Update =====
  // Immediately update the UI (don't wait for server)
  setMenuItems((prev) =>
    prev.map((item) =>
      item._id === id 
        ? { ...item, isAvailable: !item.isAvailable } 
        : item
    )
  );

  try {
    // ===== Step 3: API Request =====
    // Send request to server in background
    await menuAPI.toggleAvailability(id);
    
    // Success! Show confirmation
    toast.success('Availability updated');
    
  } catch (error) {
    // ===== Step 4: Rollback on Error =====
    // If request failed, restore previous state
    setMenuItems(previousItems);
    
    // Show error message
    toast.error('Failed to update availability. Changes reverted.');
    
    console.error('Toggle availability error:', error);
  }
}, [menuItems]);
```

**Flow Visualization**

```
┌─────────────────────────────────────────────────────────────────────┐
│                        OPTIMISTIC UPDATE FLOW                        │
└─────────────────────────────────────────────────────────────────────┘

User clicks toggle
        │
        ▼
┌───────────────────┐
│ Save current state │ ←── previousItems = [...menuItems]
│ (for rollback)     │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Update UI         │ ←── User sees immediate change! 🚀
│ immediately       │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│ Send API request  │ ←── Happens in background
│ to server         │
└───────────────────┘
        │
        ├─────────────────────────────────────┐
        │                                     │
        ▼ SUCCESS                             ▼ ERROR
┌───────────────────┐               ┌───────────────────┐
│ Show success      │               │ Rollback UI to    │
│ toast message     │               │ previous state    │
└───────────────────┘               │                   │
                                    │ Show error toast  │
                                    └───────────────────┘
```

**Before vs After**

```
BEFORE (Without Optimistic Updates):
Click → [Loading...500ms] → UI Updates → Done
User perception: "This app is slow"

AFTER (With Optimistic Updates):
Click → UI Updates Instantly → [API call in background] → Done
User perception: "This app is fast!"
```

---

## 🚀 Deployment Guide

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                            INTERNET                                  │
│                         (Your Users)                                 │
└─────────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┴───────────────┐
                │                               │
                ▼                               ▼
┌───────────────────────────┐   ┌───────────────────────────┐
│        NETLIFY            │   │         RENDER            │
│      (Frontend)           │   │        (Backend)          │
│                           │   │                           │
│  ┌─────────────────────┐  │   │  ┌─────────────────────┐  │
│  │   React App (Vite)  │  │   │  │  Node.js + Express  │  │
│  │                     │  │   │  │                     │  │
│  │  • Static HTML/CSS  │  │   │  │  • REST API         │  │
│  │  • JavaScript       │  │   │  │  • Business Logic   │  │
│  │  • Assets           │  │   │  │  • Data Validation  │  │
│  └─────────────────────┘  │   │  └─────────────────────┘  │
│                           │   │            │              │
│  URL: *.netlify.app       │   │            │              │
│  Free SSL ✓               │   │            ▼              │
│  CDN ✓                    │   │  ┌─────────────────────┐  │
│  Auto Deploy ✓            │   │  │    MongoDB Atlas    │  │
└───────────────────────────┘   │  │    (Database)       │  │
                                │  └─────────────────────┘  │
                                │                           │
                                │  URL: *.onrender.com      │
                                │  Free SSL ✓               │
                                │  Auto Deploy ✓            │
                                └───────────────────────────┘
```

### Step 1: Push Code to GitHub

#### 1.1 Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top-right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `restaurant-dashboard`
   - **Description**: Full-stack restaurant management dashboard
   - **Visibility**: Public
   - **DO NOT** check "Add a README file" (you already have one)
5. Click "Create repository"

#### 1.2 Push Your Local Code

Open your terminal in the project root folder and run:

```bash
# Step 1: Initialize Git (skip if already done)
git init

# Step 2: Add all files to staging
git add .

# Step 3: Create initial commit
git commit -m "Initial commit: Restaurant Dashboard"

# Step 4: Rename branch to main
git branch -M main

# Step 5: Add GitHub as remote origin
# ⚠️ Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/restaurant-dashboard.git

# Step 6: Push to GitHub
git push -u origin main
```

#### 1.3 Verify Upload

1. Go to `https://github.com/YOUR_USERNAME/restaurant-dashboard`
2. You should see all your files listed
3. Verify both `client/` and `server/` folders are present

---

### Step 2: Deploy Backend to Render

#### 2.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Choose "Sign up with GitHub" (easiest method)
4. Authorize Render to access your GitHub account

#### 2.2 Create a New Web Service

1. From the Render dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub repository:
   - Find `restaurant-dashboard` in the list
   - Click "Connect"

#### 2.3 Configure the Web Service

Fill in the configuration form:

| Setting | Value | Notes |
|---------|-------|-------|
| **Name** | `restaurant-api` | This will be part of your URL |
| **Region** | Oregon (US West) | Or choose closest to your users |
| **Branch** | `main` | Or `master` if that's your branch |
| **Root Directory** | `server` | ⚠️ Important! Points to backend folder |
| **Runtime** | Node | Auto-detected |
| **Build Command** | `npm install` | Installs dependencies |
| **Start Command** | `npm start` | Runs `node server.js` |
| **Instance Type** | Free | $0/month |

#### 2.4 Add Environment Variables

Scroll down to "Environment Variables" section or click "Advanced".

Click "Add Environment Variable" for each:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://YOUR_USER:YOUR_PASS@cluster.mongodb.net/restaurant_db?retryWrites=true&w=majority` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `*` |

📝 **Note:** We'll update `FRONTEND_URL` after deploying the frontend.

#### 2.5 Create the Service

1. Click "Create Web Service"
2. Wait for the build to complete (3-5 minutes)
3. Watch the logs for any errors

#### 2.6 Verify Backend Deployment

Once you see "Your service is live", get your URL from the dashboard.

Test these endpoints:

```bash
# Health check
curl https://restaurant-api-xxxx.onrender.com/api/health

# Should return:
# {"status":"OK","message":"Server is running"}

# Get menu items
curl https://restaurant-api-xxxx.onrender.com/api/menu

# Should return:
# {"success":true,"data":[...],"pagination":{...}}
```

#### 2.7 Copy Your Backend URL

Save your Render URL - you'll need it for the frontend:

```
https://restaurant-api-xxxx.onrender.com
```

---

### Step 3: Deploy Frontend to Netlify

#### 3.1 Create Netlify Account

1. Go to [netlify.com](https://www.netlify.com)
2. Click "Sign up"
3. Choose "Sign up with GitHub" (recommended)
4. Authorize Netlify to access your GitHub

#### 3.2 Create a New Site

1. From the Netlify dashboard, click "Add new site"
2. Select "Import an existing project"
3. Click "Deploy with GitHub"
4. Find and select your `restaurant-dashboard` repository

#### 3.3 Configure Build Settings

Fill in the build configuration:

| Setting | Value | Notes |
|---------|-------|-------|
| **Base directory** | `client` | ⚠️ Important! Points to frontend folder |
| **Build command** | `npm run build` | Creates production build |
| **Publish directory** | `client/dist` | Vite outputs to `dist` folder |

#### 3.4 Add Environment Variable

Before deploying, add the environment variable:

1. Click "Add environment variables"
2. Click "New variable"
3. Add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://restaurant-api-xxxx.onrender.com/api` |

⚠️ **Important:**
- Replace `xxxx` with your actual Render subdomain
- Make sure to include `/api` at the end
- Variable MUST start with `VITE_`

#### 3.5 Deploy the Site

1. Click "Deploy site"
2. Wait for the build to complete (1-3 minutes)
3. Watch the deploy log for any errors

#### 3.6 Get Your Site URL

Once deployed, Netlify assigns a random URL like:

```
https://amazing-cupcake-123456.netlify.app
```

#### 3.7 (Optional) Change Site Name

1. Go to "Site configuration" (or "Site settings")
2. Click "Domain management"
3. Under "Production domains", click "Options" → "Edit site name"
4. Enter your preferred name (e.g., `restaurant-dashboard-yourname`)
5. Click "Save"

Your new URL will be:

```
https://restaurant-dashboard-yourname.netlify.app
```

---

### Step 4: Connect Frontend & Backend (CORS)

Now that you have your Netlify URL, update the backend CORS settings.

#### 4.1 Update Render Environment Variable

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click on your `restaurant-api` service
3. Click "Environment" in the left sidebar
4. Find `FRONTEND_URL` and click the edit icon
5. Change the value from `*` to your Netlify URL:
   ```
   https://your-site-name.netlify.app
   ```
6. Click "Save Changes"
7. Render will automatically redeploy (wait 1-2 minutes)

---

### Step 5: Seed Production Database

Add sample data to your production database.

**Option A: From Your Local Machine**

```bash
# Navigate to server folder
cd server

# Set the production MongoDB URI temporarily
# (Use the same URI from your Render environment)

# On Mac/Linux:
export MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/restaurant_db"

# On Windows (Command Prompt):
set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/restaurant_db

# On Windows (PowerShell):
$env:MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/restaurant_db"

# Run the seed script
npm run seed
```

**Option B: From Render Shell**

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click on your `restaurant-api` service
3. Click "Shell" in the left sidebar
4. Wait for the shell to connect
5. Run:
   ```bash
   npm run seed
   ```

---

### Deployment Verification Checklist

After deployment, verify everything works:

| Test | URL | Expected Result | Status |
|------|-----|-----------------|--------|
| **Backend Health** | https://your-api.onrender.com/api/health | `{"status":"OK",...}` | ☐ |
| **Backend Menu** | https://your-api.onrender.com/api/menu | JSON with menu items | ☐ |
| **Backend Orders** | https://your-api.onrender.com/api/orders | JSON with orders | ☐ |
| **Frontend Loads** | https://your-site.netlify.app | Dashboard page | ☐ |
| **Menu Page** | Click "Menu" in sidebar | Menu items display | ☐ |
| **Add Item** | Click "Add New Item" | Form opens, can save | ☐ |
| **Edit Item** | Click edit on any item | Form opens, can update | ☐ |
| **Delete Item** | Click delete on any item | Confirmation, item removed | ☐ |
| **Toggle Available** | Click toggle switch | Status changes instantly | ☐ |
| **Search** | Type in search box | Results filter (debounced) | ☐ |
| **Orders Page** | Click "Orders" in sidebar | Orders display | ☐ |
| **Update Status** | Change order status | Status updates | ☐ |

---

### Auto-Deployment

Both platforms automatically redeploy when you push changes to GitHub.

**How It Works**

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│    Local     │  push   │    GitHub    │  webhook │   Netlify/   │
│   Changes    │ ──────► │  Repository  │ ────────►│    Render    │
└──────────────┘         └──────────────┘         └──────────────┘
                                                         │
                                                         ▼
                                                  ┌──────────────┐
                                                  │  Auto Build  │
                                                  │  & Deploy    │
                                                  └──────────────┘
```

**Deploy New Changes**

```bash
# Make your changes locally, then:

# Stage all changes
git add .

# Commit with a descriptive message
git commit -m "Add new feature: order filtering"

# Push to GitHub
git push

# ✨ That's it! Both platforms will auto-deploy
```

**Rebuild Times**

| Platform | Typical Build Time |
|----------|-------------------|
| **Netlify** (Frontend) | 30 seconds - 2 minutes |
| **Render** (Backend) | 2 - 5 minutes |

---

## 🔐 Environment Variables

### Complete Reference

#### Backend Environment Variables (server/.env)

| Variable | Required | Default | Description | Example |
|----------|----------|---------|-------------|---------|
| `PORT` | No | `5000` | Port the server runs on | `5000` |
| `NODE_ENV` | Yes | - | Environment mode | `development` or `production` |
| `MONGODB_URI` | Yes | - | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `FRONTEND_URL` | Yes | - | Allowed origin for CORS | `http://localhost:5173` or `https://app.netlify.app` |

#### Frontend Environment Variables (client/.env)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `VITE_API_URL` | Yes | Backend API base URL | `http://localhost:5000/api` |

⚠️ **Note:** All frontend environment variables must start with `VITE_` to be exposed by Vite.

---

### Environment Files Summary

#### For Local Development

**server/.env**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://devuser:devpassword@cluster0.xxxxx.mongodb.net/restaurant_db_dev?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
```

**client/.env**

```env
VITE_API_URL=http://localhost:5000/api
```

#### For Production (Set in Dashboard)

**Render Dashboard:**

| Key | Value |
|-----|-------|
| `MONGODB_URI` | `mongodb+srv://produser:prodpassword@cluster0.xxxxx.mongodb.net/restaurant_db?retryWrites=true&w=majority` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://your-app.netlify.app` |

**Netlify Dashboard:**

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-api.onrender.com/api` |

---

## 📸 Screenshots

### Dashboard Page

![Dashboard](screenshots/dashboard.png)

The main dashboard showing:
- Total menu items and available items count
- Total orders and pending orders count
- Total revenue from delivered orders
- Top 5 selling items chart
- Recent orders list

---

### Menu Management Page

![Menu Management](screenshots/menu.png)

Menu management interface featuring:
- Search bar with debounced search
- Category and availability filters
- Responsive grid layout of menu cards
- Add, edit, delete, and toggle availability actions

---

### Orders Page

![Orders](screenshots/orders.png)

Orders management showing:
- Order status filter tabs
- Order cards with expandable details
- Status update dropdown
- Pagination for large lists
- Order statistics overview

---

## 🧪 Testing the API

### Using cURL

#### Local Development

```bash
# ===== HEALTH CHECK =====
curl http://localhost:5000/api/health

# ===== MENU ENDPOINTS =====

# Get all menu items
curl http://localhost:5000/api/menu

# Get menu items with filters
curl "http://localhost:5000/api/menu?category=Main%20Course&isAvailable=true"

# Search menu items
curl "http://localhost:5000/api/menu/search?q=chicken"

# Get single menu item (replace ITEM_ID with actual ID)
curl http://localhost:5000/api/menu/ITEM_ID

# Create new menu item
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Burger",
    "description": "A delicious test burger",
    "category": "Main Course",
    "price": 14.99,
    "ingredients": ["Beef Patty", "Lettuce", "Tomato", "Cheese"],
    "isAvailable": true,
    "preparationTime": 15
  }'

# Update menu item (replace ITEM_ID with actual ID)
curl -X PUT http://localhost:5000/api/menu/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{
    "price": 16.99,
    "description": "Updated description"
  }'

# Toggle availability (replace ITEM_ID with actual ID)
curl -X PATCH http://localhost:5000/api/menu/ITEM_ID/availability

# Delete menu item (replace ITEM_ID with actual ID)
curl -X DELETE http://localhost:5000/api/menu/ITEM_ID

# ===== ORDER ENDPOINTS =====

# Get all orders
curl http://localhost:5000/api/orders

# Get orders by status
curl "http://localhost:5000/api/orders?status=Pending"

# Get single order (replace ORDER_ID with actual ID)
curl http://localhost:5000/api/orders/ORDER_ID

# Create new order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "menuItem": "MENU_ITEM_ID",
        "quantity": 2,
        "price": 24.99
      }
    ],
    "customerName": "Test Customer",
    "tableNumber": 5
  }'

# Update order status (replace ORDER_ID with actual ID)
curl -X PATCH http://localhost:5000/api/orders/ORDER_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status": "Preparing"}'

# Get top sellers
curl http://localhost:5000/api/orders/analytics/top-sellers
```

#### Production

```bash
# Set your base URL
BASE_URL="https://restaurant-api-g6ln.onrender.com/api"

# Health check
curl $BASE_URL/health

# Get all menu items
curl $BASE_URL/menu

# Search menu items
curl "$BASE_URL/menu/search?q=salmon"

# Get all orders
curl $BASE_URL/orders

# Get top sellers
curl $BASE_URL/orders/analytics/top-sellers
```

---

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new collection called "Restaurant Dashboard"
3. Add requests for each endpoint
4. Set up environment variables:
   - `baseUrl`: `http://localhost:5000/api` (local)
   - `baseUrl`: `https://restaurant-api-g6ln.onrender.com/api` (production)

---

### Using Browser

These GET endpoints can be tested directly in your browser:

| Endpoint | Local URL | Production URL |
|----------|-----------|----------------|
| **Health Check** | [localhost:5000/api/health](http://localhost:5000/api/health) | [Production Health](https://restaurant-api-g6ln.onrender.com/api/health) |
| **All Menu Items** | [localhost:5000/api/menu](http://localhost:5000/api/menu) | [Production Menu](https://restaurant-api-g6ln.onrender.com/api/menu) |
| **Search** | [localhost:5000/api/menu/search?q=salad](http://localhost:5000/api/menu/search?q=salad) | [Production Search](https://restaurant-api-g6ln.onrender.com/api/menu/search?q=salad) |
| **All Orders** | [localhost:5000/api/orders](http://localhost:5000/api/orders) | [Production Orders](https://restaurant-api-g6ln.onrender.com/api/orders) |
| **Top Sellers** | [localhost:5000/api/orders/analytics/top-sellers](http://localhost:5000/api/orders/analytics/top-sellers) | [Production Top Sellers](https://restaurant-api-g6ln.onrender.com/api/orders/analytics/top-sellers) |

---

## 🐛 Troubleshooting

### Common Issues and Solutions

#### ❌ Issue: "Failed to fetch" or "Network Error"

**Symptoms:**
- Frontend shows "Failed to fetch menu items"
- Console shows `ERR_CONNECTION_REFUSED` or Network Error

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Backend not running | Start backend: `cd server && npm run dev` |
| Wrong API URL | Check `VITE_API_URL` in `client/.env` |
| CORS blocking requests | Check `FRONTEND_URL` in `server/.env` |
| Backend crashed | Check terminal for error messages |

**Debug Steps:**

```bash
# Step 1: Check if backend is running
curl http://localhost:5000/api/health

# Step 2: Check frontend env variable
cat client/.env
# Should show: VITE_API_URL=http://localhost:5000/api

# Step 3: Check backend env variable
cat server/.env
# Should include: FRONTEND_URL=http://localhost:5173

# Step 4: Restart both servers
# Terminal 1:
cd server && npm run dev

# Terminal 2:
cd client && npm run dev
```

---

#### ❌ Issue: MongoDB Connection Error

**Symptoms:**
- Backend shows `MongooseServerSelectionError`
- Error: "connection timed out" or "authentication failed"

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Wrong connection string | Double-check `MONGODB_URI` in `.env` |
| Password has special characters | URL-encode special characters |
| IP not whitelisted | Add IP to MongoDB Atlas Network Access |
| Database user doesn't exist | Create user in Database Access |

**Debug Steps:**

```bash
# Step 1: Verify connection string format
# Correct format:
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Step 2: Check for special characters in password
# If password is "p@ss#word", encode it as "p%40ss%23word"

# Step 3: Whitelist all IPs (for development)
# MongoDB Atlas → Network Access → Add IP → Allow Access from Anywhere

# Step 4: Test connection with mongosh (if installed)
mongosh "mongodb+srv://username:password@cluster.mongodb.net/database"
```

---

#### ❌ Issue: CORS Error

**Symptoms:**
- Browser console shows: `Access to fetch has been blocked by CORS policy`
- API works in Postman but not in browser

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| `FRONTEND_URL` not set | Add `FRONTEND_URL` to `server/.env` |
| URL mismatch | Ensure URLs match exactly (including protocol) |
| Trailing slash mismatch | Remove trailing slashes |

**Debug Steps:**

```bash
# Step 1: Check server/.env
FRONTEND_URL=http://localhost:5173  # No trailing slash!

# Step 2: For production, update on Render
FRONTEND_URL=https://your-app.netlify.app  # No trailing slash!

# Step 3: Verify CORS middleware in server.js
# Should be BEFORE routes:
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

---

#### ❌ Issue: Tailwind Styles Not Working

**Symptoms:**
- Page loads but has no styling
- Elements appear unstyled/plain HTML

**Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Missing Tailwind imports | Add imports to `index.css` |
| Wrong content paths | Update `tailwind.config.js` |
| Build cache issue | Clear cache and rebuild |

**Debug Steps:**

```bash
# Step 1: Check client/src/index.css has these lines at the top:
@tailwind base;
@tailwind components;
@tailwind utilities;

# Step 2: Check tailwind.config.js content paths:
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]

# Step 3: Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

---

#### ❌ Issue: Render Deployment Failed

**Symptoms:**
- Build fails on Render
- Error in deploy logs

**Common Errors & Solutions:**

| Error | Solution |
|-------|----------|
| `npm ERR! missing script: start` | Add `"start": "node server.js"` to `package.json` |
| `Cannot find module 'xxx'` | Check all dependencies are in `package.json` |
| `MONGODB_URI is not defined` | Add environment variable in Render dashboard |
| Build timeout | Upgrade to paid tier or optimize build |

**Debug Steps:**

1. Go to Render Dashboard → Your Service → Logs
2. Look for red error messages
3. Check Events tab for deployment history
4. Verify all environment variables are set

---

#### ❌ Issue: Netlify Build Failed

**Symptoms:**
- Deployment fails on Netlify
- Build log shows errors

**Common Errors & Solutions:**

| Error | Solution |
|-------|----------|
| `npm ERR! code ERESOLVE` | Add `.npmrc` with `legacy-peer-deps=true` |
| `vite: command not found` | Check `vite` is in `devDependencies` |
| `Cannot find module` | Verify import paths are correct |
| `VITE_API_URL is undefined` | Add environment variable in Netlify dashboard |

**Debug Steps:**

1. Go to Netlify Dashboard → Your Site → Deploys
2. Click on the failed deploy
3. Read the build log for specific errors
4. Verify:
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `client/dist`

---

#### ⚠️ Issue: Slow First Load (30-60 seconds)

**Symptoms:**
- First request to production backend takes very long
- Subsequent requests are fast

**Cause:**

Render's free tier "spins down" after 15 minutes of inactivity. First request wakes the server.



**Solutions:**
> I skipped this step, if you want you can undergo with these steps

| Solution | Description |
|----------|-------------|
| **Accept it** | It's free! First load is slow, subsequent loads are fast |
| **Keep alive service** | Use cron-job.org to ping every 14 minutes |
| **Upgrade** | Pay $7/month for Render's always-on service |

**Set Up Keep-Alive (Free):**

1. Go to [cron-job.org](https://cron-job.org) and create a free account
2. Create a new cron job:
   - **URL**: `https://your-api.onrender.com/api/health`
   - **Schedule**: Every 14 minutes
3. Save and enable the job

---

#### ❌ Issue: 404 Error on Page Refresh (Netlify)

**Symptoms:**
- Navigating within app works
- Refreshing any page except home shows 404

**Cause:**

Netlify doesn't know about React Router routes.

**Solution:**

Create `client/public/_redirects` file:

```
/* /index.html 200
```

Then redeploy:

```bash
git add client/public/_redirects
git commit -m "Add Netlify redirects for SPA"
git push
```

---

## 📚 Additional Resources

### Documentation Links

| Resource | Description | Link |
|----------|-------------|------|
| **React** | UI Library | [react.dev](https://react.dev) |
| **Vite** | Build Tool | [vitejs.dev](https://vitejs.dev) |
| **Tailwind CSS** | Styling | [tailwindcss.com](https://tailwindcss.com) |
| **Express.js** | Backend Framework | [expressjs.com](https://expressjs.com) |
| **MongoDB** | Database | [mongodb.com/docs](https://www.mongodb.com/docs) |
| **Mongoose** | MongoDB ODM | [mongoosejs.com](https://mongoosejs.com) |
| **Axios** | HTTP Client | [axios-http.com](https://axios-http.com) |
| **React Router** | Routing | [reactrouter.com](https://reactrouter.com) |
| **Lucide Icons** | Icon Library | [lucide.dev](https://lucide.dev) |
| **React Hot Toast** | Notifications | [react-hot-toast.com](https://react-hot-toast.com) |

---

### Deployment Documentation

| Platform | Documentation |
|----------|---------------|
| **Render** | [render.com/docs](https://render.com/docs) |
| **Netlify** | [docs.netlify.com](https://docs.netlify.com) |
| **MongoDB Atlas** | [mongodb.com/docs/atlas](https://www.mongodb.com/docs/atlas) |

---

### Learning Resources

| Topic | Resource |
|-------|----------|
| **React Hooks** | [react.dev/reference/react](https://react.dev/reference/react) |
| **MongoDB Aggregation** | [mongodb.com/docs/manual/aggregation](https://www.mongodb.com/docs/manual/aggregation) |
| **REST API Design** | [restfulapi.net](https://restfulapi.net) |
| **Tailwind Components** | [tailwindui.com](https://tailwindui.com) |

---

## 🔗 Quick Links

### Project Links

| Resource | URL |
|----------|-----|
| 🌐 **Live Frontend** | [https://eatoes-restaurantdashboard-sivadandem.netlify.app](https://eatoes-restaurantdashboard-sivadandem.netlify.app) |
| 🔧 **Live Backend API** | [https://restaurant-api-g6ln.onrender.com/api](https://restaurant-api-g6ln.onrender.com/api) |
| ❤️ **API Health Check** | [https://restaurant-api-g6ln.onrender.com/api/health](https://restaurant-api-g6ln.onrender.com/api/health) |
| 📂 **GitHub Repository** | [github.com/sivadandem/restaurant-dashboard](https://github.com/sivadandem/restaurant-dashboard) |

---

### Management Dashboards

| Service | Dashboard URL |
|---------|---------------|
| **Render** (Backend) | [dashboard.render.com](https://dashboard.render.com) |
| **Netlify** (Frontend) | [app.netlify.com](https://app.netlify.com) |
| **MongoDB Atlas** (Database) | [cloud.mongodb.com](https://cloud.mongodb.com) |
| **GitHub** (Code) | [github.com](https://github.com) |

---

## 👨‍💻 Author

**Siva Dandem**

| Platform | Link |
|----------|------|
| 🐙 **GitHub** | [@sivadandem](https://github.com/sivadandem) |
| 💼 **LinkedIn** | [linkedin.com/in/sivadandem](https://linkedin.com/in/sivadandem) |
| 📧 **Email** | sivadandem7@gmail.com |

---

## 📝 License

This project was created for the **Eatoes Intern Technical Assessment**.

```
MIT License

Copyright (c) 2024 Siva Dandem

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

Special thanks to:

- **Eatoes** - For the internship opportunity and technical assessment
- **MongoDB** - For providing free database hosting
- **Render** - For free backend hosting
- **Netlify** - For free frontend hosting with CDN
- **Lucide** - For beautiful, open-source icons
- **Tailwind CSS** - For the amazing utility-first CSS framework

---

## ⭐ Star This Repository

If you found this project helpful or interesting, please consider giving it a star on GitHub!

[![GitHub stars](https://img.shields.io/github/stars/sivadandem/restaurant-dashboard?style=social)](https://github.com/sivadandem/restaurant-dashboard)

---

### Quick Actions

🌐 [View Live Demo](https://eatoes-restaurantdashboard-sivadandem.netlify.app) | 📡 [Test API](https://restaurant-api-g6ln.onrender.com/api/health) | 🐛 [Report Bug](https://github.com/sivadandem/restaurant-dashboard/issues) | 💡 [Request Feature](https://github.com/sivadandem/restaurant-dashboard/issues)

---

