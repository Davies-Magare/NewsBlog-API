**Overview**
NewsBlog API is a backend api for a small blog app where users can register, login, logout, make a post, comment on 
their post or someone else's post, follow other users, review their profiles or their own profiles, and delete posts
and comments.

**Features**
* **User Registration and Authentication:** Users can register, and login with a jwt token to access protected routes
* **Post and delete comments:** Users can post news, views or opinions on the platform
* **Comment on different posts:** Users can comment on their own posts or on the posts of other users
* **Follow other Users:** Users can follow other users on the platform
* **Adminstration Features:** The adminstrator can delete any user and any posts. They can also view a list of all users on the platform
 
**Installation**
**Clone the repository**
___
```
git clone https://github.com/Davies-Magare/NewsBlog-API.git
```
___
**Install dependencies**
``` 
npm install
```
___
***Run the server**
```
npx nodemon server.js
```
___

Documentation

The NewsBlog API follows rest conventions. This means you should use GET requests to retrieve data, POST and PUT to modify data and DELETE
to delete data. All API requests are done over HTTP.

Every response will be a JSON object with the key **success** to indicate the result of the request, and a second key whose name depends on
the data being queried--post, user, comment.

HTTP response codes indicate the status of the request:  
**200** - **Ok**: The request has succeeded  
**201** - **Created**: The request has been fulfilled and a new resource has been created  
**400** - **Bad Request**: The request is invalid. Try again  
**401** - **Unauthorized**:  The request requires authentication, which the user did not provide.  
**403** - **Forbidden**: You are not allowed to access this resource.  
**500** - **Server Error**: The service is Unavailable.  
**404** - **Not Found**: The requested resource does not exist  

Installation
Clone the repository
Run npm install


