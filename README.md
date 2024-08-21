
# API Documentation

## Base URL

```
http://localhost:3000
```

## Endpoints

### 1. **Create a User**

- **Endpoint**: `POST /users`
- **Description**: Creates a new user with the provided name.
- **Request Body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Response**:
  - **Status Code**: `201 Created`
  - **Body**:
    ```json
    {
      "_id": "string",
      "name": "string",
    }
    ```
- **Error Responses**:
  - **Status Code**: `400 Bad Request`
    - **Body**:
      ```json
      {
        "message": "User name is required"
      }
      ```
  - **Status Code**: `500 Internal Server Error`
    - **Body**:
      ```json
      {
        "message": "Error creating user",
        "error": "string"
      }
      ```

### 2. **Retrieve Users**

- **Endpoint**: `GET /users`
- **Description**: Retrieves a list of users, optionally sorted by a specified field.
- **Query Parameters**:
  - `sortBy`: Field to sort by (default: `name`).
  - `sortOrder`: Sort order (`asc` or `desc`, default: `asc`).
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    [
      {
        "_id": "string",
        "name": "string",
      }
    ]
    ```
- **Error Responses**:
  - **Status Code**: `404 Not Found`
    - **Body**:
      ```json
      {
        "message": "No users found"
      }
      ```
  - **Status Code**: `400 Bad Request`
    - **Body**:
      ```json
      {
        "message": "Invalid sort field"
      }
      ```
  - **Status Code**: `500 Internal Server Error`
    - **Body**:
      ```json
      {
        "message": "Error retrieving users",
        "error": "string"
      }
      ```

### 3. **Retrieve User by ID**

- **Endpoint**: `GET /users/:id`
- **Description**: Retrieves a user by their ID.
- **URL Parameters**:
  - `id`: The ID of the user to retrieve.
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "_id": "string",
      "name": "string",
    }
    ```
- **Error Responses**:
  - **Status Code**: `404 Not Found`
    - **Body**:
      ```json
      {
        "message": "User not found"
      }
      ```
  - **Status Code**: `500 Internal Server Error`
    - **Body**:
      ```json
      {
        "message": "Error retrieving user",
        "error": "string"
      }
      ```

### 4. **Update User by Name**

- **Endpoint**: `PUT /users`
- **Description**: Updates a user’s name based on their old name.
- **Query Parameters**:
  - `oldName`: The current name of the user to update.
- **Request Body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "_id": "string",
      "name": "string",
    }
    ```
- **Error Responses**:
  - **Status Code**: `400 Bad Request`
    - **Body**:
      ```json
      {
        "message": "Old name and new name are required"
      }
      ```
  - **Status Code**: `404 Not Found`
    - **Body**:
      ```json
      {
        "message": "User not found"
      }
      ```
  - **Status Code**: `500 Internal Server Error`
    - **Body**:
      ```json
      {
        "message": "Error updating user",
        "error": "string"
      }
      ```

### 5. **Update User by ID**

- **Endpoint**: `PUT /users/:id`
- **Description**: Updates a user’s name based on their ID.
- **URL Parameters**:
  - `id`: The ID of the user to update.
- **Request Body**:
  ```json
  {
    "name": "string"
  }
  ```
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "_id": "string",
      "name": "string",
    }
    ```
- **Error Responses**:
  - **Status Code**: `400 Bad Request`
    - **Body**:
      ```json
      {
        "message": "New name is required"
      }
      ```
  - **Status Code**: `404 Not Found`
    - **Body**:
      ```json
      {
        "message": "User not found"
      }
      ```
  - **Status Code**: `500 Internal Server Error`
    - **Body**:
      ```json
      {
        "message": "Error updating user",
        "error": "string"
      }
      ```

### 6. **Delete User by Name**

- **Endpoint**: `DELETE /users`
- **Description**: Deletes a user based on their name.
- **Query Parameters**:
  - `name`: The name of the user to delete.
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "message": "User deleted successfully",
      "deletedUser": {
        "_id": "string",
        "name": "string",
      }
    }
    ```
- **Error Responses**:
  - **Status Code**: `400 Bad Request`
    - **Body**:
      ```json
      {
        "message": "User name is required"
      }
      ```
  - **Status Code**: `404 Not Found`
    - **Body**:
      ```json
      {
        "message": "User not found"
      }
      ```
  - **Status Code**: `500 Internal Server Error`
    - **Body**:
      ```json
      {
        "message": "Error deleting user",
        "error": "string"
      }
      ```

### 7. **Delete User by ID**

- **Endpoint**: `DELETE /users/:id`
- **Description**: Deletes a user based on their ID.
- **URL Parameters**:
  - `id`: The ID of the user to delete.
- **Response**:
  - **Status Code**: `200 OK`
  - **Body**:
    ```json
    {
      "message": "User deleted successfully",
      "deletedUser": {
        "_id": "string",
        "name": "string",
      }
    }
    ```
- **Error Responses**:
  - **Status Code**: `404 Not Found`
    - **Body**:
      ```json
      {
        "message": "User not found"
      }
      ```
  - **Status Code**: `500 Internal Server Error`
    - **Body**:
      ```json
      {
        "message": "Error deleting user",
        "error": "string"
      }
      ```

## Running the API Locally

1. **Clone the Repository**

   Clone your repository to your local machine if you haven’t already:

   ```bash
   git clone git@github.com:entsoereng/InternPulse-Project1.git
   cd user-management-system
   ```

2. **Install Dependencies**

   Install the necessary dependencies using npm:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   If your application requires environment variables, create a `.env` file in the root directory of your project. Populate it with the required variables.

4. **Run the API**

   Start the server with:

   ```bash
   nodemon run start
   ```

   This command will run the server, usually using a script defined in `package.json`.

5. **Run Unit Tests**

   To run unit tests, use:

   ```bash
   npm test
   ```

   This will execute all the test files configured in your Jest setup.

6. **Stop the Server**

   To stop the server, you can press `Ctrl + C` in your terminal.

## Additional Notes

- Make sure MongoDB (or your chosen database) is properly set up and running if you are not using an in-memory database for testing.
- Ensure that your server is configured to listen on the correct port (default is usually 3000).

---

## Author
- Mokonyana Emmanuel Ntsoereng
