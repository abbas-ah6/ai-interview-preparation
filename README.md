# AI Interview Preparation App

A comprehensive, AI-powered interview preparation platform that helps you ace your technical interviews with personalized questions, detailed explanations, and interactive learning sessions.

## Features

### **Personalized Learning**
- **Role-Specific Questions**: Get interview questions tailored to your target role and experience level
- **AI-Generated Content**: Dynamic question generation using Google's Generative AI
- **Experience-Based Customization**: Questions adapt to your years of experience

### **Smart Learning Tools**
- **Interactive Sessions**: Create and manage multiple interview preparation sessions
- **Concept Explanations**: Get detailed explanations for complex topics when you need them
- **Progress Tracking**: Monitor your interview preparation journey

### **Modern User Experience**
- **Beautiful UI**: Clean, modern interface built with React and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Feedback**: Instant notifications and progress updates

### **Secure & Reliable**
- **User Authentication**: Secure login/signup with JWT tokens
- **Profile Management**: Upload profile pictures and manage your account
- **Data Persistence**: All your sessions and progress are safely stored

## Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Smooth animations and transitions
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Beautiful notifications
- **React Icons** - Comprehensive icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Google Generative AI** - AI-powered question generation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Docker** and **Docker Compose** (optional, for containerized deployment)
- **Google AI API Key** (for AI features)

## Quick Start

### Option 1: Local Development Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-interview-preparation-app
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

#### 3. Frontend Setup
```bash
cd ../frontend/interview-pre-ai-app
npm install
```

#### 4. Start the Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend/interview-pre-ai-app
npm run dev
```

#### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000

### Option 2: Docker Setup

#### 1. Clone and Navigate
```bash
git clone <repository-url>
cd ai-interview-preparation-app
```

#### 2. Environment Setup
Create a `.env` file in the backend directory with the same variables as above.

#### 3. Run with Docker Compose
```bash
docker-compose up --build
```

#### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## How to Use

### 1. **Getting Started**
- Visit the landing page and click "Get Started"
- Create an account or log in to your existing account
- Upload a profile picture (optional)

### 2. **Creating Your First Session**
- Click the "+" button on the dashboard
- Fill in your target role (e.g., "Frontend Developer")
- Specify your years of experience
- Add topics you want to focus on (comma-separated)
- Click "Create Session"

### 3. **Interview Preparation**
- Your AI will generate personalized questions based on your inputs
- Review questions and answers in the interactive interface
- Click on concepts to get detailed explanations
- Practice and improve your responses

### 4. **Managing Sessions**
- View all your sessions on the dashboard
- Delete sessions you no longer need
- Track your progress across different roles and topics

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=8000                                    # Server port
MONGO_URI=mongodb://localhost:27017/app     # MongoDB connection string
JWT_SECRET=your_super_secret_key            # JWT signing secret
GOOGLE_AI_API_KEY=your_google_ai_api_key    # Google AI API key
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

#### Sessions
- `GET /api/sessions` - Get all user sessions
- `POST /api/sessions` - Create new session
- `DELETE /api/sessions/:id` - Delete session

#### AI Features
- `POST /api/ai/generate-questions` - Generate interview questions
- `POST /api/ai/generate-explanation` - Get concept explanations

## Project Structure

```
ai-interview-preparation-app/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middlewares
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── uploads/            # File uploads
│   └── utils/              # Utility functions
├── frontend/               # React frontend
│   └── interview-pre-ai-app/
│       ├── src/
│       │   ├── components/ # Reusable components
│       │   ├── pages/      # Page components
│       │   ├── context/    # React context
│       │   └── utils/      # Utility functions
│       └── public/         # Static assets
└── docker-compose.yml      # Docker configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## Acknowledgments

- **Google Generative AI** for powering the intelligent question generation
- **React Team** for the amazing frontend framework
- **Express.js** for the robust backend framework
- **Tailwind CSS** for the beautiful styling system

---

**Happy Interview Preparation!**

*Built with love for developers who want to ace their technical interviews.*
