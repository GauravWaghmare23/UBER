# Uber Clone Application

## Overview

This is a full-stack Uber clone application that allows users to book rides and captains (drivers) to accept and manage rides. The application consists of a React-based frontend and a Node.js/Express backend with MongoDB for data storage and Socket.io for real-time communication.

### Features

- **User Registration and Authentication**: Users can register, login, and manage their profiles.
- **Captain Registration and Authentication**: Drivers can register, login, and manage their profiles.
- **Ride Booking**: Users can search for locations, select vehicles, and book rides.
- **Real-time Ride Matching**: Captains receive ride requests in real-time via Socket.io.
- **Ride Management**: Captains can accept, start, and end rides.
- **Maps Integration**: Uses external map services for location coordinates, distance, time, and fare calculations.
- **Payment Simulation**: Basic fare calculation (actual payment integration not implemented).
- **Responsive UI**: Built with React and TailwindCSS for a modern, mobile-friendly interface.

### Tech Stack

#### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **Socket.io**: Real-time communication.
- **JWT**: Authentication tokens.
- **Bcrypt**: Password hashing.
- **Axios**: HTTP client for external API calls.
- **Express Validator**: Input validation.
- **CORS**: Cross-origin resource sharing.
- **Cookie Parser**: Handling cookies.

#### Frontend
- **React**: UI library.
- **Vite**: Build tool and development server.
- **React Router DOM**: Client-side routing.
- **TailwindCSS**: Utility-first CSS framework.
- **Axios**: HTTP client for API calls.
- **Socket.io Client**: Real-time communication.
- **GSAP**: Animation library.
- **Remixicon**: Icon library.

#### Other Tools
- **Nodemon**: Development server for backend.
- **ESLint**: Code linting.
- **Vite Plugins**: For React and TailwindCSS.

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **MongoDB** (local or cloud instance, e.g., MongoDB Atlas)
- **npm** or **yarn** package manager
- **Git** for cloning the repository

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd uberclone
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the backend directory with the following variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/uberclone
     JWT_SECRET=your_jwt_secret_key
     MAPS_API_KEY=your_maps_api_key  # For external map services
     ```
     - Replace `your_jwt_secret_key` with a strong secret.
     - Replace `your_maps_api_key` with your actual maps API key (e.g., Google Maps API).

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

## Running the Application

1. **Start the Backend**:
   - From the backend directory:
     ```bash
     npm run dev
     ```
   - The server will start on `http://localhost:3000` (or the port specified in `.env`).

2. **Start the Frontend**:
   - From the frontend directory:
     ```bash
     npm run dev
     ```
   - The frontend will start on `http://localhost:5173` (default Vite port).

3. **Access the Application**:
   - Open your browser and go to `http://localhost:5173`.
   - For CORS, ensure the frontend origin is allowed in the backend (currently set to `https://p62j62jw-5173.inc1.devtunnels.ms` in `app.js`, update if needed).

## Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── app.js                 # Main Express app setup
│   ├── server.js              # Server entry point with Socket.io
│   ├── socket.js              # Socket.io configuration
│   ├── config/
│   │   └── config.js          # Configuration settings
│   ├── controllers/
│   │   ├── user.controller.js     # User-related logic
│   │   ├── captain.controller.js  # Captain-related logic
│   │   ├── ride.controller.js     # Ride-related logic
│   │   └── map.controller.js      # Map-related logic
│   ├── db/
│   │   └── db.js              # Database connection
│   ├── middlewares/
│   │   ├── auth.middleware.js     # Authentication middleware
│   │   └── errorHandler.js        # Error handling middleware
│   ├── models/
│   │   ├── user.model.js          # User schema
│   │   ├── captain.model.js       # Captain schema
│   │   ├── ride.model.js          # Ride schema
│   │   └── blacklist.model.js     # Blacklist schema for tokens
│   ├── routes/
│   │   ├── user.route.js          # User routes
│   │   ├── captain.route.js       # Captain routes
│   │   ├── ride.routes.js         # Ride routes
│   │   └── map.routes.js          # Map routes
│   └── services/
│       ├── user.service.js        # User business logic
│       ├── captain.service.js     # Captain business logic
│       ├── ride.service.js        # Ride business logic
│       └── maps.service.js        # Map service logic
├── package.json
├── server.js
└── .env
```

### Frontend Structure
```
frontend/
├── src/
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   ├── index.css              # Global styles
│   ├── components/            # Reusable components
│   │   ├── CaptainDetails.jsx
│   │   ├── CaptainLogout.jsx
│   │   ├── ConfirmRide.jsx
│   │   ├── ConfirmRidePopUp.jsx
│   │   ├── FinishRide.jsx
│   │   ├── LocationSearchPanel.jsx
│   │   ├── LookingForDriver.jsx
│   │   ├── RidePopUp.jsx
│   │   ├── UserLogout.jsx
│   │   ├── VehiclePanel.jsx
│   │   └── WaitingForDriver.jsx
│   ├── contexts/              # React contexts for state management
│   │   ├── UserContext.jsx
│   │   ├── CaptainContext.jsx
│   │   └── SocketContext.jsx
│   ├── pages/                 # Page components
│   │   ├── Home.jsx
│   │   ├── UserLogin.jsx
│   │   ├── UserRegister.jsx
│   │   ├── CaptainLogin.jsx
│   │   ├── CaptainRegister.jsx
│   │   ├── CaptainHome.jsx
│   │   ├── Riding.jsx
│   │   ├── CaptainRiding.jsx
│   │   ├── Start.jsx
│   │   └── NotFound.jsx
│   ├── protectedRoutes/       # Route protection wrappers
│   │   ├── UserProtectWrapper.jsx
│   │   ├── CaptainProtectWrapper.jsx
│   │   └── NonProtectedWrapper.jsx
│   ├── services/              # API and socket services
│   │   └── socketService.js
│   ├── utils/                 # Utility functions
│   │   └── axiosClient.js
│   └── lib/                   # Additional libraries
│       └── axiosClient.js
├── public/
│   └── vite.svg
├── package.json
├── vite.config.js
└── index.html
```

## Data Models

### User Model
- **Schema**:
  ```javascript
  {
    fullName: {
      firstName: { type: String, required: true, minlength: 3 },
      lastName: { type: String, minlength: 3 }
    },
    email: { type: String, required: true, unique: true, minlength: 3 },
    password: { type: String, required: true, minlength: 8, select: false },
    socketId: { type: String }
  }
  ```
- **Description**: Represents a user who books rides. Password is hashed and not selected by default.

### Captain Model
- **Schema**:
  ```javascript
  {
    fullName: {
      firstName: { type: String, required: true, minlength: 3 },
      lastName: { type: String, minlength: 3 }
    },
    email: { type: String, required: true, unique: true, minlength: 3 },
    password: { type: String, required: true, minlength: 8, select: false },
    socketId: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    vehicle: {
      color: { type: String, required: true, minlength: 3 },
      plate: { type: String, required: true, minlength: 3 },
      capacity: { type: Number, required: true, min: 1 },
      vehicleType: { type: String, required: true, enum: ['car', 'motorcycle', 'auto'] }
    },
    location: {
      lat: Number,
      lng: Number
    }
  }
  ```
- **Description**: Represents a driver. Includes vehicle details and location for ride matching.

### Ride Model
- **Schema**:
  ```javascript
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    captain: { type: mongoose.Schema.Types.ObjectId, ref: 'Captain' },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    fare: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'], default: 'pending' },
    duration: { type: Number }, // in seconds
    distance: { type: Number }, // in meters
    paymentID: { type: String },
    orderId: { type: String },
    signature: { type: String },
    otp: { type: String, select: false, required: true }
  }
  ```
- **Description**: Represents a ride request. Includes user, captain, locations, fare, and status.

### Blacklist Model
- **Schema**:
  ```javascript
  {
    token: { type: String, required: true, unique: true }
  }
  ```
- **Description**: Stores blacklisted JWT tokens for logout functionality.

## API Documentation

The backend provides RESTful APIs for user management, captain management, ride operations, and map services. All endpoints require authentication where specified.

### Base URL
- `http://localhost:3000` (or your configured port)

### Authentication
- Uses JWT tokens stored in cookies.
- Include `Authorization: Bearer <token>` header or use cookies for authenticated requests.

### User Routes (`/users`)

#### 1. Register User
- **Endpoint**: `POST /users/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Validation**:
  - `fullName.firstName`: Min 3 characters
  - `fullName.lastName`: Min 3 characters
  - `email`: Valid email
  - `password`: Min 8 characters
- **Response**:
  - **200 OK**: User registered successfully.
    ```json
    {
      "token": "jwt_token",
      "user": {
        "_id": "user_id",
        "fullName": { "firstName": "John", "lastName": "Doe" },
        "email": "john.doe@example.com"
      }
    }
    ```
  - **400 Bad Request**: Validation errors.
  - **500 Internal Server Error**: Server error.

#### 2. Login User
- **Endpoint**: `POST /users/login`
- **Description**: Logs in a user.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```
- **Validation**:
  - `email`: Valid email
  - `password`: Min 8 characters
