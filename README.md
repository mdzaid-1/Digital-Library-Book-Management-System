📚 Digital Library Book Management System

A Spring Boot-based web application for managing a digital library, allowing users to add, delete, update, and search for books.


🚀 Features

✅ Add new books to the library

✅ Delete books from the collection

✅ Update book details

✅ Search books by title or ID

✅ Manage book availability status


🛠️ Technologies Used

Backend: Spring Boot, Hibernate, MySQL

Frontend: HTML, CSS, JavaScript

Build Tool: Maven

📂 Project Setup

1️⃣ Clone the Repository

git clone https://github.com/mdzaid-1/Digital-Library-Book-Management-System.git

cd Digital-Library-Book-Management-System


2️⃣ Configure the Database
Create a MySQL database named digital_library, then update the database credentials in:

📄 src/main/resources/application.properties

spring.datasource.url=jdbc:mysql://localhost:3306/digital_library

spring.datasource.username=yourusername

spring.datasource.password=yourpassword

Replace yourusername and yourpassword with your MySQL credentials.


3️⃣ Build and Run the Application

mvn clean install

mvn spring-boot:run

The application will start at http://localhost:8080.


💡 How to Use

1️⃣ Open the app in your browser.

2️⃣ Use the "Add Book" button to add a book.

3️⃣ Search for books using the search bar.

4️⃣ Update or delete books using the provided options.

🏗️ Future Enhancements

🔹 Implement user authentication & roles

🔹 Add book categories & ratings

🔹 Improve UI with modern design

🤝 Contributing

Feel free to fork this repository and submit pull requests!
