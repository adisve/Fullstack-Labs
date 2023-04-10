async function start() {
  let root = document.querySelector('#root');
  getAllAlbums().then((albumsJSON) => {
    let albums = JSON.parse(albumsJSON);
    /* Create table rows to add to table */
    let tableRows = albums.map((album) => {
      return `
                    <tr>
                        <th>${album.title}</th>
                        <th>${album.artist}</th>
                        <th>${album.year}</th>
                        <th${album.genre}</th>
                    </tr>
                `;
    });
    let content = `
                <table>${tableRows}</table>
            `;
    root.innerHTML = content;
  });
}

async function getAllAlbums() {
  let response = await fetch('http://localhost:3000/api/albums');
  let albums = await response.json();
  return albums;
}

async function getAlbumsByTitle(title) {}

async function createNewAlbum(title, artist, year, genre, tracks) {}

async function updateAlbum(id) {}

async function deleteAlbum(id) {}

start();
