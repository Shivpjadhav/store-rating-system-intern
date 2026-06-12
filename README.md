### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication

### Frontend
- React.js (Vite)
- Axios
- React Router

## Features

### Admin
- Dashboard
- Add Users
- Add Stores
- View Users
- View Stores

### User
- Register/Login
- View Stores
- Submit Ratings (1-5)
- Update Ratings

### Store Owner
- View Ratings
- View Average Store Rating

## Setup

### Backend

```bash
npm install
npm run dev
```

### Frontend

```bash
npm install
npm run dev
```
# Database Schema

## users

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(400),
    role ENUM('ADMIN','USER','STORE_OWNER') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## stores

```sql
CREATE TABLE stores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(400),
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id)
);
```

## ratings

```sql
CREATE TABLE ratings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (store_id) REFERENCES stores(id),
    UNIQUE KEY unique_rating (user_id, store_id)
);
```
