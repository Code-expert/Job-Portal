# 💼 JobifyHub ✨

Welcome to **JobifyHub**, a premium, modern job portal platform that seamlessly connects top talent with top employers in both the formal and informal sectors. 

Built with a stunning **glassmorphism** aesthetic and highly interactive **Framer Motion** animations, JobifyHub delivers an ultra-premium user experience alongside powerful functionality.

🌐 **Live Demo:** [jobifyhub.vercel.app](https://jobifyhub.vercel.app)

![JobifyHub Hero Section](https://github.com/user-attachments/assets/placeholder-image) <!-- Add a screenshot of the hero section here -->

## ✨ Key Features

* **Dual Sector Support:** Opportunities for both Corporate/Tech (Formal) and Skilled Trades (Informal) sectors.
* **Premium UI/UX:** Built with heavy glassmorphism, rich gradients, hover animations, and floating islands using modern Tailwind CSS.
* **Real-time Messaging:** Fully integrated live chat system powered by Socket.io, allowing applicants and recruiters to communicate instantly. Includes online status indicators.
* **Role-Based Access Control:** Distinct workflows for Students (Applicants) and Recruiters.
  * *Students:* Build profiles, browse jobs, search across sectors, apply, and chat with recruiters.
  * *Recruiters:* Manage company profiles, post jobs, track applicants, and engage with candidates.
* **Smart Search & Filters:** Dynamic global search bar with instant autocomplete suggestions.
* **Responsive Design:** A flawless mobile experience with animated drawer menus and responsive components.

## 🛠️ Technology Stack

**Frontend:**
* React.js (Vite)
* Tailwind CSS
* Redux Toolkit
* Framer Motion (Animations)
* Socket.io-client (Real-time communication)
* Axios

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose
* Socket.io (WebSocket Server)
* JSON Web Tokens (JWT) & bcryptjs
* Cloudinary (Image Uploads)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Code-expert/Job-Portal.git
cd Job-Portal
```

### 2. Backend Setup
Navigate into the backend directory and install dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory and add the following variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window, navigate into the frontend directory, and install dependencies:
```bash
cd Frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

### 4. Open the App
Visit `http://localhost:5173` in your browser.

## 🤝 Contributing
Contributions are welcome! Open a pull request or raise an issue to suggest improvements or report bugs.

## 📄 License
Licensed under the [MIT License](LICENSE).

## 👨‍💻 Author

**Harshraj Singh**
🔗 [GitHub Profile](https://github.com/Code-expert)
🌐 [Live App](https://jobifyhub.vercel.app)

