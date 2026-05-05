# 🔗 URL Shortener Platform (Production-Grade)

🚀 **Live Demo:** https://frontend-a4os.onrender.com

A scalable, high-performance URL Shortener system built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
Designed with production engineering principles including rate limiting, collision-safe ID generation, stateless architecture, and database indexing for high-speed redirection.

---

## 🚀 Live System Overview
https://url-shortener-w5rm.onrender.com/

This project simulates a real-world link management service similar to Bitly-style architecture with:

- High-speed URL shortening engine  
- Custom alias support with conflict resolution  
- QR code generation & download  
- Click tracking analytics  
- Stateless API-based backend design  
- Scalable MongoDB schema with indexing  

---

## ⚙️ Core Features

### 🔗 URL Shortening Engine
- Collision-free ID generation using Nanoid
- Custom alias support with duplicate handling
- Automatic fallback to unique ID generation

### ⚡ High-Performance Redirect System
- Instant redirection via `/r/:shortId`
- MongoDB indexed lookup (O(1) retrieval)
- Atomic click counter updates

### 📱 QR Code Integration
- Dynamic QR generation per short URL
- Downloadable QR images for sharing

### 📊 Analytics (Backend Ready)
- Click tracking per link
- Extensible schema for future analytics (geo/device tracking)

---

## 🧠 System Architecture

Client (React + Vite)
        ↓
REST API Layer (Express.js)
        ↓
Business Logic Layer (Controllers)
        ↓
MongoDB (Indexed URL Storage)

---

## 🛡️ Production-Level Features

### 🚦 Rate Limiting (API Protection)
- Prevents API abuse & spam requests
- IP-based request throttling
- Protects against brute-force alias attacks

### 🔐 Input Validation
- Native URL validation using Node.js URL parser
- Sanitized request handling
- Safe alias conflict resolution

### 🧩 Collision-Free ID System
- Nanoid-based unique ID generation
- Retry mechanism for collision handling
- Guaranteed uniqueness for all URLs

### 🗄️ Database Optimization
- Indexed `shortId` field for fast lookup
- Efficient document structure
- Optimized for read-heavy workloads

### ⚡ Stateless Architecture
- No session dependency
- Fully scalable REST API design
- Horizontal scaling ready

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios
- qrcode.react
- react-toastify

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Nanoid
- CORS middleware

---

## 📂 Project Structure

/frontend   → React UI (Client)
/backend
   ├── controller
   ├── models
   ├── routes
   ├── config
   ├── middleware

---

## ⚙️ API Endpoints

### 🔗 Create Short URL
POST /api/v1/shorten

Request:
{
  "originalUrl": "https://example.com",
  "customAlias": "optional"
}

Response:
{
  "success": true,
  "shortId": "abc123",
  "shortUrl": "http://localhost:5000/r/abc123"
}

---

### 🔁 Redirect Short URL
GET /r/:shortId

- Fetch original URL
- Increment click counter
- Redirect instantly

---

## ⚙️ Environment Variables (.env)

-MONGO_URI=your_mongodb_connection_string
-BASE_URL=http://localhost:url_base
-PORT=your_port

---

## 📈 Scalability Design

- Stateless backend (horizontal scaling ready)
- Indexed MongoDB queries (fast lookup)
- Future Redis caching support
- CDN-ready redirect system

---

## 🛡️ Security Features

- Rate limiting per IP
- Input validation on all endpoints
- Alias conflict protection
- Environment variable isolation

---

## ⚡ Performance

- O(1) URL lookup using indexing
- <100ms API response time (local)
- Lightweight stateless requests

---

## 🧪 What This Project Demonstrates

- Scalable backend architecture
- REST API design
- MongoDB schema optimization
- Collision-resistant ID generation
- Real-world SaaS system design
- Full-stack integration

---

## 👨‍💻 Developer

Durgesh  
Full Stack Developer  

---

## ⭐ Project Vision

A production-ready SaaS foundation for scalable URL management systems built with modern backend engineering principles.
