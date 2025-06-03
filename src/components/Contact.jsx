import './Contact.css'; 

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-gradient-overlay"></div>
      
      <div className="contact-container">
        <h1>Contact Muzi Map</h1>
        <p className="contact-subtitle">We'd love to hear from you!</p>
        
        <div className="contact-content">
          <div className="contact-form">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your name" />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="your@email.com" />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" maxLength={650} rows="5" placeholder="Your message..."></textarea>
              </div>
              
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
          
          <div className="contact-info">
            <h3>Our Headquarters</h3>
            <p>Music Street 1</p>
            <p>Baku, Azerbaijan</p>
            
            <h3>Email Us</h3>
            <p>feridmrzyv2005@gmail.com</p>
            
            <h3>Call Us</h3>
            <p>(+99451) 360-27-67</p>
            
            <div className="contact-social">
              <a href="https://instagram.com/muzimap" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-spotify"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;