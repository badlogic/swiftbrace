const fs = require("fs");

const albums = JSON.parse(fs.readFileSync("lyrics.json"));
console.log(albums.length);
const processed = [];
for (const album of albums) {
    const processedAlbum = {
        title: album.Title,
        songs: [],
    }
    for (const song of album.Songs) {
        processedAlbum.songs.push({
            title: song.Title,
            lines: song.Lyrics.map((l) => l.Text)
        }
        );
    }
    processed.push(processedAlbum);
}
console.log(processed);
fs.writeFileSync("src/albums.json", JSON.stringify(processed, null, 2));