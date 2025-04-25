# MangaDB

Welcome to MangaDB! This project is a comprehensive bank management system that includes functionalities such as payment transaction management, cashback processing, user login, and registration. Designed with both performance and user experience in mind, MangaDB leverages a robust tech stack to deliver a seamless banking experience.

---

## 🚀 Features

- **User-Friendly Interface**: A sleek and intuitive UI built with React and styled using CSS.
- **Secure User Authentication**: Login and registration functionalities to ensure secure access.
- **Payment Transaction Management**: Easily handle payment processing with detailed tracking.
- **Cashback System**: Integrated cashback functionality to reward users.
- **SQL Backend**: A reliable database powered by T-SQL for secure and efficient data storage.
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

### Login Page
![Login Page](https://via.placeholder.com/800x400?text=Login+Page+Screenshot)

### Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

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
