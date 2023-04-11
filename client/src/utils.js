const url = 'http://localhost:8080/api';

export function createHeader() {
  const root = document.querySelector('#root');
  const header = document.createElement('h1');
  header.innerHTML = 'Albums';
  header.id = 'header';
  root.appendChild(header);
}

export function createTable() {
  const root = document.querySelector('#root');
  getAllAlbums().then((albums) => {
    const tableHead = `
            <thead>
                <tr>
                  <th>Title</th>
                  <th>Artist</th> 
                  <th>Year</th>
                  <th>Genre</th>
                  <th>Edit</th>
                </tr>
            </thead>
        `;
    const tableRows = albums.map((album, index) => {
      return `
            <tr id='album-${index}' data-album-id='${album._id}'>
                <td contentEditable>${album.title}</td>
                <td contentEditable>${album.artist}</td>
                <td contentEditable>${album.year}</td>
                <td contentEditable>${album.genre}</td>
                <td style="line-height: 50px; text-align: center;">
                  <button class='button' id='show-details-${index}'>Details</button>
                  <button class='button-update' id='update-${index}'>Update</button>
                  <button class='button-delete' id='delete-${index}'>Delete</button>
              </td>
            </tr>
        `;
    });
    const content = `
            <table class="styled-table">
                ${tableHead}
                <tbody>
                  ${tableRows.join('')}
                </tbody>
            </table>
        `;
    const table = document.createElement('div');
    table.innerHTML = content;
    root.appendChild(table);

    // add event listeners to the update buttons
    const updateButtons = document.querySelectorAll('.button-update');
    updateButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        console.log(`Pressed update button for album ${index}`);
        updateAlbum(index);
      });
    });
  });
}

export function createNewAlbumButton() {
  const root = document.querySelector('#root');
  const createAlbumButton = document.createElement('button');
  createAlbumButton.innerHTML = 'Create Album';
  createAlbumButton.id = 'create-album-button';
  createAlbumButton.className = 'button';
  root.appendChild(createAlbumButton);
}

export async function getAllAlbums() {
  let response = await fetch(`${url}/albums/`);
  let albums = await response.json();
  return albums;
}

export async function updateAlbum(index) {
  const tableRow = document.querySelector(`#album-${index}`);
  const id = tableRow.dataset.albumId;
  const title = tableRow.querySelector('td:nth-child(1)').textContent.trim();
  const artist = tableRow.querySelector('td:nth-child(2)').textContent.trim();
  const year = tableRow.querySelector('td:nth-child(3)').textContent.trim();
  const genre = tableRow.querySelector('td:nth-child(4)').textContent.trim();

  const response = await fetch(`${url}/albums/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, artist, year, genre }),
  });

  const updatedAlbum = await response.json();
  tableRow.querySelector('td:nth-child(1)').textContent = updatedAlbum.title;
  tableRow.querySelector('td:nth-child(2)').textContent = updatedAlbum.artist;
  tableRow.querySelector('td:nth-child(3)').textContent = updatedAlbum.year;
  tableRow.querySelector('td:nth-child(4)').textContent = updatedAlbum.genre;
}
