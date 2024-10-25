# FinGrow

FinGrow is a personal finance management application that enables users to track income, manage expenses, set and monitor savings goals and make transactions. The application provides detailed financial reports, budget tracking, and alerts to keep users informed of their financial health.

## Features

1. **User Authentication :**  

   Users can register and log in to the application with secure credentials.
   
2. **Transaction Management:**  
   Users can store, view, and manage all their transactions, including income and expenses.

3. **Budget Management:**  
   Users can set and update budgets, monitor spending by category, and track how much of their budget has been spent.

4. **Savings Goals:**  
   Users can set savings goals, contribute towards them, and track progress over time.

5. **Financial Reports:**  
   Generate detailed reports showing total income, expenses, budget usage, and progress towards savings goals over specified time periods.

6. **Alerts and Notifications:**  
   Receive alerts when spending exceeds budget limits or when savings goals are close to being achieved.

7. **Data Persistence:**  
   All user data, including transactions, budgets, and savings goals, is stored securely in a MongoDB database.

## Table of Contents

- ### [Tech stack](#tech-stack)
- ### [System Requirements](#system-requirements)
- ### [Installation](#installation)
- ### [Usage](#usage)

# Tech Stack

- **TypeScript**: Ensures type safety during development.
- **Jest**: Used for unit testing.
- **MongoDB**: Database used to store user data and transactions.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.

## System Requirements

1. Install Node.js on macOS.

   ```bash
   brew install node
   ```
2. Install watchman on macOS 
   ```bash
   brew install watchman
   ```
3. Install MongoDB in MacOS, run following commands

   -  Install MongoDB, run the  command
      
      ```
      brew install mongodb-community@latest
      ```
   -  Run MongoDB as a macOS service
      
      ```
      brew services start mongodb-community
      ```
## Installation
#### Clone the Repo
   
   ```bash
   git clone -b fingrow-part-3 https://github.com/varun-everest/testing-fingrow
   ```
#### Install dependencies:
   - In Frontend : 

      ```bash
      cd frontend
      ```
   - Run following.

      ```bash
      npm install
      ```
   - Go Backend
      
      ```bash
      cd backend
      ```
   - Run following command.
      
      ```bash
      npm install
      ```
## Usage
- In order to Run the backend tests, follow the below commands
    
    ```bash
    cd backend
    npm  test
   ```
- In order to run the frontend tests, follow the below commands
    ```bash
    cd frontend
   npm test
   ```
- In order to run the backend, follow the below commands
      
    ```bash
    cd backend
    npm start
    ```
  

- In order to start application, follow the below commands
      
    ```bash
    cd frontend
   
    npm start
    ```

### If you have any queries, feel free to reach out
```bash
   Email: varunkumar.martha@everest.engineering
```

### Thank You!! 🙏