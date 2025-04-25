# MangaDB

Welcome to MangaDB! This project is a robust telecom database system designed to manage essential telecom operations. It includes functionalities such as user management, billing and transaction processing, and detailed record tracking. Built with a modern tech stack, MangaDB ensures scalability, reliability, and a seamless user experience.

---

## 🚀 Features

- **User-Friendly Interface**: A modern and intuitive UI built with React and styled using CSS.
- **Secure User Authentication**: Login and registration functionalities to ensure secure access.
- **Billing and Payment Transactions**: Efficiently handles billing, payment processing, and detailed transaction records.
- **Telecom Data Management**: Manage customer data, service subscriptions, and usage records.
- **SQL Backend**: A powerful database powered by T-SQL for secure and efficient data storage.
- **ASP.NET Integration**: Backend logic implemented using ASP.NET to connect the SQL database and business logic seamlessly.

---

## 🛠️ Tech Stack

### **Frontend**
- React.js
- JavaScript
- HTML5
- CSS3

### **Backend**
- ASP.NET

### **Database**
- SQL (T-SQL)

---

## 📂 Project Structure

```
MangaDB/
│
├── frontend/           # React frontend code
│   ├── components/     # React components
│   ├── styles/         # CSS stylesheets
│   ├── public/         # Static assets
│   └── App.js          # Main React app
│
├── backend/            # ASP.NET backend logic
│   ├── Controllers/    # API controllers
│   ├── Models/         # Database models
│   └── Services/       # Business logic services
│
├── database/           # SQL scripts and management
│   └── schema.sql      # Database schema
│
└── README.md           # Project documentation
```

---

## 💻 Setup and Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yehia-ke/MangaDB.git
   cd MangaDB
   ```

2. **Set Up the Frontend**
   - Navigate to the `frontend` folder:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

3. **Set Up the Backend**
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Restore dependencies:
     ```bash
     dotnet restore
     ```
   - Run the ASP.NET server:
     ```bash
     dotnet run
     ```

4. **Set Up the Database**
   - Import the `schema.sql` file located in the `database` folder into your SQL Server.
   - Update the connection string in the backend configuration file.

---

## 🌟 Screenshots

### Dashboard
![Dashboard](https://i.imgur.com/bw2zsjb.png)

### Login Page
![Login Page](https://i.imgur.com/sahMghH.png)

### Page 1
![Page 1](https://i.imgur.com/adAagQG.png)

### About Page
![About Page](https://i.imgur.com/Jre3hIY.gif)

---

## 🔒 Security

- **Data Encryption**: Sensitive data is encrypted to ensure confidentiality.
- **Input Validation**: All inputs are validated to prevent malicious attacks.
- **Authentication**: Secure user authentication using industry-standard practices.

---

## 📧 Contact

For any inquiries or suggestions, feel free to reach out:

- **Authors**: Yehia KE (Yehia Eltantawi), RemoteShift (Aly Gaafar)
- **Emails**: [Yehia Eltantawi](mailto:your-email@example.com), [Aly Gaafar](mailto:alimohamedgaafar@gmail.com)
- **GitHubs**: [yehia-ke](https://github.com/yehia-ke), [RemoteShift](https://github.com/RemoteShift)

---

Thank you for visiting MangaDB! We hope you enjoy exploring the project. 😊
