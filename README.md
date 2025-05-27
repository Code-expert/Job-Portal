
---

# 💼 Jobify – Job Portal Web Application

A professional, responsive **MERN stack** Job Portal application built to connect job seekers with recruiters. This project allows users to create profiles, browse jobs, apply, and for recruiters to post and manage job listings.

🌐 **Live Demo:** [jobifyhub.vercel.app](https://jobifyhub.vercel.app)

---

## 🔥 Features

### 👨‍💻 Job Seekers
- Register & login
- Build and update profiles
- Browse job listings with filters
- Apply to jobs directly
- Save jobs for future reference

### 🧑‍💼 Recruiters
- Create recruiter profiles
- Post, update, and delete jobs
- View applicants for each job
- Dashboard with job stats

### 💳 Payments (Coming Soon)
- Stripe or Razorpay integration for premium job listings

---

## 🛠 Tech Stack

### Frontend
- React.js + Vite
- Tailwind CSS
- React Router
- Framer Motion (animations)
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)

### Other Tools
- Cloudinary (Image Uploads)
- Stripe/Razorpay (Planned Payment Integration)
- Vercel (Frontend Hosting)
- Render/Heroku (Backend Hosting)

---

## 📁 Folder Structure

```

/Jobify
├── /Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── /Frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── main.jsx

````

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Code-expert/jobify.git
cd jobify
````

### 2. Setup Backend

```bash
cd Backend
npm install
npm run dev
```

### 3. Setup Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend (`.env`)

```
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### Frontend (`.env`)

```
VITE_API_BASE_URL=https://your-backend-url/api
```

---

## 📸 Screenshots


---

## 📌 Upcoming Features

* Admin Panel for platform monitoring
* Recruiter subscription plans
* Notification system for applicants
* PWA support for mobile access
* Resume Parsing for job matching

---

## 🤝 Contributing

Contributions are welcome! Open a pull request or raise an issue to suggest improvements or report bugs.

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Harshraj Singh**
🔗 [GitHub Profile](https://github.com/Code-expert)
🌐 [Live App](https://jobifyhub.vercel.app)

```

---

You can paste this directly into your `README.md` on GitHub. Let me know if you'd like a badge section or to generate a LICENSE file too!
```
