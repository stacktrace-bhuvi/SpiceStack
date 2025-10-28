import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home({ user }) {

  // local images in public/images/
  const carouselImages = [
    "/images/food1.jpg",
    "/images/food2.jpg",
    "/images/food3.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // sample featured recipes (using local images)
  const featured = [
    {
      id: 1,
      title: "Italian Pasta",
      desc: "Rich cheese & herbs",
      image: "/images/food4.jpg",
    },
    {
      id: 2,
      title: "Chocolate Dessert",
      desc: "Soft & creamy goodness",
      image: "/images/food5.jpg",
    },
    {
      id: 3,
      title: "Gourmet Pizza",
      desc: "Fresh toppings & stone-baked",
      image: "/images/food6.jpg",
    },
  ];

  return (
    <div className="home-container">
      <div className="carousel-wrapper">
        {carouselImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`carousel ${i}`}
            className={`carousel-img ${i === index ? "active" : ""}`}
            loading="lazy"
          />
        ))}

        <div className="carousel-overlay">
          <h2>Cook with Love, Share with the World</h2>
          <p>Discover, create, and share recipes with a warm and cozy community.</p>
        </div>
      </div>

      <h2 className="home-title">Welcome to CookConnect</h2>
      <p className="home-subtitle">
        Discover, create, and share recipes with a warm and cozy cooking community.
      </p>

      <div className="explore-section">
        <Link to="/recipes">
          <button className="explore-btn">🍽️ Explore Recipes</button>
        </Link>

        {/* ✅ Add Recipe button visible only when logged in */}
        {user && (
          <Link to="/add-recipe">
            <button className="explore-btn" style={{ marginLeft: "15px" }}>
              ➕ Add Recipe
            </button>
          </Link>
        )}
      </div>

      <div className="featured-section">
        <h3 className="featured-title">Popular Picks</h3>

        <div className="card-list">
          {featured.map((r) => (
            <div className="recipe-card" key={r.id}>
              <img src={r.image} alt={r.title} className="recipe-img" />
              <div className="recipe-info">
                <h4>{r.title}</h4>
                <p>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
