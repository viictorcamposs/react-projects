import React, { useState, useRef, useEffect } from 'react';

import { useGlobalContext } from './context';

const Submenu = () => {
  const { 
    isSubmenuOpen, 
    location, 
    page:{page, links} 
  } = useGlobalContext();

  const container = useRef(null);
  const [columns, setColumns] = useState('');
  useEffect(() => {
    const submenu = container.current;
    const { center, bottom } = location;

    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;

    links.length < 3 && setColumns('col-2');
    links.length === 3 && setColumns('col-3'); 
    links.length > 3 && setColumns('col-4'); 
  }, [location, links]);

  return (
    <aside ref={container} className={`submenu ${isSubmenuOpen && 'show'}`}>
      <h4>{page}</h4>
      <div className={`submenu-center ${columns}`}>
        {links.map((link, index) => (
          <a key={index} href={link.url}>
            {link.icon}
            {link.label}
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Submenu;