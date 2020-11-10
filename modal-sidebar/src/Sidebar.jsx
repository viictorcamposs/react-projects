import React from 'react'
import { FaTimes } from 'react-icons/fa'

import logo from './logo.svg'
import { social, links } from './data'

import { useGlobalContext } from './context';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  return (
    <aside className={`sidebar ${isSidebarOpen && 'show-sidebar'}`}>
      <div className="sidebar-header">
        <img src={logo} className="logo" alt="coding addict" />
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>

      <ul className="links">
        {links.map(link => (
          <li key={link.id}>
            <a href={link.url}>
              {link.icon}
              {link.text}
            </a>
          </li>
        ))}
      </ul>

      <ul className="social-icons">
        {social.map(item => (
          <li key={item.id}>
            <a href={item.url}>
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar
