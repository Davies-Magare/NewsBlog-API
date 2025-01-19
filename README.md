# NewsBlog API

## Overview
NewsBlog API is a backend API for a small blog app where users can:
- Register, login, and logout.
- Create posts, comment on their posts or others' posts.
- Follow other users.
- Review profiles (their own and others').
- Delete posts and comments.

Administrators can:
- Delete any user or post.
- View a list of all users.

## Features

- **User Registration and Authentication**: Users can register and log in with a JWT token to access protected routes.
- **Post Creation and Deletion**: Users can post news, views, or opinions on the platform.
- **Commenting System**: Users can comment on their own posts or on the posts of other users.
- **Follow System**: Users can follow other users on the platform.
- **Administrative Features**: Administrators can delete users and posts, as well as view all users on the platform.

---

## Project Architecture

```
├── README.md
├── controllers
│   ├── adminController.js
│   ├── authController.js
│   └── blogController.js
├── jwt.txt
├── middleware
│   └── authMiddleware.js
├── models
│   ├── Comment.js
│   ├── Follows.js
│   ├── Post.js
│   └── User.js
├── package-lock.json
├── package.json
├── routes
│   ├── adminRoutes.js
│   ├── authRoutes.js
│   ├── blogRoutes.js
│   └── indexRouter.js
└── server.js
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/Davies-Magare/NewsBlog-API.git
```

### Install dependencies

```bash
npm install
```

### Run the server

```bash
npx nodemon server.js
```

---

## Authentication

### Register and Login
Users must first register and log in to obtain a JWT token. The token should be included in the `Authorization` header as a Bearer token for accessing protected routes.

### Using the Token
After successfully logging in, you will receive a JWT token. Use this token to access protected routes by adding it to the `Authorization` header in the following format:

```http
Authorization: Bearer <your_token_here>
```
For example:

```http
Authorization: Bearer abc123xyz456
```
This token authenticates your requests to the server and allows access to restricted resources.

### Protected Routes
The following routes are protected by JWT:

#### Admin Routes
```http
GET /admin/users
DELETE /admin/users/{user_id}
DELETE /admin/posts/{post_id}
```

#### Auth Routes
```http
POST /auth/register
POST /auth/login
GET /auth/logout
GET /auth/profile
```

#### Blog Routes
```http
POST /blog/post
PUT /blog/post
GET /blog/posts
GET /blog/post/{post_id}
POST /blog/post/{post_id}/comment
GET /blog/post/{post_id}/comments
GET /blog/comment/{comment_id}
POST /blog/users/{user_id}/follow
GET /blog/me/profile
GET /blog/me/posts
GET /blog/user/{user_id}/posts
GET /blog/user/{user_id}/profile
```

---

## Documentation

The NewsBlog API follows REST conventions. This means you should use:
- **GET** requests to retrieve data.
- **POST** and **PUT** to modify data.
- **DELETE** to remove data.

All API requests are done over HTTP.

### Response Format
Every response is a JSON object with the key **success** to indicate the result of the request, and a second key whose name depends on the data being queried (e.g., "post", "user", "comment").

### HTTP Response Codes
- **200 - OK**: The request has succeeded.
- **201 - Created**: A new resource has been created.
- **400 - Bad Request**: The request is invalid. Try again.
- **401 - Unauthorized**: The request requires authentication, which the user did not provide.
- **403 - Forbidden**: You are not allowed to access this resource.
- **404 - Not Found**: The requested resource does not exist.
- **500 - Server Error**: The service is unavailable.

---

## API Endpoints

### Auth Routes

- **POST /auth/register**: Create a new user account. 
  - **Body Parameters**: 
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **POST /auth/login**: Authenticate a user and return a JWT token.
  - **Body Parameters**:
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **GET /auth/logout**: Log out the current user.

- **GET /auth/profile**: Get the profile of the authenticated user.

---

### Admin Routes

- **GET /admin/users**: Retrieve a list of all users.
- **DELETE /admin/users/{user_id}**: Delete a user by ID.
- **DELETE /admin/posts/{post_id}**: Delete a post by ID.

---

### Blog Routes

- **POST /blog/post**: Create a new post.
  - **Body Parameters**:
    ```json
    {
      "title": "string",
      "content": "string"
    }
    ```

- **PUT /blog/post**: Update an existing post.
  - **Body Parameters**:
    ```json
    {
      "id": "string",
      "title": "string",
      "content": "string"
    }
    ```

- **GET /blog/posts**: Retrieve a list of all posts.
- **GET /blog/post/{post_id}**: Retrieve a specific post by ID.
- **POST /blog/post/{post_id}/comment**: Add a comment to a specific post.
  - **Body Parameters**:
    ```json
    {
      "content": "string",
      "author": "string",
    }
    ```

- **GET /blog/post/{post_id}/comments**: Retrieve all comments for a specific post.
- **GET /blog/comment/{comment_id}**: Retrieve a specific comment by ID.
- **POST /blog/users/:id/follow**: Follow a user by ID.
- **GET /blog/me/profile**: Retrieve the profile of the authenticated user.
- **GET /blog/me/posts**: Retrieve all posts created by the authenticated user.
- **GET /blog/user/{user_id}/posts**: Retrieve all posts created by a specific user.
- **GET /blog/user/{user_id}/profile**: Retrieve the profile of a specific user.

### Contributors

---
Davies Magare {davieskamanda@gmail.com}
