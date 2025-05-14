
# **React Blog Application**

This is a full-stack **React application** that fetches a random user's data from an API and displays it in a sidebar. It includes routing for the **Dashboard** and **Blogs** pages, with the ability to view individual blog details. The application utilizes **Ant Design** for UI components and **REST API** calls for fetching and editing data.

---

## **Features**

- **Sidebar** displaying a random user's data
- **Dashboard** page
- **Blog List** with clickable items that navigate to individual blog details
- **PUT request** for editing blog items
- **404 Error Handling** for invalid routes
- **Unit tests** to ensure functionality
- **Vite** as the build tool for faster development

---

## **Technologies Used**

- **Frontend**: React, React Router, Ant Design
- **Backend**: Node.js, Express
- **API calls**: REST API (using Fetch)
- **Testing**: Unit tests (using a framework like Jest or Mocha)
- **Development**: Vite, Yarn
- **Error Handling**: Custom 404 route for unhandled URLs
- **Version Control**: Git

---

## **Installation**

Follow the steps below to get your project up and running locally.

### **1. Clone the repository**

```bash
git clone https://github.com/your-username/react-blog-app.git
cd react-blog-app
```

### **2. Setup Environment variables**

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
