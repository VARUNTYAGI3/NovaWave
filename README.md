<<<<<<< HEAD
# NovaWave Music

NovaWave Music is a polished web-based music player UI built from your Spotify clone project.

## Features

- Modern dark UI with sidebar navigation
- Playlist cards with gradient cover visuals
- Track list display for each playlist
- Play / pause, next / previous controls
- Seek bar and volume control
- Local playlist support from your project folders

## Project structure

- `index.html` — main UI structure
- `style.css` — polished dark theme and responsive layout
- `script.js` — playlist loading and playback logic
- `songs/` — sample playlists with audio files and metadata
- `Best Of Hindi/`, `Bright/`, `cs/`, `Funky/`, `HITSS/`, `Inspirational/`, `ncs/`, `Punjabi/` — additional root playlists

## How to run

This project requires a local web server because the browser must fetch MP3 files via HTTP.

### Option 1: Python 3

Open a terminal in the project folder and run:

```powershell
python -m http.server 3000
```

Then open your browser at:

```
http://127.0.0.1:3000/
```

### Option 2: Node.js with http-server

If you have Node.js installed, run:

```powershell
npm install -g http-server
http-server -p 3000
```

Then open:

```
http://127.0.0.1:3000/
```

## Notes

- The player loads playlists from local MP3 folders.
- If you want to add new playlists, update `script.js` with the folder name, title, description, and songs.
- The app has been renamed to `NovaWave` to avoid using existing brand names.

=======
# NovaWave Music

NovaWave Music is a polished web-based music player UI built from your Spotify clone project.

## Features

- Modern dark UI with sidebar navigation
- Playlist cards with gradient cover visuals
- Track list display for each playlist
- Play / pause, next / previous controls
- Seek bar and volume control
- Local playlist support from your project folders

## Project structure

- `index.html` — main UI structure
- `style.css` — polished dark theme and responsive layout
- `script.js` — playlist loading and playback logic
- `songs/` — sample playlists with audio files and metadata
- `Best Of Hindi/`, `Bright/`, `cs/`, `Funky/`, `HITSS/`, `Inspirational/`, `ncs/`, `Punjabi/` — additional root playlists

## How to run

This project requires a local web server because the browser must fetch MP3 files via HTTP.

### Option 1: Python 3

Open a terminal in the project folder and run:

```powershell
python -m http.server 3000
```

Then open your browser at:

```
http://127.0.0.1:3000/
```

### Option 2: Node.js with http-server

If you have Node.js installed, run:

```powershell
npm install -g http-server
http-server -p 3000
```

Then open:

```
http://127.0.0.1:3000/
```

## Notes

- The player loads playlists from local MP3 folders.
- If you want to add new playlists, update `script.js` with the folder name, title, description, and songs.
- The app has been renamed to `NovaWave` to avoid using existing brand names.

>>>>>>> a623b76 (feat: Add music player functionality with playlists and audio controls)
Enjoy building and customizing your music UI!