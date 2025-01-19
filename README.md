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


