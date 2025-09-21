🌐 URL Shortener (MERN Stack)

A full-stack URL shortener application built with MERN (MongoDB, Express.js, React, Node.js).
This app allows users to:

✂️ Shorten long URLs into shareable links.

🔗 Redirect to the original URL when the short link is visited.

👤 Register and log in securely to manage their links.

📊 Track click counts for each shortened URL.

🚀 Features

Authentication: User registration and login using JWT.

URL Shortening: Convert any long URL into a short one.

Redirection: Clicking a short URL opens the original webpage.

Click Tracking: View how many times a URL has been accessed.

Responsive UI: Built with React for a smooth user experience.

MERN Stack: Uses MongoDB, Express.js, React, and Node.js.

🛠️ Tech Stack

Frontend: React, Axios, CSS/Bootstrap (or Tailwind)

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Authentication: JSON Web Token (JWT), bcrypt.js

Other Tools: Nanoid for unique short URLs

📂 Project Structure
project-folder/
│
├── backend/             # Express server & API routes  
│   ├── models/          # Mongoose schemas  
│   ├── routes/          # API endpoints (auth, URLs)  
│   └── server.js        # Entry point for backend  
│
├── frontend/            # React app  
│   ├── src/             # Components, pages, hooks  
│   └── package.json  
│
├── .env                 # Environment variables  
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2️⃣ Backend Setup
cd backend
npm install


Create a .env file in backend/ with:

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
PORT=5000  
BASE_URL=http://localhost:5000  


Run the backend:

npm start

3️⃣ Frontend Setup
cd ../frontend
npm install
npm start

▶️ Usage

Open the app in your browser: http://localhost:3000.

Register or log in.

Paste a long URL and click Shorten.

Copy the generated short URL and share it.

Check your dashboard to see the click count for each link.

📸 Screenshots (Optional)
1.Registration page
<img width="1905" height="912" alt="image" src="https://github.com/user-attachments/assets/58d6fd50-dfdb-4688-b40d-7229e0f4e090" />
2.Login page
<img width="1883" height="907" alt="image" src="https://github.com/user-attachments/assets/1e278bee-5fac-4117-9ec0-cb22508e3cd7" />
3.Shortner page
<img width="1878" height="899" alt="image" src="https://github.com/user-attachments/assets/c4decdf3-bdf8-4bf5-b474-6799bf8d41b3" />
    
🧑‍💻 Author

Abhishek (Technology Abhi)

💪 YouTube: abhifitz6

✨ GitHub: abhishek028625/cmyk


This project is licensed under the MIT License
.
