# Graduation-Thesis

# Project Setup Guide

This guide will walk you through setting up the project, including the database, backend, and frontend components.

## Prerequisites

- MongoDB installed and running
- Java JDK (for the backend)
- Maven (for building the backend)
- Node.js and npm (for running the frontend)

## 1. Setup Database

The project uses MongoDB as its database.

1. Ensure MongoDB is running on your local machine. The default port is `27017`.
2. The database used by the project is named `sharecode_db`. MongoDB will automatically create this database once data is inserted.

## 2. Run Backend

The backend is a Spring Boot application.

### Setup

Navigate to the `oce-backend` directory:

```sh
cd oce-backend
```

### Configuration

Open the `application.properties` file located in the `src/main/resources` directory and update the MongoDB connection details if needed.

### Build and Run

Build the project using Maven:

```sh
mvn clean install
```

Run the Spring Boot application:

```sh
mvn spring-boot:run
```

The backend should now be running on `http://localhost:8080`.

## 3. Run Frontend

The frontend is a React application.

### Setup

Navigate to the `oce-frontend` directory:

```sh
cd ../oce-frontend
```

### Install Dependencies

Install the necessary dependencies using npm:

```sh
npm install
```

### Run the Application

Start the development server:

```sh
npm start
```

The frontend should now be running on `http://localhost:3000`.