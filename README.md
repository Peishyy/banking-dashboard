# 💼 Banking Dashboard Application

This is a full-stack **Banking Dashboard** system that allows user registration, login, transfers between users, and viewing of user details and transaction history. It also features data export and visual feedback on account status.

---

## 📦 Tech Stack

- *Frontend*: Angular 16+ (Standalone components, TypeScript)
- *Backend*: Node.js + Express.js
- *Database*: MySQL
- *Authentication*: JSON Web Tokens (JWT)
- *Styling*: Basic CSS + Angular Forms

---

## Features

### User Management
- Register new users (Name, Email, Password, Account Type)
- Login with secure JWT authentication
- View list of all users with balance and account type
- Red highlight for users with low balance

### Transactions
- Send money from one user to another
- View complete transaction history
- Sort and search transactions (by amount, date, sender, receiver, note)
- Export transaction data as CSV

### Dashboard
- Overview of system (charts/analytics may be included optionally)

### Error Handling
- Friendly UI error messages (e.g., invalid credentials, registration errors)
- Backend validation and database constraint checks

---

## ⚙️ How to Run the Project Locally

This project is split into two folders:
- frontend/ → Angular frontend
- backend/ → Node.js API and database connection

### 🧱 1. Clone the Project
```bash
git clone https://github.com/YOUR-USERNAME/banking-dashboard.git

cd banking-dashboard
```
---
### ⚙️ 2. Set Up MySQL Database
```bash
cd backend
```
- Import the schema and sample data using the following command:
```bash  
mysql -u root -p < banking.sql

Enter root password:
```
- Change DB_PASSWORD in .env file in backend folder to your root password.

### 🚀 3. Run the Backend
- Prerequisites:  
-Node.js & npm installed

-MySQL service running
```bash
npm install

npm run dev
```
- This runs Express server on http://localhost:5000

### 💻 4. Run the Frontend
- Prerequisites:

-Angular CLI installed: 
```bash
npm install -g @angular/cli

cd frontend

npm install

ng serve
```
- Navigate to http://localhost:4200 in your browser.

## 🧪 Testing & Validation

- Unit tests implemented using Jasmine/Karma
- Run using: 
```bash
cd frontend

ng test
```
✅ All specs are passing (15+)

## 🧠 Assumptions & Design Decisions

- Only users with valid JWT tokens can access the dashboard, transfers, users, and transactions pages.
- A user cannot transfer money to themselves.
- Transfers are blocked if sender’s balance is insufficient.
- Passwords are hashed using bcrypt for security.
- Data in the frontend is refreshed dynamically or upon route navigation.
- The app shows low-balance accounts in red to warn the admin.
- Transactions are sorted in descending order by default.
- Forms include client-side validation using Angular forms.

## 📝 How to Register and Use the System

- Go to http://localhost:4200/register
- Fill in your name, email, password, and choose account type (e.g., Savings or Checking)
- After registering, you'll be redirected to login
- Once logged in, navigate using the top navbar:

Dashboard

Users

Transfer

Transactions

- To export user or transaction data, click the ⬇️ Export CSV button on respective pages.


## 🔒 Logout

- A logout button is shown in the navbar when you're logged in. It clears the JWT token and redirects to login.

## 👩‍💻 Author
- Patience Mwangi
- Software Engineering Technical Assessment
- July 2025
