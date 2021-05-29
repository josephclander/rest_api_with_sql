# Creating a REST API

In this project assignment from Team Treehouse, you’ll create a REST API using Express. This API will provide a way to administer a school database containing information about users and courses. Users can interact with the database to create new courses, retrieve information on existing courses, and update or delete existing courses. To make changes to the database, users will be required to log in so the API will also allow users to create a new account or retrieve information on an existing account.

# Table of Contents

[How to Run the Project](#How-to-Run-the-Project)

[Instructions](#instructions)

[Extra Credit Instructions](#extra-credit-instructions)

## How to Run the Project

## Instructions

1. Getting Started with the Project Files

   - If you haven’t already, download the project's starter files, unzip them, add them to your project folder, and push them to your GitHub repo.
   - Open the project in your text editor and navigate to the root directory of the project in the terminal.
   - Make sure that the `node_modules` folder is listed in the `.gitignore` file.
   - Run the `npm install` command in the terminal to install the project dependencies.
   - Run the `npm run seed` command in the terminal. This will create the `fsjstd-restapi.db` database and seed it with initial data. **Pro Tip:** You can use [DB Browser](https://sqlitebrowser.org/) to test that the `fsjstd-restapi.db` database has been properly created and seeded.
   - Use the `npm start` command in the terminal to launch the application and go to `http://localhost:5000/` to make sure the app is working properly. You should see a “Welcome to the REST API project!” message.

2. Database Configuration

   - Install [Sequelize](https://sequelize.org/).
   - Install the [Sequelize CLI](https://www.npmjs.com/package/sequelize-cli).
   - Initialize the project using the `npx sequelize init` command.
   - Update the `development` environment object of the `config.js` file so that the storage key has a value of "fsjstd-restapi.db" and `dialect` key has a value of "sqlite".
   - Use Sequelize's `authenticate` function to test the database connection. A message should be logged to the console informing the user that the connection was successful or that there was an error.

3. Define the Models
   - This project will contain two models. One for the `Users` table and another for the `Courses` table.
   - The `User` model should include the following attributes set to the correct data type:
     - firstName (`String`)
     - lastName (`String`)
     - emailAddress (`String`)
     - password (`String`)
   - The Course model should include the following attributes set to the correct data type:
     - title (`String`)
     - description (`Text`)
     - estimatedTime (`String`)
     - materialsNeeded (`String`)
     - userId (created in the model associations with the foreignKey property, and equals the id from the `Users` table)

**Pro Tip:** When defining models for an existing database the model names and attributes need to match the tables in the database _exactly_ otherwise Sequelize will throw an error.

4.  Define Model Associations

    - In the `Users` model, add a one-to-many association between the User and Course models using the `hasMany()` method.
    - In the `Courses` model, add a one-to-one association between the Course and User models using the `belongsTo()` method.

5.  Create the User Routes

    - Create the following routes:
      - A `/api/users` `GET` route that will return the currently authenticated user along with a 200 HTTP status code.
      - A `/api/users` `POST` route that will create a new user, set the `Location` header to "/", and return a `201` HTTP status code and no content.

6.  Create the Courses Routes

    - Create the following routes:
      - A `/api/courses` `GET` route that will return a list of all courses including the User that owns each course and a `200` HTTP status code.
      - A `/api/courses/:id` `GET` route that will return the corresponding course along with the User that owns that course and a `200` HTTP status code.
      - A `/api/courses` `POST` route that will create a new course, set the Location header to the URI for the newly created course, and return a `201` HTTP status code and no content.
      - A `/api/courses/:id` `PUT` route that will update the corresponding course and return a `204` HTTP status code and no content.
      - A `/api/courses/:id` `DELETE` route that will delete the corresponding course and return a `204` HTTP status code and no content.

7.  Add Validations

    - When a new user is created using the /api/users POST route the application should include validation to ensure that the following required values are properly submitted in the request body:
      - firstName
      - lastName
      - emailAddress
      - password
    - When a new course is created using the `/api/courses` `POST` route the application should include validation to ensure that the following required values are properly submitted in the request body:
      - title
      - description
    - When an existing course is updated using the `/api/courses` `PUT` route the application should include validation to ensure that the following required values are properly submitted in the request body:
      - title
      - description
    - If any of these required values are not properly submitted, the application should respond by sending a `400` HTTP status code and validation errors.

8.  Password Security
    For security reasons, we don't want to store user passwords in the database as clear text.

    - When a new user is created using the `/api/users` `POST` route the user's password should be hashed before persisting the user to the database. One option for hashing passwords is to use the [bcrypt.js package](https://www.npmjs.com/package/bcryptjs).

9.  Add User Authentication Middleware

    - A user must be authenticated in order to get data on the current user or to create, update, or delete courses.
      - Create a custom middleware function that authenticates the user credentials from the Authorization header on the request.
      - If the authentication is successful, add the user account to the Request object and continue processing the request.
      - If authentication fails, return a `401` HTTP status code and generic “Access Denied” message.
      - The custom middleware should be used to authenticate the following routes:
      - `/api/users` `GET`
      - `/api/courses` `POST`
      - `/api/courses/:id` `PUT`
      - `/api/courses/:id` `DELETE`

10. Test Your Application Using Postman
    - You should be familiar with [Postman](https://www.postman.com/) from some of the material in this unit. If you haven't already, download and install Postman now.
    - The Starter Files for the project include a Postman Collection that can be used to test your application. Open Postman and import the `RESTAPI.postman_collection.json` file.
    - Start your application and then use the requests in the collection to test your project and make sure everything is working as outlined in the How you will be graded tab.
    - Another option for testing your application is to use the [REST Client package](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). Once you have installed that package as a dependency, you can test the app using the `tests.http` file.

**Pro Tip:** Avoid making any changes to the requests in the included test files. You should be able to test your application using the requests in the test files as-is.

## Extra Credit Instructions

1. Ensure User Email Address is Valid and Unique
   -Add validation to the `emailAddress` attribute in the `User` model to ensure that the provided email address is properly formatted.
   -Add the `unique` constraint to the `User` model to ensure that the provided email address isn't already associated with an existing user.

2. Update the User Routes

   - Update the `/api/users` `GET` route so that the following properties are filtered out of the response:
     - `password`
     - `createdAt`
     - `updatedAt`
   - Update the `/api/users` `POST` route to check for and handle `SequelizeUniqueConstraintError` errors.
     - If a `SequelizeUniqueConstraintError` is thrown a `400` HTTP status code and an error message should be returned.

3. Update the Course Routes
   - Update the `/api/courses` and `/api/courses/:id` `GET` routes so that the following properties are filtered out of the response:
     - `createdAt`
     - `updatedAt`
   - Update the `/api/courses/:id` `PUT` and `/api/courses/:id` `DELETE` routes to ensure that the currently authenticated user is the owner of the requested course.
     - If the currently authenticated user is not the owner of the requested course a `403` HTTP status code should be returned.