- **Response**:
  - **200 OK**: Login successful.
    ```json
    {
      "token": "jwt_token",
      "user": {
        "_id": "user_id",
        "fullName": { "firstName": "John", "lastName": "Doe" },
        "email": "john.doe@example.com"
      }
    }
    ```
  - **401 Unauthorized**: Invalid credentials.
  - **500 Internal Server Error**: Server error.

#### 3. Get User Profile
- **Endpoint**: `GET /users/profile`
- **Description**: Retrieves the authenticated user's profile.
- **Headers**: `Authorization: Bearer <token>` or cookies.
- **Response**:
  - **200 OK**:
    ```json
    {
      "_id": "user_id",
      "fullName": { "firstName": "John", "lastName": "Doe" },
      "email": "john.doe@example.com"
    }
    ```
  - **401 Unauthorized**: Not authenticated.
  - **500 Internal Server Error**: Server error.

#### 4. Logout User
- **Endpoint**: `GET /users/logout`
- **Description**: Logs out the user by blacklisting the token.
- **Headers**: `Authorization: Bearer <token>` or cookies.
- **Response**:
  - **200 OK**: Logout successful.
    ```json
    {
      "message": "Logged out successfully"
    }
    ```
  - **401 Unauthorized**: Not authenticated.
  - **500 Internal Server Error**: Server error.

### Captain Routes (`/captains`)

#### 1. Register Captain
- **Endpoint**: `POST /captains/register`
- **Description**: Registers a new captain.
- **Request Body**:
  ```json
  {
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```
- **Validation**:
  - Similar to user registration, plus vehicle fields.
- **Response**:
  - **200 OK**: Captain registered successfully.
    ```json
    {
      "token": "jwt_token",
      "captain": {
        "_id": "captain_id",
        "fullName": { "firstName": "Jane", "lastName": "Smith" },
        "email": "jane.smith@example.com",
        "vehicle": { ... }
      }
    }
    ```
  - **400 Bad Request**: Validation errors.
  - **500 Internal Server Error**: Server error.

