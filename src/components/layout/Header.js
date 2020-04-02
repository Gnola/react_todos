import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // Link to other pages

function Header() {
  return (
    <header style={headerStyle}>
      <h1>TodoList</h1>
      <Link style={linkStyle} to='/'>Home</Link> | <Link style={linkStyle} to='/about'>About</Link>
    </header>
  )
}

// STYLING
const headerStyle = {
  background: '#333',
  color:'#fff',
  textAlign: 'center',
  padding: '10px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}


export default Header;
