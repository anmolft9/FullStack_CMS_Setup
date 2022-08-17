# Api server for the ecommerce admin cms

Here is the repo for the frontend app....

## APIs

All the api end points will follow the follwiung patterns `{rootUrl}/api/v1`

### Admin user api

This api endpoint is responsible for handling all the admin user related requests.js

All the Admin end points will follow the followig patterns `{rootUrl}/api/v1/admin-user`

| #   | PATH            | METHOD | PRIVATE | DESCRIPTION                                                                                                                                                                              |
| --- | --------------- | ------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.  | `/`             | POST   | No      | Recieves new admin data and create new admin in our databas. If admin user's email already exist, it will return error otherwise it will return success with the user info from database |
| 2.  | `/verify-email` | PATCH  | No      | Recieves `email, verificationCode` to verify newly created user action, return success or error accordingly.                                                                             |
| 3.  | `/login`        | POST   | No      | Recieves 1 `{email, password}` and checks if the user already exists for that combination in our database, if it does, i will handle all the login process                               |