#### 2. Login Captain
- **Endpoint**: `POST /captains/login`
- **Description**: Logs in a captain.
- **Request Body**:
  ```json
  {
    "email": "jane.smith@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - **200 OK**: Login successful.
    ```json
    {
      "token": "jwt_token",
      "captain": { ... }
    }
    ```
  - **401 Unauthorized**: Invalid credentials.
  - **500 Internal Server Error**: Server error.

#### 3. Get Captain Profile
- **Endpoint**: `GET /captains/profile`
- **Description**: Retrieves the authenticated captain's profile.
- **Headers**: `Authorization: Bearer <token>` or cookies.
- **Response**:
  - **200 OK**:
    ```json
    {
      "_id": "captain_id",
      "fullName": { "firstName": "Jane", "lastName": "Smith" },
      "email": "jane.smith@example.com",
      "vehicle": { ... }
    }
    ```
  - **401 Unauthorized**: Not authenticated.
  - **500 Internal Server Error**: Server error.

#### 4. Logout Captain
- **Endpoint**: `GET /captains/logout`
- **Description**: Logs out the captain.
- **Headers**: `Authorization: Bearer <token>` or cookies.
- **Response**:
  - **200 OK**: Logout successful.
    ```json
    {
      "message": "Logged out successfully"
    }
    ```
  - **401 Unauthorized**: Not authenticated.
  - **500 Internal Server Error**: Server error.

### Ride Routes (`/rides`)

#### 1. Create Ride
- **Endpoint**: `POST /rides/create`
- **Description**: Creates a new ride request.
- **Headers**: `Authorization: Bearer <token>` (user).
- **Request Body**:
  ```json
  {
    "pickup": "Location A",
    "destination": "Location B",
    "vehicleType": "car"
  }
  ```
- **Response**:
  - **200 OK**: Ride created.
    ```json
    {
      "ride": { ... },
      "otp": "1234"
    }
    ```
  - **400 Bad Request**: Validation errors.
  - **500 Internal Server Error**: Server error.

#### 2. Accept Ride
- **Endpoint**: `POST /rides/:id/accept`
- **Description**: Captain accepts a ride.
- **Headers**: `Authorization: Bearer <token>` (captain).
- **Response**:
  - **200 OK**: Ride accepted.
    ```json
    {
      "message": "Ride accepted"
    }
    ```
  - **404 Not Found**: Ride not found.
  - **500 Internal Server Error**: Server error.

#### 3. Start Ride
- **Endpoint**: `POST /rides/:id/start`
- **Description**: Captain starts the ride.
- **Headers**: `Authorization: Bearer <token>` (captain).
- **Response**:
  - **200 OK**: Ride started.
    ```json
    {
      "message": "Ride started"
    }
    ```
  - **404 Not Found**: Ride not found.
  - **500 Internal Server Error**: Server error.

#### 4. End Ride
- **Endpoint**: `POST /rides/:id/end`
- **Description**: Captain ends the ride.
- **Headers**: `Authorization: Bearer <token>` (captain).
- **Response**:
  - **200 OK**: Ride ended.
    ```json
    {
      "message": "Ride ended"
    }
    ```
  - **404 Not Found**: Ride not found.
  - **500 Internal Server Error**: Server error.

### Map Routes (`/maps`)

#### 1. Get Coordinates
- **Endpoint**: `GET /maps/get-coordinates?address=<address>`
- **Description**: Gets coordinates for an address.
- **Response**:
  - **200 OK**:
    ```json
    {
      "lat": 12.345,
      "lng": 67.890
    }
    ```
  - **400 Bad Request**: Invalid address.
  - **500 Internal Server Error**: Server error.

#### 2. Get Distance, Time, and Fare
- **Endpoint**: `GET /maps/get-distance-time-fare?origin=<origin>&destination=<destination>`
- **Description**: Calculates distance, time, and fare.
- **Response**:
  - **200 OK**:
    ```json
    {
      "distance": 1000,
      "time": 600,
      "fare": 50
    }
    ```
  - **400 Bad Request**: Invalid locations.
  - **500 Internal Server Error**: Server error.

#### 3. Get Suggestions
- **Endpoint**: `GET /maps/get-suggestions?input=<input>`
- **Description**: Gets location suggestions.
- **Response**:
  - **200 OK**:
    ```json
    [
      { "description": "Location 1", "place_id": "id1" }
    ]
    ```
  - **400 Bad Request**: Invalid input.
  - **500 Internal Server Error**: Server error.

## Frontend Components and Pages

### Pages
- **Home**: Main landing page for users to book rides.
- **UserLogin/UserRegister**: Authentication pages for users.
- **CaptainLogin/CaptainRegister**: Authentication pages for captains.
- **CaptainHome**: Dashboard for captains to manage rides.
- **Riding/CaptainRiding**: Pages for ongoing rides.
- **Start**: Initial page.
- **NotFound**: 404 page.

### Components
- **LocationSearchPanel**: For searching pickup/destination.
- **VehiclePanel**: Displays vehicle options.
- **ConfirmRide/ConfirmRidePopUp**: Ride confirmation.
- **LookingForDriver**: Waiting for driver.
- **WaitingForDriver**: Driver en route.
- **RidePopUp**: Ride details.
- **FinishRide**: End ride.
- **CaptainDetails**: Captain info.
- **UserLogout/CaptainLogout**: Logout components.

### Contexts
- **UserContext**: Manages user state.
- **CaptainContext**: Manages captain state.
- **SocketContext**: Manages Socket.io connections.

## Integration

### Frontend-Backend Communication
- Frontend uses Axios for API calls to backend endpoints.
- Authentication tokens are stored in cookies and sent with requests.

### Real-time Communication
- Socket.io is used for real-time updates:
  - Ride requests to captains.
  - Ride status updates.
  - Location sharing.

### Database Integration
- MongoDB stores users, captains, rides, and blacklisted tokens.
- Mongoose handles schema validation and queries.

### External Services
- Map services (e.g., Google Maps) for coordinates, directions, and suggestions.

## Error Handling
- Backend uses custom error handler middleware.
- Frontend handles errors via try-catch in API calls and displays user-friendly messages.

## Security
- Passwords are hashed with bcrypt.
- JWT for authentication.
- CORS configured for allowed origins.
- Input validation with express-validator.

## Deployment
- Backend can be deployed to services like Heroku, Vercel, or AWS.
- Frontend can be built with `npm run build` and deployed to Netlify, Vercel, etc.
- Ensure environment variables are set in production.

## Contributing
- Fork the repository.
- Create a feature branch.
- Make changes and test.
- Submit a pull request.

## License
- MIT License.

## Contact
- For issues, contact the maintainer.


