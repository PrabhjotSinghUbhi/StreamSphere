# StreamSphere 🎥

> A full-featured video streaming platform built with the MERN stack, offering YouTube-like functionality with modern UI/UX design.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/PrabhjotSinghUbhi/StreamSphere)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)

## 🌟 Overview

**StreamSphere** is a comprehensive video streaming platform that replicates core YouTube functionality. Built as a learning project to master full-stack development, it features secure authentication, video management, social interactions, and a responsive modern interface.

## ✨ Key Features

### 🔐 Authentication & User Management
- **Secure Registration/Login** with JWT tokens
- **Profile Management** with avatar and cover image uploads
- **Password Management** with bcrypt encryption
- **Refresh Token System** for enhanced security

### 📹 Video Management
- **Video Upload** with Cloudinary integration
- **Video Streaming** with optimized playback
- **Video Details** with title, description, and thumbnails
- **View Tracking** and engagement metrics
- **Video Search** and discovery

### 📱 Social Features
- **Channel Subscriptions** with subscriber counts
- **Commenting System** on videos
- **Like/Unlike** videos, comments, and tweets
- **Tweet System** for channel updates
- **User Channels** with customizable profiles

### 📑 Playlist & History
- **Custom Playlists** creation and management
- **Watch History** tracking
- **Watch Later** functionality
- **Liked Videos** collection

### 🎨 Modern UI/UX
- **Responsive Design** optimized for all devices
- **Dark/Light Theme** support
- **ShadCN UI Components** for consistent design
- **Real-time Updates** with Redux state management

## 🛠 Technology Stack

### Frontend
```javascript
React 19.1          // Modern UI library
Redux Toolkit       // State management
React Router        // Client-side routing
Tailwind CSS        // Utility-first styling
ShadCN/UI          // Pre-built components
Lucide React       // Modern icons
React Hook Form    // Form handling
Axios              // HTTP client
Vite               // Fast build tool
```

### Backend
```javascript
Node.js            // Runtime environment
Express.js         // Web framework
MongoDB            // NoSQL database
Mongoose           // ODM for MongoDB
JWT                // Authentication tokens
Bcrypt             // Password hashing
Cloudinary         // Media storage
Multer             // File upload handling
CORS               // Cross-origin requests
```

### Database Schema
```
📊 Collections:
├── Users          // User profiles and authentication
├── Videos         // Video metadata and files
├── Comments       // Video comments
├── Likes          // Like relationships
├── Subscriptions  // Channel subscriptions
├── Playlists      // User-created playlists
└── Tweets         // Channel tweets/posts
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Cloudinary Account** (for media storage)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PrabhjotSinghUbhi/StreamSphere.git
   cd StreamSphere
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` in the server directory:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/StreamSphere
   CORS_ORIGIN=http://localhost:5173
   
   # JWT Configuration
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Start the Application**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000`

## � Project Structure

```
StreamSphere/
├── client/                    # React frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Header/       # Navigation header
│   │   │   ├── Video/        # Video-related components
│   │   │   ├── Channel/      # Channel page components
│   │   │   ├── Playlist/     # Playlist management
│   │   │   └── ui/           # ShadCN UI components
│   │   ├── pages/            # Route components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API service functions
│   │   ├── slice/            # Redux state slices
│   │   └── utils/            # Utility functions
│   ├── package.json
│   └── vite.config.js
├── server/                    # Express backend
│   ├── public/temp/          # Temporary file storage
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Database schemas
│   │   ├── routes/           # API route definitions
│   │   ├── middlewares/      # Custom middleware
│   │   ├── utils/            # Utility functions
│   │   ├── db/               # Database connection
│   │   ├── app.js            # Express app configuration
│   │   └── index.js          # Server entry point
│   └── package.json
└── README.md
```

## 🔗 API Endpoints

### Authentication
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `POST /api/v1/users/logout` - User logout
- `POST /api/v1/users/refresh-token` - Refresh access token

### Videos
- `GET /api/v1/videos` - Get all videos
- `GET /api/v1/videos/:id` - Get video by ID
- `POST /api/v1/videos` - Upload new video
- `PATCH /api/v1/videos/:id` - Update video
- `DELETE /api/v1/videos/:id` - Delete video

### Playlists
- `GET /api/v1/playlists/get-user-playlist/:userID` - Get user playlists
- `POST /api/v1/playlists/create-playlist` - Create playlist
- `POST /api/v1/playlists/add-video/:playlistId/:videoId` - Add video to playlist
- `DELETE /api/v1/playlists/remove-video/:playlistId/:videoId` - Remove video

### Social Features
- `POST /api/v1/likes/video/:videoOwnerId/:videoId` - Toggle video like
- `POST /api/v1/comments/:videoId` - Add comment
- `POST /api/v1/subscribe/toggle/:channelId` - Toggle subscription

## 🎯 Features in Detail

### Video Upload & Management
- **Secure Upload**: Files are uploaded to Cloudinary with proper validation
- **Metadata Storage**: Title, description, thumbnails stored in MongoDB
- **View Tracking**: Automatic view count increment on video play
- **Video Quality**: Support for multiple video formats and qualities

### User Experience
- **Infinite Scroll**: Smooth video browsing experience
- **Search Functionality**: Real-time search across videos and channels
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Loading States**: Skeleton loaders and progress indicators

### Performance Optimizations
- **Lazy Loading**: Components and images load on demand
- **Code Splitting**: Reduced initial bundle size
- **API Optimization**: Efficient database queries with aggregation
- **Caching**: Redux persist for state management

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend (Railway/Render)
```bash
# Set environment variables in deployment platform
# Deploy using platform-specific methods
```

## 🧪 Testing

```bash
# Run frontend tests
cd client
npm run test

# Run backend tests
cd server
npm run test
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow ESLint configuration for code consistency
- Write meaningful commit messages
- Add comments for complex logic
- Test features before submitting PRs

## � License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Prabhjot Singh**
- GitHub: [@PrabhjotSinghUbhi](https://github.com/PrabhjotSinghUbhi)
- LinkedIn: [Prabhjot Singh](https://www.linkedin.com/in/prabhjotsinghubhi)

## � Acknowledgments

- **Hitesh Choudhary** - Backend development guidance
- **Chai aur Code** - Educational content and tutorials
- **ShadCN** - Beautiful UI components
- **Cloudinary** - Media storage and optimization
- **MongoDB** - Flexible database solution
- **Vercel** - Frontend deployment platform
- **Render** - Backend deployment platform

## 📊 Project Stats

- **Language**: JavaScript
- **Framework**: React + Express.js
- **Database**: MongoDB atlas
- **Authentication**: JWT
- **Storage**: Cloudinary
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: Redux Toolkit, React-Redux

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/PrabhjotSinghUbhi">Prabhjot Singh</a></sub>
</div>
