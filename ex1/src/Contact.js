import React from "react";

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <section id="contact" className="contact">
      <div className="section-header">
        <h2>Contact Me</h2>
        <div className="accent-bar"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your message..." rows="4" required></textarea>
        <button type="submit" className="submit-btn">Send Message &rarr;</button>
      </form>
    </section>
  );
}

export default Contact;
