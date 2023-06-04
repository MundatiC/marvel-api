// Main.jsx

import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import axios from "axios";

export const Home = () => {
  const [category, setCategory] = useState("characters");
  const [url, setUrl] = useState(
    `https://gateway.marvel.com/v1/public/${category}?limit=52&ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`
  );
  const [item, setItem] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setItem(response.data.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
  
    if (searchTerm.trim() === "") {
      setUrl(
        `https://gateway.marvel.com/v1/public/${category}?limit=52&ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`
      );
    } else {
      let searchUrl = "";
  
      if (category === "characters" || category === "creators" || category === "events") {
        searchUrl = `https://gateway.marvel.com/v1/public/${category}?nameStartsWith=${searchTerm}&limit=52&ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`;
      } else if (category === "comics") {
        searchUrl = `https://gateway.marvel.com/v1/public/${category}?titleStartsWith=${searchTerm}&limit=52&ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`;
      } else if (category === "stories") {
        searchUrl = `https://gateway.marvel.com/v1/public/${category}?title=${searchTerm}&limit=52&ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`;
      } 
  
      setUrl(searchUrl);
    }
  };
  

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSearch("");
    setUrl(
      `https://gateway.marvel.com/v1/public/${selectedCategory}?limit=52&ts=1&apikey=8dd9c2fc8c979833c8f529e9f1553158&hash=d6df1a7be1fb8a2d1a3b2e184da7b7b7`
    );
  };

  return (
    <>
      <div className="header">
        <div className="navbar">
          <img src="./Images/logo1.png" alt="logo" className="logo" />
          <input
            type="search"
            placeholder="Search"
            className="search"
            value={search}
            onChange={handleSearch}
          />
          <div className="category-select">
            <select value={category} onChange={handleCategoryChange}>
              <option value="characters">Characters</option>
              <option value="comics">Comics</option>
              <option value="creators">Creators</option>
              <option value="events">Events</option>
              <option value="stories">Stories</option>
            </select>
          </div>
        </div>

        <div className="bg">
          <div className="text-overlay">
            <h1>Welcome to Marvel</h1>
            <p>The home of heroes</p>
          </div>
          <img src="./Images/cap_iron.jpg" alt="" />
        </div>
      </div>
      <div className="content">
        {item ? <Card data={item} category={category} /> : <p>Not Found</p>}
      </div>
    </>
  );
};
