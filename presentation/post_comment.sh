#!/bin/bash

# Assuming the token from register_and_login.sh has been retrieved and saved
TOKEN="your_jwt_token_here"  # Replace this with the token from the first file

# Create a New Blog Post
echo "Creating a new blog post..."
curl -X POST http://localhost:5000/blog/post \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "A New Beginning",
    "content": "This is the content of Jane\'s new blog post. Welcome to my first post!",
    "tags": ["introduction", "first post"]
  }' | jq

# Update the Blog Post
echo "Updating the blog post..."
curl -X PUT http://localhost:5000/blog/post \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "A New Beginning - Updated",
    "content": "Updated content for Jane\'s blog post. I have new thoughts to share!",
    "author": "677f9c0a762b108e6d97524b"
  }' | jq

# Add a Comment to the Blog Post
echo "Adding a comment to the blog post..."
curl -X POST http://localhost:5000/blog/post/678f7e9c8723d14d4f1e58ab/comment \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is a great post! I really enjoyed reading it."
  }' | jq

# Get All Comments on the Post
echo "Fetching all comments on the post..."
curl -X GET http://localhost:5000/blog/post/678f7e9c8723d14d4f1e58ab/comments | jq

