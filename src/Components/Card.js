import React from 'react';
import { useNavigate } from 'react-router-dom';
import hulkImage from './alt3.jpg';
import './Card.css';

export const Card = ({ data, category }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/${category}/${id}`);
  };

  return (
    <>
      {data ? (
        data.map((item) => {
          let title;

          if (item.name) {
            title = item.name; // For characters
          } else if (item.title) {
            title = item.title; // For comics, events, and stories
          } else if (item.firstName) {
            title = item.firstName; // For creators
          } else {
            title = ''; // Default fallback
          }

          const thumbnailPath = item.thumbnail ? `${item.thumbnail.path}.${item.thumbnail.extension}` : hulkImage;

          return (
            <div
              className="card"
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              <img src={thumbnailPath} alt="" />
              <div className="title">
                <h3>{title}</h3>
              </div>
            </div>
          );
        })
      ) : (
        ''
      )}
    </>
  );
};
