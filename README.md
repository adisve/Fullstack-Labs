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
