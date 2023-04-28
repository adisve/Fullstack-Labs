## Lab 1 - Technical Solution

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

<br>

### Client

For the client side of the project, I used Webpack for bundling project files and allowing for transpilation of ES6 modules as well as Sass files. The content of the webpage is rendered dynamically in the **#root** div, and each time a row is updated/deleted/created, the table is reloaded by fetching new data from the MongoDB Collection 'albums'.

<br>

The utils.js file contains the methods for modifying the raw HTML data, no framework is used, and instead changes are done like this:

```js
const root = document.querySelector('#root');
const content = `
    <table id='album-table' class="styled-table">
      ${tableHead}
      <tbody>
        ${tableRows.join('')}
      </tbody>
    </table>
  `;
const table = document.createElement('div');
table.innerHTML = content;
root.appendChild(table);
```

This allows me to easier render and change the content of the HTML page.

<br>

The index.js file contains nothing more than a simple start function, that first creates the header, then the table for 'creating' an album, and then the table that displays all of the albums.

<br>

Styling is done in the styles.scss folder, to give the webpage some minor flair. I did not face any problems with this lab and it went quite smoothly.

<br>

## Lab 2 - Technical Solution

### Client

For the second lab, I implemented Webpack so I could bundle the client resources (including CSS, JavaScript, and HTML files) into a dist folder. This allows me at runtime to bundle any JavaScript resources into a common file, as well as transpile the SCSS into CSS when bundling.

### Server

The Express server now serves the aforementioned HTML file on the endpoint '/' of the URL. It is treated as a static resource, which it receives from the dist/ folder. To make this possible, I used Docker to do the work for me and create a container, which also moves the dist/ folder from the client into the server/ folder, so it can serve the necessary HTMl. Any endpoints that act as ways of communicating with MongoDB Atlas are reached via the /api/ prefix.

In render.com I then created a web service that uses a Docker image and makes use of my Dockerfile that exists in the root of my project. Render also creates a `config.env` folder when deploying, which I point to in my express server and mongodb connection by referencing the absolute etc/ path.

Initially, I had quite some issues figuring out a nice way to bundle things together and how to serve the files that I wanted, and whether I should use Docker or not. I also had some issues referencing the config.env file as a relative path, so I ended up just using the absolute path. In the end, I decided that this was a pretty good way of delegating the interaction between server and client folders.

My Render hosted Web Service can be found here --> [Fullstack-Lab-2](https://fullstack-lab-2-rksf.onrender.com)
