# Financial Web Application

## Overview
This project is a **financial web application** that allows users to perform transactions, manage their accounts, and receive real-time notifications. The system follows a **microservices architecture** and includes role-based access control. The frontend is built using **React.js**, while the backend consists of multiple microservices communicating with each other.

---

## Architecture
The application is designed using a **microservices architecture**, where each service handles a specific responsibility. These services communicate using REST APIs.

### Microservices Overview

1. **User Service**
   - Manages user authentication and profiles
   - Handles role-based access control (Admin, User, etc.)
   - JWT-based authentication
   - Stores user data in MongoDB

2. **Account Service**
   - Handles account creation, balance management
   - Links users to their financial accounts
   - Fetches account details
   - Uses MongoDB for data storage

3. **Transaction Service**
   - Manages deposits, withdrawals, and transfers
   - Ensures transaction validation and processing
   - Tracks transaction history
   - Uses MongoDB to store transaction records

4. **Notification Service**
   - Sends real-time notifications about transactions
   - Uses WebSockets for instant updates
   - Integrates with email or SMS services



---

## Frontend
The frontend is built using **React.js** and follows a component-based architecture with the following modules:

### Key Features
- **User Authentication:** Login, register, and JWT token handling
- **Dashboard:** Displays account details, transactions, and notifications
- **Transaction Management:** Allows users to deposit, withdraw, and transfer funds
- **Role-Based UI:** Admins have additional access to manage users
- **Real-Time Notifications:** WebSocket-based transaction alerts

### Major Components

1. **Authentication Components**
   - `Login.js` - Handles user authentication
   - `Register.js` - Allows new users to sign up
   - `ProtectedRoute.js` - Restricts access based on user roles

2. **Dashboard Components**
   - `Dashboard.js` - Displays user balance and recent transactions
   - `AccountDetails.js` - Shows account-related data

3. **Transaction Components**
   - `TransactionForm.js` - Handles deposits and withdrawals
   - `TransactionHistory.js` - Displays past transactions

4. **Notification Components**
   - `NotificationList.js` - Shows real-time alerts
   - `WebSocketHandler.js` - Manages WebSocket connections



---

## Technologies Used
### Frontend
- React.js (UI Framework)
- Redux (State Management)
- Axios (API Requests)
- WebSockets (Real-time updates)
- Tailwind CSS (Styling)
- Vercel (Deployment)

### Backend
- Node.js & Express.js (API Server)
- MongoDB (Database for all services)
- JWT (Authentication & Security)
- WebSockets (Real-time communication)
- Docker (Containerization)
- RabbitMQ/Kafka (Optional - for message queueing between services)
- Render (Deployment)

---

## API Endpoints
### User Service
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/user/register` | Register a new user |
| `POST` | `/api/user/login` | Authenticate and get token |
| `GET` | `/api/user/profile` | Fetch user profile |

### Account Service
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/account/{id}` | Get account details |
| `POST` | `/api/account/create` | Create a new account |

### Transaction Service
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/transaction/deposit` | Deposit money |
| `POST` | `/api/transaction/withdraw` | Withdraw money |
| `GET` | `/api/transaction/history` | Get transaction history |

### Notification Service
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/notification` | Get all notifications |



---

## Installation & Setup
### Prerequisites
- Node.js installed
- MongoDB running locally or using a cloud database (MongoDB Atlas)
- Docker (if using containerization)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/financial-app.git
   cd financial-app/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start backend services:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

---

## Future Improvements
- Implement a **notification queue** using RabbitMQ/Kafka for better performance
- Add **multi-currency support** for transactions
- Improve **unit & integration testing** using Jest and Mocha
- Implement **AI-powered financial insights** for users


