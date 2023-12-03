import { faBars, faTimes} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

function Topbar({ toggleSidebar, showSidebar }) {
 
  const buttonStyle = {
    color: showSidebar ? '#000000' : '#ffffff',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    width: '100px',
    height: '66px',
    fontSize: '20px',
  };
  
  return (
    <nav className="navbar navbar-expand navbar-light bg-primary topbar mb-4 static-top shadow">
      <button className="btn btn-link" onClick={toggleSidebar} style={buttonStyle}>
        {showSidebar ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </button>
    </nav>
  );
}

export default Topbar;