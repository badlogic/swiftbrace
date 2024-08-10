import { Bodies, Vector, World } from "matter-js";
import albumsJson from "./albums.json";

export type Bead = { body: Matter.Body; attached: boolean; lastMousePosition: Vector | null; letter: string };

export type Song = { title: string; lines: string[] };
export type Album = { title: string; songs: Song[] };

// Taken from https://verderamade.com/2024/02/06/i-listened-to-taylor-swifts-discography-and-created-color-palettes-from-her-album-covers/
export const palettes: Record<string, string[]> = {
	"Taylor Swift": ["#4097A9", "#3A5E32", "#E8C9A8", "#C37F86"],
	Fearless: ["#EDE1D2", "#D3B882", "#A4773B", "#5A3716"],
	"Speak Now": ["#944079", "#774E8E", "#E5AF64", "#4956A1"],
	Red: ["#A72347", "#E9E7DB", "#5F4546", "#A6A385"],
	"1989": ["#A99497", "#8A7283", "#B4703F", "#C8B79B"],
	Reputation: ["#F7F7F7", "#C2C2C2", "#555555", "#181818"],
	Lover: ["#F1C2DB", "#AEBCD7", "#FBDECC", "#99BDE5"],
	Folklore: ["#979797", "#F2F2F2", "#484848", "#5C5C5C"],
	Evermore: ["#55291C", "#B05925", "#7C6838", "#434347"],
	Midnights: ["#4C5987", "#92B0BE", "#89222E", "#0D102F"],
	"The Tortured Poets Department": ["#EFECE6", "#C7C2B8", "#FFFFFF", "#BEAD95"]
};

let total = 0;
let tooLong = 0;
for (const album of albumsJson as Album[]) {
	for (const song of album.songs) {
		total++;
		if (song.title.length > 21) {
			tooLong++;
			console.log(song.title + ", " + song.title.length);
		}
	}
}
console.log("total: " + total);
console.log("too long: " + tooLong);
const albums: Album[] = (albumsJson as Album[]);
for (const album of albums) {
    album.songs = album.songs.filter((s) => s.title.length <= 21);
}

function darkenColor(color: string, factor: number): string {
	const r = Math.max(0, Math.floor(parseInt(color.substring(1, 3), 16) * factor));
	const g = Math.max(0, Math.floor(parseInt(color.substring(3, 5), 16) * factor));
	const b = Math.max(0, Math.floor(parseInt(color.substring(5, 7), 16) * factor));

	return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function generateBeads(canvas: HTMLCanvasElement, world: World) {
	const album = albums[Math.floor(Math.random() * albums.length)];
	console.log(album);
	const song = album.songs[Math.floor(Math.random() * album.songs.length)];
	const palette = palettes[album.title];

	const maxWidth = 375;
	const boundsWidth = Math.min(canvas.clientWidth, maxWidth);
	const offsetX = (canvas.clientWidth - boundsWidth) / 2;

	const beads: Bead[] = [];
	for (let i = 0; i < song.title.length; i++) {
		const letter = song.title[i] as string;
		if (letter == " ") continue;
		const xPosition = offsetX + Math.random() * boundsWidth;
		const yPosition = canvas.clientHeight - (canvas.clientHeight / 2) * Math.random() - 40;

		const fillStyle = "#ffffff";
		const strokeStyle = darkenColor(fillStyle, 0.7);

		const element = Bodies.circle(xPosition, yPosition, 20, {
			restitution: 0.1,
			render: {
				fillStyle: fillStyle,
				strokeStyle: strokeStyle
			}
		});
		beads.push({ body: element, attached: false, lastMousePosition: null, letter: letter.toUpperCase() });
		World.add(world, element);
	}

	const remaining = 45 - song.title.length;
	for (let i = 0; i < remaining; i++) {
		const xPosition = offsetX + Math.random() * boundsWidth;
		const yPosition = canvas.clientHeight - (canvas.clientHeight / 2) * Math.random() - 40;

		const fillStyle = palette[Math.floor(Math.random() * palette.length)];
		const strokeStyle = darkenColor(fillStyle, 0.7);

		const element = Bodies.circle(xPosition, yPosition, 20, {
			restitution: 0.1,
			render: {
				fillStyle: fillStyle,
				strokeStyle: strokeStyle
			}
		});
		beads.push({ body: element, attached: false, lastMousePosition: null, letter: "" });
		World.add(world, element);
	}
	console.log(song.title);
	return { beads, album, song, palette };
}

