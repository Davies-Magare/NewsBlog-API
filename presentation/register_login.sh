#!/bin/bash

# Register a New User
echo "Registering a new user..."
curl -s -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "Mary",
    "email": "mary@gmail.com",
    "password": "password456"
  }' | jq

# Login with the New User
echo "Logging in with new user..."
curl -s -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mary@gmail.com",
    "password": "password456"
  }' | jq
