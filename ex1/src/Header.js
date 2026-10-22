import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <span className="logo-dot"></span>
        <h2>My Portfolio</h2>
      </div>
      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
