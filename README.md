# NewsBlog API

**Overview**
The NewsBlog API is a backend API for a small blog application where users can register, log in, log out, create posts, comment on posts (their own or others'), follow users, review profiles (their own or others'), and delete posts and comments.

## Features
- **User Registration and Authentication:**
  - Users can register and log in to access protected routes using JWT tokens.
- **Post and Delete Comments:**
  - Users can create posts and delete them when needed.
- **Interact with Posts:**
  - Users can comment on their own posts or others' posts.
- **Follow Other Users:**
  - Users can follow and keep track of other users on the platform.
- **Administration Features:**
  - Administrators can delete any user or post and view a list of all users on the platform.

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Davies-Magare/NewsBlog-API.git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Server
```bash
npx nodemon server.js
```

---

## Documentation

The NewsBlog API follows REST conventions. This means you should use the following HTTP methods for appropriate actions:
- **GET:** Retrieve data
- **POST/PUT:** Create or modify data
- **DELETE:** Remove data

All API requests are made over HTTP.

### Response Format
Every response will be a JSON object containing the following keys:
- **success:** Indicates the result of the request (true/false).
- A second key, depending on the data being queried (e.g., `post`, `user`, `comment`).

### HTTP Response Codes
| Code | Meaning                      |
|------|------------------------------|
| 200  | **OK:** The request succeeded. |
| 201  | **Created:** A new resource was created. |
| 400  | **Bad Request:** Invalid request; try again. |
| 401  | **Unauthorized:** Authentication is required. |
| 403  | **Forbidden:** You do not have permission to access this resource. |
| 404  | **Not Found:** The requested resource does not exist. |
| 500  | **Server Error:** The service is unavailable. |

---

For further details about the API endpoints and their usage, please refer to the API documentation or inspect the codebase.


