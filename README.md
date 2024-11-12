# Delivery APIs Implementation

This document outlines the implementation of the delivery APIs in the backend using Node.js, TypeScript, Express, and MySQL.

## Technologies Used
- **Node.js**: A JavaScript runtime environment for server-side development.
- **TypeScript**: A superset of JavaScript that adds optional static typing to the language.
- **Express**: A popular web application framework for Node.js, used for building the API endpoints.
- **MySQL**: A relational database management system for storing and managing delivery-related data.
- **Jest**: A JavaScript testing framework for unit testing.
- **Supertest**: A library for testing HTTP servers using Express.
- **Express Validator**: A set of express.js middlewares that wraps the validator.js library, used for input validation.
- **JWT**: JSON Web Tokens for authentication and authorization.

## API Endpoints

1. **Register API**:
   - Functionality: Registers a new user with the provided username, email, and password.
   - Input Validation: Checks for the presence and validity of the required fields.
   - Authentication: No authentication required.

2. **Login API**:
   - Functionality: Authenticates a user and returns a JWT token.
   - Input Validation: Checks for the presence and validity of the email and password.
   - Authentication: No authentication required.

3. **Calculate Charges API**:
   - Functionality: Calculates the delivery charges based on the distance, package weight, dimensions, and type.
   - Input Validation: Checks for the presence and validity of the required fields (pickup location, drop location, package details).
   - Authentication: Requires a valid JWT token.

4. **Book Delivery API**:
   - Functionality: Books a delivery with the provided pickup and drop locations.
   - Input Validation: Checks for the presence and validity of the required fields (pickup location, drop location, package details).
   - Authentication: Requires a valid JWT token.

5. **Cancel Delivery API**:
   - Functionality: Cancels a delivery before it is picked up.
   - Input Validation: Checks for the presence and validity of the delivery ID.
   - Authentication: Requires a valid JWT token and checks if the user is the one who booked the delivery.

6. **Get Order Status API**:
   - Functionality: Retrieves the status of a delivery.
   - Input Validation: Checks for the presence and validity of the delivery ID.
   - Authentication: Requires a valid JWT token.

## Input Validation

Input validation is performed using the `express-validator` middleware. It checks for the presence and validity of the required fields in each API request. If any validation fails, the API returns an appropriate error message.

## Authentication and Authorization

The APIs use JWT (JSON Web Tokens) for authentication and authorization. The `register` and `login` APIs do not require authentication, but all other APIs require a valid JWT token in the `Authorization` header.

Additionally, All API checks if the user making the request is the one who booked the delivery.

## Unit Tests

I have written unit tests for the APIs using Jest and Supertest. 

## API Documentation

I have generated the API documentation using Postman. 

Collection Link: https://drive.google.com/file/d/1c5iBuAgXT1Tt9FBY-usFd5WOS_X7jzHx/view?usp=sharing
Postman Documentation Link: https://documenter.getpostman.com/view/14823266/2sAY545det#3446a41b-eb51-49ca-ba09-ecefb4d57924 

## Project Setup Steps

- Clone the repository in your local.
- Setup mySQL DB by running https://github.com/Kamal-2500/Delivery-System/blob/main/delivery_system-db-schema.sql
- modify DB configurations in https://github.com/Kamal-2500/Delivery-System/blob/main/.env.development
- Run the project using : `npm run dev`
- To run the testcases, use command : `npm run test:auth` / `npm run test:calculateCharges` / `npm run test:bookDelivery` / `npm run test:cancelDelivery`
