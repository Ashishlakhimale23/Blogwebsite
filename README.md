# Blogging Website

## Overview

Welcome to the Blogging Website, a comprehensive platform designed for users to create, manage, and explore blog content. Built with MERN stack (MongoDB, Express.js, React.js, and Node.js), this website offers a seamless and interactive user experience for both bloggers and readers.

### Key Functionalities:

1. **User Authentication and Authorization**:
   - **Sign Up and Log In**: New users can create an account, and existing users can log in securely using JWT (JSON Web Token) for authentication.
   - **Profile Management**: Users can manage their profiles, update personal information.

2. **Blog Management**:
   - **Create and Upload Blogs**: Users can compose and publish blogs with rich content and images. Cloudinary is integrated to handle image uploads efficiently.
   - **Edit and Delete Blogs**: Bloggers have the flexibility to update their published content or remove blogs that are no longer relevant.
   - **Drafts**: Save blogs as drafts for future editing and publishing, allowing for content development over time.

3. **User Interaction**:
   - **Bookmarking**: Users can bookmark blogs they like for easy access later.
   - **Searching**: Search functionality to find blogs by title, content, or author, and to discover other users on the platform.

4. **Frontend Data Validation**:
   - **Joi Validation**: Ensures data integrity and user input validation on the frontend, providing a secure and robust user experience.

### Technology Stack:

- **Frontend**:
  - React.js: A JavaScript library for building user interfaces.
  - Joi: A validation library used for ensuring data integrity.

- **Backend**:
  - Node.js: A JavaScript runtime for server-side programming.
  - Express.js: A web application framework for Node.js.
  - MongoDB: A NoSQL database for storing user and blog data.
  - JWT: Used for secure user authentication.

## Features

- User Authentication: Secure login and registration system using JWT.
- Blog Management: Create, edit, delete, and draft blogs with image uploads.
- User Interaction: Bookmark favorite blogs and search for blogs and users.
- Data Validation: Frontend data validation using Joi.

## Installation

### Prerequisites

- Node.js
- npm or yarn
- MongoDB
- Cloudinary account

### Steps

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Ashishlakhimale23/Blog-website.git
    cd Blog-website
    ```

2. **Install dependencies for both frontend and backend**:
    ```sh
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the `backend` directory and add the following:
    ```env
    DBURL=your_mongo_db_uri
    SECRET_KEY=your_jwt_secret
    REFRESH_KEY=your_refresh_secret
    ```
    
    Create a `.env` file in the `frontend` directory and add the following:
    ```env
    CLOUDINARY_NAME=your_cloudinary_cloud_name
    API_KEY=your_cloudinary_api_key
    UPLOAD_PRESET=your_cloudinary_UPLOAD_PRESET
    BASE_URL=base_url_to_hit_the_backend_api(ie.http://localhost:8000/user)
    ```
    

4. **Run the application**:
    ```sh
    # Run backend
    cd backend
    npm start

    # Run frontend
    cd ../frontend
    npm run dev
    ```

    The backend server will start on `http://localhost:8000` and the frontend on `http://localhost:5173`.

## Usage

1. **Sign Up / Log In**:
   - Create a new account or log in with existing credentials.

2. **Create a Blog**:
   - Navigate to the blog creation page.
   - Upload images (images will be stored on Cloudinary).
   - Write and publish your blog.

3. **Manage Blogs**:
   - Edit or delete your blogs.
   - Save blogs as drafts and edit them later.

4. **User Interaction**:
   - Bookmark blogs that you like.
   - Search for blogs and users using the search feature.

