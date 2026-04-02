# SpiceStack 🍽️

A cozy full-stack recipe sharing application where users can register, login, view recipes, add their own, and favorite them. Built with React (frontend) and Node.js + Express + MongoDB (backend).

---

## Features

- **User Authentication:** Secure registration and login using JWT.
- **Recipe Management:** Add, view, search, and explore recipes.
- **Favorites:** Mark recipes as favorites for quick access.
- **Private Actions:** Only authenticated users can add, edit, or favorite recipes.
- **Responsive UI:** Clean, modern, and mobile-friendly interface.
- **Image Carousel & Featured Recipes:** Engaging homepage with food images and featured recipes.

---

## Tech Stack

- **Frontend:** React, React Router, Axios, SweetAlert2
- **Backend:** Node.js, Express, JWT, Mongoose, MongoDB
- **Styling:** CSS (custom, responsive)
- **Other:** dotenv for environment variables, CORS

---

## Folder Structure

```
backend/
	server.js
	config/db.js
	middleware/auth.js
	models/Recipe.js, User.js
	routes/auth.js, recipes.js
	package.json

frontend/
	public/images/
	src/
		App.js, App.css
		components/
			Home.js, Login.js, Register.js, Navbar.js, RecipeCard.js, RecipeDetails.js, RecipeForm.js, RecipeList.js, RecipesPage.js, Favorites.js
		services/api.js
	package.json
```

---

## Setup & Run Locally

### 1. Backend

```bash
cd backend
npm install
# Create a .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

- The frontend runs on `http://localhost:3000`
- The backend runs on `http://localhost:5000`

---

## API Endpoints

### Auth

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/auth/me` — Get current user info (protected)

### Recipes

- `GET /api/recipes` — List/search recipes
- `GET /api/recipes/:id` — Get recipe details
- `POST /api/recipes` — Add a new recipe (protected)
- `PUT /api/recipes/:id` — Edit a recipe (protected)
- `DELETE /api/recipes/:id` — Delete a recipe (protected)
- `POST /api/recipes/:id/favorite` — Favorite/unfavorite a recipe (protected)

---

## Main Components

- **Home:** Carousel, featured recipes, intro
- **Login/Register:** User authentication forms
- **RecipesPage:** List/search all recipes
- **RecipeDetails:** View full recipe details
- **RecipeForm:** Add or edit a recipe
- **Favorites:** View your favorite recipes
- **Navbar:** Navigation and user menu

---

## Environment Variables

### Backend (`backend/.env`)

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend (`frontend/.env`)

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Sample Images

Images for carousel and featured recipes are in `frontend/public/images/` (e.g., `food1.jpg`, `food2.jpg`, ...).

---

## Scripts

### Backend

- `npm run dev` — Start backend with nodemon
- `npm start` — Start backend

### Frontend

- `npm start` — Start React development server
- `npm run build` — Build for production

---

## License

MIT

---

Feel free to further customize this README with screenshots, deployment instructions, or contributor guidelines!
