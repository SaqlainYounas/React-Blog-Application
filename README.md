# **React Blog Application**

This is a full-stack **React application** that fetches a random user's data from an API and displays it in a sidebar. It includes routing for the **Dashboard** and **Blogs** pages, with the ability to view individual blog details. The application utilizes **Ant Design** for UI components and **REST API** calls for fetching and editing data.

---

## **Installation & Setup**

Follow the steps below to get your project up and running locally.

### **1. Setup Environment variables**

#### **For Frontend**:

Setup Environment variables:

```bash
VITE_API_URL = http://localhost:5000
```

#### **For Backend (Node.js + Express)**:

Setup Environment variables:

```bash

PORT = 5000
FRONTEND_HOST= "http://localhost:5173"


```

### **3. Install dependencies**

#### **For Frontend**:

Install the frontend dependencies using Yarn (since you're using Yarn):

```bash
yarn install
```

#### **For Backend (Node.js + Express)**:

```bash
npm install
```

### **4. Start the application**

#### **For Frontend**:

Run the following command to start the development server:

```bash
yarn dev
```

This will start the React application on provided env url.

#### **For Backend (Node.js + Express)**:

To start the backend (if it's a separate app), run:

```bash
npm run dev
```

This will start the backend on provided env url.

--
