
# 🚆 Dine Rail

**Dine Rail** is a web application built with **Next.js, Node.js, and SQL** that enables Indian Railway travelers to order food during their journey.  
It connects passengers with station vendors, offering more choices and a smooth ordering experience while traveling.  

---

## 📝 Description

- Passengers can order food from partnered station vendors.  
- Vendors can manage their menus and incoming orders.  
- Orders are delivered directly to passengers on the train or at stations.  
- Provides convenience, wider food options, and digital payments during travel.  

---

## 🛠️ Tech Stack

- **Frontend:** Next.js  
- **Backend:** Node.js (Express)  
- **Database:** SQL (MySQL/PostgreSQL)  
- **Environment Variables:** `.env` for database & server configs  

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/dine-rail.git
cd dine-rail
````

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment (`.env`)

Create a `.env` file in the project root:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=dinerail

# JWT / Session
JWT_SECRET=your_jwt_secret

# Server
PORT=5000
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Database Setup

```sql
CREATE DATABASE dinerail;
```

### 5. Run the project

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

👉 Frontend: `http://localhost:3000`
👉 Backend API: `http://localhost:5000`
