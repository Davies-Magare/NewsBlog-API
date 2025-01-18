# Introduction
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
