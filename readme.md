# Sync Clerk User Data with Your Database

This repository contains the source code for the Medium **[[article](https://medium.com/@hassanmehmood.dev/synchronize-your-database-with-clerk-authentication-using-webhooks-aa6ba56bd8b3)]**. It demonstrates how to synchronize user data from [Clerk Authentication](https://clerk.com/) into your own database using Clerk's built-in webhooks.

The project is split into two parts:

-   `frontend/`: A React (Vite + TypeScript) application with Clerk's sign-in components.
-   `backend/`: An Express.js server set up to receive and verify webhooks from Clerk.

---

## 🚀 Project Overview

The core challenge this project solves is keeping your application's database in sync with your Clerk user base. When a user signs up, updates their profile, or is deleted via Clerk, a webhook is sent to our backend. The backend then verifies the webhook and performs the corresponding action (create, update, delete) in the database.

### Key Technologies

-   [Clerk](https://clerk.com/) for authentication and webhook events
-   [React](https://react.dev/) with [Vite](https://vitejs.dev/) for the frontend
-   [Express.js](https://expressjs.com/) for the backend server
-   [Svix](https://www.svix.com/) for verifying webhook signatures
-   [ngrok](https://ngrok.com/) for exposing the local backend to the internet for testing

---

## 🛠️ Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v18 or later recommended)
-   A [Clerk](https://clerk.com/) account
-   [ngrok](https://ngrok.com/download) installed on your machine

### 1. Frontend Setup

The frontend is a simple React application that uses Clerk's components to handle user sign-up and sign-in.

1.  **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the `frontend` directory and add your Clerk Publishable Key.

    ```
    VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

### 2. Backend Setup

The backend is a lightweight Express server designed to listen for incoming webhooks from Clerk.

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the `backend` directory. You will need to get the Webhook Signing Secret from your Clerk Dashboard after creating an endpoint.

    ```
    WEBHOOK_SECRET=your_clerk_webhook_signing_secret
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000`.

---

## 📖 Learn More

For a complete, step-by-step guide on how this project was built and the concepts behind it, please read the accompanying Medium article:

**[[article](https://medium.com/@hassanmehmood.dev/synchronize-your-database-with-clerk-authentication-using-webhooks-aa6ba56bd8b3)]**

## ✍️ Author

Feel free to connect with me!

-   **LinkedIn:** [https://www.linkedin.com/in/hassanmehmoodd]
-   **Twitter/X:** [https://x.com/hassan_mehm00d]
-   **GitHub:** [https://github.com/Hassan-Mehmood]

