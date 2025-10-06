
# 🍱 Local Food Platform

### 🌍 A community-driven platform to reduce food waste and feed those in need.

The **Local Food Platform** connects **donors**, **NGOs/receivers**, and **volunteers** to manage surplus food donations efficiently.  
Built with the **MERN stack (MongoDB, Express, React, Node)**, it makes food donation **simple, transparent, and impactful**.

---

## ✨ Features

### 👤 Donor Dashboard
- Register & login securely 🔐  
- Donate food with details (type, quantity, expiry time, location)  
- View & manage all donations  
- Track donation status in real time  

### 🏢 NGO / Receiver Dashboard
- Browse available donations nearby  
- Request food donations  
- View donor contact info  

### 🚚 Volunteer Panel
- Help pick up and deliver donated food  
- Track assigned deliveries  
- View delivery history  

---

## 🧰 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React.js, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT (JSON Web Token) |
| **Tools** | Postman, dotenv, nodemon |

---

## 📁 Folder Structure

```

local-food-platform/
├── backend/
│   ├── server.js
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── config/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
├── .env
├── package.json
└── README.md

````

---

## ⚙️ Setup & Installation

### 🪄 Step 1: Clone the Repository
```bash
git clone https://github.com/pankajbaria712/local-food-platform.git
cd local-food-platform
````

### 🪄 Step 2: Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Then run:

```bash
npm run dev
```

### 🪄 Step 3: Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on **[http://localhost:5173](http://localhost:5173)**
Backend runs on **[http://localhost:5000](http://localhost:5000)**

---

## 🧪 API Endpoints

### 🔐 Auth

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register new user   |
| POST   | `/api/auth/login`    | Login existing user |

### 🍲 Food Donation

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | `/api/food/donate` | Create a food donation |
| GET    | `/api/food/all`    | Get all food donations |
| GET    | `/api/food/:id`    | Get specific donation  |
| PUT    | `/api/food/:id`    | Update donation        |
| DELETE | `/api/food/:id`    | Delete donation        |

---

## 🧠 Future Enhancements

* 🌍 Google Maps integration for live pickup tracking
* 🔔 Real-time notifications using Socket.io or Firebase
* 📱 Mobile-first responsive UI
* 🏅 Donor badges & contribution analytics
* 💬 Chat between donor and NGO

---

## ☁️ Deployment Guide

### 🖥️ Backend (Render)

1. Go to [Render](https://render.com/)
2. Create a new **Web Service**
3. Connect your GitHub repo
4. Set build command:

   ```
   npm install
   ```

   and start command:

   ```
   node server.js
   ```
5. Add environment variables from your local `.env` file
6. Deploy ✅

### 🌐 Frontend (Vercel)

1. Go to [Vercel](https://vercel.com/)
2. Import your repo
3. Select the **frontend/** folder
4. Add environment variable:

   ```
   VITE_BACKEND_URL=https://your-backend-url.onrender.com
   ```
5. Click **Deploy** 🚀

---


## 🧑‍💻 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`feature/awesome-feature`)
3. Commit your changes
4. Push & open a Pull Request 🎉

---

## 🪪 License

This project is licensed under the **MIT License** — free to use, share, and modify.

---

## 💬 Contact

👨‍💻 **Developer:** [Pankaj Baria](https://github.com/pankajbaria712)
📧 **Email:** *(add your email here)*
🌐 **Project Repo:** [Local Food Platform](https://github.com/pankajbaria712/local-food-platform)

---

### ⭐ If you like this project, don’t forget to give it a **star** on GitHub!
