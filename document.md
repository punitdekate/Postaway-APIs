
### API Documentation Overview

This section outlines the RESTful API endpoints available in the application, including methods, request parameters, and example responses for the Users, Posts, Likes, and Comments ,friendship , otp features. Authentication is required for Posts, Likes, and Comments APIs, as indicated by the use of auth middleware.

### Users API

User API Documentation
Below is the documentation for the User API
Base URL
All URLs referenced below are relative to the base URL of the API, which is not specified in the provided code. You will need to prepend the base URL to these endpoints.
Authentication
Some endpoints require authentication. This is noted in their descriptions. The authentication method used is JWT, as indicated by the use of the auth middleware.
Endpoints
1. User Sign In
•	Method: POST
•	Endpoint: /signin
•	Description: Allows a user to sign in to their account.
•	Body Parameters: Not specified, but typically includes username and password.
•	Authentication Required: No
2. User Sign Up
•	Method: POST
•	Endpoint: /signup
•	Description: Allows a new user to create an account.
•	Body Parameters: Not specified, but typically includes user details such as username, email, and password.
•	Authentication Required: No
3. User Logout (Current Device)
•	Method: GET
•	Endpoint: /logout
•	Description: Logs out a user from the currently logged-in device.
•	Authentication Required: Yes
4. User Logout (All Devices)
•	Method: GET
•	Endpoint: /logout-all-devices
•	Description: Logs out a user from all devices they are currently logged into.
•	Authentication Required: Yes
5. Get Specific User Details
•	Method: GET
•	Endpoint: /get-details/:userId
•	Description: Retrieves details for a specific user, identified by userId.
•	URL Parameters: userId - The ID of the user whose details are being requested.
•	Authentication Required: Yes
6. Get All Users Details
•	Method: GET
•	Endpoint: /get-all-details
•	Description: Retrieves details for all users.
•	Authentication Required: Yes
7. Update User Details
•	Method: PUT
•	Endpoint: /update-details/:userId
•	Description: Allows updating details for a specific user, identified by userId.
•	URL Parameters: userId - The ID of the user whose details are being updated.
•	Body Parameters: Not specified, but typically includes the details to be updated.
•	Authentication Required: Yes

### Post API
1 .Retrieve All Posts
•	Endpoint: GET /all
•	Description: Fetches all the posts available.
•	Handler: postsController.allPosts
•	Retrieve a Specific Post
•	Endpoint: GET /:postId
•	Description: Fetches a specific post by its postId.
•	Handler: postsController.getPost
2 .Create a New Post
•	Endpoint: POST /
•	Description: Creates a new post. This endpoint expects multipart/form-data for the imageUrl field(s).
•	Middleware: upload.array('imageUrl') - Handles file uploading.
•	Handler: postsController.addPost
3 .Retrieve User Posts
•	Endpoint: GET /
•	Description: Fetches posts related to a specific user. The exact mechanism of how the user is determined is not specified in the provided code snippet.
•	Handler: postsController.userPosts
4 .Delete a Post
•	Endpoint: DELETE /:postId
•	Description: Deletes a specific post identified by postId.
•	Handler: postsController.removePost
5 .Update a Post
•	Endpoint: PUT /:postId
•	Description: Updates a specific post identified by postId. This endpoint also expects multipart/form-data for the imageUrl field(s), allowing for image updates.
•	Middleware: upload.array('imageUrl') - Handles file uploading.
•	Handler: postsController.updatePost

### Otp API
1. Send OTP
•	Endpoint: /send
•	Method: POST
•	Description: This API is used to send an OTP to a user. It triggers the sendOtp method in the OtpController.
2. Verify OTP
•	Endpoint: /verify
•	Method: POST
•	Description: This API is used to verify the OTP submitted by the user. It calls the verifyOtp method in the OtpController.
3. Reset Password
•	Endpoint: /reset-password
•	Method: POST
•	Description: This API allows users to reset their password using an OTP. It utilizes the resetPassword method in the OtpController.
•	Request Body: The request body is expected to include the OTP, the new password, and any other required identifiers (such as user ID or email).

### Like API
1. Get All Likes for a Post
•	Endpoint: GET /:postId
•	Description: Retrieves all likes associated with a specific post.
•	Parameters:
•	postId: Path parameter; the unique identifier of the post for which likes are being retrieved.
2. Toggle Like
•	Endpoint: GET /toggle/:id
Description: Toggles the like status for a specific item (e.g., a post or comment) for the current user. If the user has already liked the item, this call will unlike it, and vice versa.
Parameters:

### Friendship API

1. Toggle Friendship
•	Endpoint: /toggle-friendship/:userId
•	Method: GET
•	Auth Required: Yes
•	Description: This endpoint allows a user to toggle (add or remove) a friendship with another user specified by userId. The operation (add or remove) depends on the current state of the friendship.
•	Parameters:
•	userId: Path parameter indicating the ID of the user with whom the friendship is to be toggled.
•	Usage: GET /toggle-friendship/12345
2. Get Friends List
•	Endpoint: /get-friends/:userId
•	Method: GET
•	Auth Required: Yes
•	Description: Retrieves a list of friends for the user specified by userId. This can include all current friends of the user.
•	Parameters:
•	userId: Path parameter indicating the ID of the user whose friends list is requested.
•	Usage: GET /get-friends/12345
3. Get Pending Requests
•	Endpoint: /get-pending-requests
•	Method: GET
•	Auth Required: Yes
•	Description: Fetches a list of pending friendship requests for the authenticated user. This can be used to display incoming friendship requests that the user has not yet responded to.
•	Parameters: None
•	Usage: GET /get-pending-requests
4. Respond to Friendship Request
•	Endpoint: /response-to-request/:userId
•	Method: GET
•	Auth Required: Yes
•	Description: Allows the authenticated user to respond to a friendship request from another user specified by userId. The response could be an acceptance or rejection of the friendship request.
•	Parameters:
•	userId: Path parameter indicating the ID of the user whose friendship request is being responded to.
•	Usage: GET /response-to-request/12345
Each of these endpoints requires the user to be authenticated, as indicated by the presence of the auth middleware.

### Comments API

1 .Get All Comments for a Post
•	Method: GET
•	URL: /:postId
•	Description: Retrieves all comments associated with a specific post.
•	Parameters:
•	postId: The ID of the post for which comments are being requested.
•	Handler Function: getPostAllComments
•	Controller: CommentsController
2 .Add a Comment to a Post
•	Method: POST
•	URL: /:postId
•	Description: Allows adding a new comment to a specific post.
•	Parameters:
•	postId: The ID of the post to which the comment is being added.
•	Request Body: Expected to contain the details of the comment to be added.
•	Handler Function: addComment
•	Controller: CommentsController
3 .Delete a Comment
•	Method: DELETE
•	URL: /:commentId
•	Description: Deletes a specific comment.
•	Parameters:
•	commentId: The ID of the comment to be deleted.
•	Handler Function: deleteComment
•	Controller: CommentsController
4 .Update a Comment
•	Method: PUT
•	URL: /:commentId
•	Description: Updates the content of an existing comment.
•	Parameters:
•	commentId: The ID of the comment to be updated.
•	Request Body: Expected to contain the updated details of the comment.
•	Handler Function: updateComment
•	Controller: CommentsController
•	Each of these endpoints is designed to facilitate the creation, retrieval, updating, and deletion of comments on posts, making the management of comments straightforward and efficient.


