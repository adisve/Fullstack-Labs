## Technical solution

### Server

For connecting to the MongoDB Atlas database, I created a file called database.js, with the responsibility of establishing a connection to the Mongo URI given in the config.env file of the project. Any attempts to retrieve a reference to the database connection in the future will be possible through the getter of the private singleton **\_db**.

<br>

To create a REST API, I used Express and created the necessary routes for the required endpoints.<br>
These include:

- GET '/api/albums'
- GET '/api/albums/:title'
- POST '/api/albums'
- PUT '/api/albums/:id'
- DELETE '/api/albums/:id'

### Client

For the client side of the project, I used Webpack for bundling project files and allowing for transpilation of ES6 modules as well as Sass files.