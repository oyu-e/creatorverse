import React from 'react';
import {useNavigate} from 'react-router-dom'

const Card = ({ id, name, url, description, imageURL }) => {
  const validUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
  const navigate = useNavigate();

  const handleImageClick = () => {
    console.log('image clicked!')
    navigate(`/view/${id}`);
  };

  return (
    <div className="card">
      {imageURL && (
        <img
          src={imageURL}
          alt={name}
          className="card-image"
          onClick={handleImageClick} // Handle image click
          style={{ cursor: 'pointer' }} // Change cursor to pointer to indicate it's clickable
        />
      )}
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-description">{description}</p>
        <a href={validUrl} className="card-link" target="_blank" rel="noopener noreferrer">
          Visit {name}'s page
        </a>
      </div>
    </div>
  );
};

export default Card;