# Human Anatomy & Physiology API

## Description

This is a Node.js project that provides an API to interact with a human anatomy database. The API offers routes to explore and manage data related to the **muscular system**, **skeletal system**, and **physiology**. The application is powered by Express.js, MongoDB, and features robust error handling with Winston logging.

---

## Features

- CRUD operations on anatomy data:
  - Muscular System
  - Skeletal System
  - Physiology
- Database connection check middleware to ensure MongoDB availability.
- Robust error handling and centralized logging with **Winston**.
- Route validation using **express-validator**.
- API seeding mechanisms for preloading data.

---

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** & **Mongoose**
- **dotenv** for environment configuration.
- **Winston** for structured and aggregated logging.

---

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **MongoDB** installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and specify the required environment variables:

   ```dotenv
   #express
   PORT3000=3000
   #mongodb
   PORT5000=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/human_anatomy?retryWrites=true&w=majority&appName=Cluster0
   ```

   Replace `<username>` and `<password>` with your MongoDB credentials.

4. Start the application:

   ```bash
   npm start
   ```

5. Navigate to the application:

   - **Home:** [http://localhost:3000](http://localhost:3000)
   - **Muscular System API:** [http://localhost:3000/api/ap/muscular_system](http://localhost:3000/api/ap/muscular_system)
   - **Skeletal System API:** [http://localhost:3000/api/ap/skeletal_system](http://localhost:3000/api/ap/skeletal_system)
   - **Physiology API:** [http://localhost:3000/api/ap/physiology](http://localhost:3000/api/ap/physiology)

---

## Folder Structure

```plaintext
<root>
├── config          # Configuration files (e.g., DB connection)
│   └── db.mjs
├── middlewares     # Middleware for error handling, logging, etc.
├── models          # Mongoose schemas/models
│   ├── muscular_system.mjs
│   ├── skeletal_system.mjs
│   └── physiology.mjs
├── routes          # API route definitions
├── public          # Static files (if applicable)
├── views           # EJS templates (if applicable)
├── .env            # Environment variables file
├── package.json    # Project dependencies and scripts
└── index.mjs       # Main application entry point
```

---

## Key Middleware

- **`checkDbConn` Middleware:**
  Ensures that the MongoDB connection is live. Responds with a `503 Service Unavailable` if the connection is lost.

- **`error_handler` Middleware:**
  A centralized error handler that logs errors using **Winston** and sends a structured error response to clients.

- **Validation Middleware:**
  User input is validated for consistency using **express-validator**.

---

## Database Connection

The project connects to a MongoDB instance using `db.mjs`, which is responsible for initializing a connection with error handling support. The connection string is configured via the `.env` file.

---

## Available API Routes

| Method | Endpoint                               | Description                  |
|--------|---------------------------------------|------------------------------|
| `GET`  | `/`                                   | Home page                   |
| `GET`  | `/api/ap/muscular_system`             | Fetch muscular system data  |
| `GET`  | `/api/ap/skeletal_system`             | Fetch skeletal system data  |
| `GET`  | `/api/ap/physiology`                  | Fetch physiology data       |
| `POST` | `/api/seed/all`                       | Delete all seeded data      |

---

## Winston Logging

All application-level logs (info, warnings, errors) are handled via the `winston_logger.mjs`, which formats logs into a readable timestamped structure and writes to:

- Console (in development)
- `logs/app.log` for persisting logs.

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/feature-name
   ```
3. Push to your fork and submit a pull request.

---

## License

This project is licensed under the [MIT License](./LICENSE).