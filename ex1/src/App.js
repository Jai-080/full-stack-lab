import React from "react";
import Header from "./Header";
import About from "./About";
import Intro from "./Intro";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "./Footer";
import "./styles.css";

function App() {
  return (
    <div>
      <Header />
      <About />
      <Intro />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
