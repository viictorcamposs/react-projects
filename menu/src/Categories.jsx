import React from 'react';

const Categories = ({ filter, categories }) => {
  return (
    <div className="btn-container">
      {categories.map((category, index) => (
        <button 
        className="filter-btn" 
        key={index}
        onClick={() => filter(category)}
      >
        {category}
      </button>
      ))}
    </div>  
  );
};

export default Categories;
