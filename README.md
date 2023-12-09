# Campus Cuisine - Hostel Management System || [Live Site](https://campus-cuisine.firebaseapp.com)

## Overview

Welcome to the University Hostel Management Website, a robust platform developed using the MERN (MongoDB, Express.js, React, Node.js) stack. This project aims to streamline meal services for university students living in hostels. The website incorporates a variety of features, including user authentication, meal requests, meal exploration, and comprehensive admin functionalities for efficient management.

## Technologies Utilized

- **Frontend:**
  - React.js
  - React-Router
  - React-Query
  - React-Hook-Form
  - Stripe API for payments
  - Infinite scrolling for dynamic content loading
  
- **Backend:**
  - Node.js with Express.js
  - MongoDB for data storage
  - JSON Web Tokens (JWT) for authentication
  - Express-Validator for server-side validation

## Project Structure

The project is meticulously organized into distinct components, each dedicated to specific functionalities. Key components include:

- **Client:**
  - **src/components:** React components for various sections (Homepage, Meals, Membership, Meal Detail, etc.)
  - **src/pages:** Individual pages defining the user interface
  - **src/hooks:** Custom hooks for state management and logic
  
- **Server:**
  - **routes:** Express routes for API endpoints
  - **controllers:** Business logic controllers
  - **models:** MongoDB models for data storage
  - **middlewares:** Functions for authentication and validation
  - **config:** Configuration files, including Stripe API keys

## Key Features

### Homepage

- Responsive design for mobile, tablet, and desktop
- User-friendly navbar with profile picture and dropdown menu
- Banner section with a slider, heading, short description, and search input
- Meals by category section with a tab system and meal cards

### Membership Section

- Display membership packages (Silver, Gold, Platinum) with different prices
- Redirect to the checkout page for payment when clicking on a package

### Meal Detail Page

- Show detailed information about a meal, including image, admin/distributor details, description, ingredients, etc.
- Like and meal request buttons for logged-in users
- Reviews section with the ability to like and submit reviews

### Meals Page

- Display all meals with search functionality
- Filter meals by category and price range
- Implement infinite scrolling for dynamic loading

### Upcoming Meals

- Show upcoming meals with like functionality

### Checkout Page

- Private route for purchasing premium packages
- Display package details and implement Stripe payment method
- Grant badges based on the purchased package

### Join Us Page (Login/Register)

- Implement user authentication with login and register forms
- Add social login options
- Award a Bronze Badge to users upon their first registration

### User Dashboard

- Private route for the user's dashboard with multiple sections (Profile, Requested Meals, My Reviews)
- Display user information and badges based on registration and membership

### Admin Dashboard

- Private route for the admin's dashboard with sections (Admin Profile, Manage Users, Add Meal, All Meals, All Reviews, Serve Meals, Upcoming Meals)
- Manage users, add meals, and handle upcoming and requested meals
- Implement JWT for admin login and store the token

## Bonus Tasks

- Implemented JWT for admin login and stored the token securely.
- Implemented pagination for all tables with 10 entries per page.
- Credentials are hidden from both client and server Git repositories.

## Conclusion

The University Hostel Management Website provides an intuitive and efficient platform for students to access and request meals. With a sleek interface, robust authentication, and advanced features, the website caters to the needs of both users and administrators. This README.md file includes detailed instructions for installation, technologies used, and a comprehensive overview of the project's features and structure.
