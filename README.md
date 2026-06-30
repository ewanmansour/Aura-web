# Aura MERN Clone

MERN stack implementation inspired by `auraspace.art`.

## Stack

- React + Vite
- Tailwind CSS
- Express + Node.js
- MongoDB + Mongoose

## Run locally

```bash
npm install
npm run dev
```

The React app runs on `http://127.0.0.1:5173` and the API runs on `http://127.0.0.1:5000`.

## MongoDB

Copy `server/.env.example` to `server/.env` and set `MONGO_URI`.

```bash
npm run seed
```

If MongoDB is not configured, the API serves fallback seed data so the site still works.
