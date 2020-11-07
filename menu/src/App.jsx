import React, { useState } from 'react';

import Menu from './Menu';
import Categories from './Categories';
import items from './data';

const allCategories = ['all', ...new Set(items.map(item => item.category))];

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);
  
  const filterItems = (category) => {
    if(category === 'all') return setMenuItems(items);
    
    const newItems = items.filter(item => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <section className="menu section">
      <div className="title">
        <h2>our menu</h2>
        <div className="underline" />
      </div>
      <Categories 
        filter={filterItems} 
        categories={categories}  
      />
      <Menu items={menuItems} />
    </section>
  );
}

export default App;
