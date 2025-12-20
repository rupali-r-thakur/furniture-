import React from "react";

function Contact() {
  return (
    <div className="contact_container">
      <h1>Contact Me</h1>

      <form className="contact_form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
