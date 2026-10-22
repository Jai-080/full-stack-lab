import React from "react";

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="section-header">
        <h2>Projects</h2>
        <div className="accent-bar"></div>
      </div>
      <div className="projects-grid">
        <div className="project-card">
          <div className="project-badge">AI / ML</div>
          <h3>Project One</h3>
          <p>LLM probe &mdash; interactive evaluation tool and analysis dashboard for large language models.</p>
          <div className="tech-tags">
            <span>React</span>
            <span>Python</span>
            <span>NLP</span>
          </div>
        </div>
        <div className="project-card">
          <div className="project-badge">Web App</div>
          <h3>Project Two</h3>
          <p>Reminder app &mdash; intuitive productivity application with notifications and task scheduling.</p>
          <div className="tech-tags">
            <span>React</span>
            <span>State</span>
            <span>CSS3</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
