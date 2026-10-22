import React from "react";

function About() {
  return (
    <section className="about">
      <div className="about-badge">✨ Portfolio Showcase</div>
      <h1>Hello, I'm <span className="highlight-text">Praveen</span></h1>
      <p className="about-subtitle">Front-end Developer &amp; UI/UX Enthusiast</p>
      <a className="btn" href="/resume.pdf" download>
        Download Resume &darr;
      </a>
    </section>
  );
}

export default About;
