# Event-Driven Library Management System

## 📌 Project Overview
This project demonstrates the evolution of a traditional synchronous web application into an **Event-Driven Architecture (EDA)**. 
The system allows a librarian to add books to the system. Instead of blocking the user while secondary tasks (like notifications) are processed, the system uses **RabbitMQ** to handle these tasks asynchronously.

## 🏗 System Architecture

The system consists of three decoupled components:

1.  **Library API (Producer):** A Spring Boot REST API that handles user requests and publishes events.
2.  **Message Broker:** RabbitMQ serves as the Event Bus to decouple services.
3.  **Notification Service (Consumer):** An independent Spring Boot service that listens for events and simulates sending emails.
4.  **Frontend:** A React application for the user interface.

### The Asynchronous Flow
1.  **User Action:** User adds a book via the React Frontend.
2.  **Persistence:** `Library-API` saves the book to the MySQL database.
3.  **Event Publication:** `Library-API` publishes a `BookCreatedEvent` (JSON) to the `library-exchange` in RabbitMQ.
4.  **Immediate Response:** The API returns `200 OK` to the user immediately, without waiting for the notification process.
5.  **Asynchronous Processing:** `Library-Consumer` picks up the event from the queue and processes the notification in the background.

## 🚀 Technologies Used
* **Backend:** Java 17, Spring Boot 3.x
* **Messaging:** RabbitMQ (AMQP)
* **Frontend:** React.js
* **Database:** MySQL
* **Containerization:** Docker (for RabbitMQ)


