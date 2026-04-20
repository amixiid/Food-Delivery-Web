# 🍔 FoodDash — Full-Stack Food Delivery Web Application

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/Node.js-v20+-green.svg)
![React](https://img.shields.io/badge/React-v19-61DAFB.svg?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248.svg?logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-v5-black.svg)

A modern, production-ready food delivery platform built with the **MERN stack** (MongoDB, Express, React, Node.js). FoodDash connects customers, restaurant owners, and administrators in one seamless web experience.

---

## 🧩 The Problem It Solves

Ordering food today is fragmented — customers jump between phone calls and different apps, restaurants struggle to manage menus and orders, and there is no single place for administrators to oversee operations.

**FoodDash solves this by:**

- Giving **customers** a fast, intuitive way to browse restaurants, add items to a cart, and place orders — all from one platform.
- Giving **restaurant owners** a dedicated dashboard to manage their menu, food items, photos, and incoming orders.
- Giving **administrators** a powerful control panel to manage users, restaurants, and monitor all platform activity.

---

## ✨ Key Features

### 👤 Customer
- Register and log in securely with hashed passwords and JWT tokens.
- Browse all available restaurants and food items.
- Search and filter by cuisine category.
- Add items to cart and manage quantities.
- Place orders and view full order history with status tracking.
- Leave verified reviews on items after a confirmed purchase.

### 🍽️ Restaurant Owner
- Create and manage a restaurant profile with images.
- Add, edit, and delete food items with photos.
- View and manage incoming orders (pending → preparing → delivered).

### 🛡️ Admin
- View a full system dashboard with platform-wide analytics.
- Manage all registered users (view, promote, or delete).
- Oversee all restaurants and orders across the platform.

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React.js** | v19 | Core UI framework |
| **Vite** | v8 | Fast dev server & bundler |
| **Tailwind CSS** | v4 | Utility-first styling & glassmorphism |
| **React Router DOM** | v7 | Client-side routing & navigation |
| **Axios** | v1.15 | HTTP requests to the REST API |
| **Lucide React** | v1.8 | Modern icon library |
| **Context API** | Built-in | Global state management (Auth, Cart) |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | v20+ | JavaScript runtime |
| **Express.js** | v5 | REST API framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | v9 | MongoDB object modeling (ODM) |
| **JSON Web Token** | v9 | Stateless authentication |
| **Bcryptjs** | v3 | Secure password hashing |
| **Multer** | v2 | Image / file upload handling |
| **Morgan** | v1 | HTTP request logging |
| **dotenv** | v17 | Environment variable management |

---

## 📂 Project Structure

```
Food-Delivery/
├── client/                   # React Frontend (Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components (Navbar, etc.)
│   │   ├── context/          # Global state (AuthContext, CartContext)
│   │   ├── pages/            # Route pages (Home, Cart, Admin, etc.)
│   │   └── App.jsx           # Root component with routes
│   ├── index.html
│   └── vite.config.js
│
└── server/                   # Node.js / Express Backend
    ├── config/               # Database connection (db.js)
    ├── controllers/          # Business logic per resource
    ├── middleware/           # Auth guard & upload middleware
    ├── models/               # Mongoose schemas (User, Food, Order)
    ├── routes/               # REST API route definitions
    ├── uploads/              # Stored image files (served statically)
    ├── seed.js               # Database seed script
    └── server.js             # Main entry point
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [MongoDB](https://www.mongodb.com/) running locally **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the Repository

```bash
git clone https://github.com/amixiid/Food-Delivery-Web
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `/server` directory based on `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev       # Development (with nodemon auto-reload)
# or
npm start         # Production
```

> The API will run at `http://localhost:5000`

### 3. Setup the Frontend

```bash
cd client
npm install
npm run dev
```

> The app will run at `http://localhost:5173`

### 4. (Optional) Seed the Database

```bash
cd server
npm run seed
```

This populates the database with sample restaurants and food items.

---

## 🔌 API Endpoints Overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Log in and receive a JWT |
| GET | `/api/food` | Public | Get all food items |
| POST | `/api/food` | Restaurant Owner | Add a new food item |
| GET | `/api/orders` | Customer | Get current user's orders |
| POST | `/api/orders` | Customer | Place a new order |
| PUT | `/api/orders/:id` | Restaurant/Admin | Update order status |
| GET | `/api/admin/users` | Admin | Get all platform users |
| POST | `/api/upload` | Authenticated | Upload an image file |

---

## 🛡️ Security

- Passwords are **hashed with Bcrypt** before being stored.
- All sensitive routes are protected using a **JWT Auth Middleware**.
- **Role-Based Access Control (RBAC)** ensures users can only access permitted resources (`customer`, `restaurant`, `admin`).
- Environment variables keep secrets out of source code.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.