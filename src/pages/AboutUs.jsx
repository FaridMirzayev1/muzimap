import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Mirzayev Farid",
      position: "CEO & Founder",
      bio: "A music enthusiast and tech leader with 1 year of experience",
      avatar: "👨🏾‍💻",
    },
    {
      name: "Mirzayev Farid",
      position: "Lead Designer",
      bio: "Expert in user experience and creative direction",
      avatar: "👨🏾‍💻",
    },
    {
      name: "Mirzayev Farid",
      position: "Lead Developer",
      bio: "Specialist in music technologies and full-stack development",
      avatar: "👨🏾‍💻",
    },
    {
      name: "Mirzayev Farid",
      position: "Marketing Manager",
      bio: "Expert in digital marketing and social media strategies",
      avatar: "👨🏾‍💻",
    },
  ];

  const milestones = [
    {
      year: "2018",
      event: "Launch of MuziMap and release of the first version",
    },
    { year: "2019", event: "Reached 1 million user milestone" },
    { year: "2020", event: "Won Best Music App award" },
    { year: "2022", event: "Introduced AI-powered recommendation system" },
    { year: "2023", event: "Surpassed 5 million active users" },
  ];

  return (
    <div className="about-us-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>About MuziMap</h1>
          <p className="about-text">
            Our journey to revolutionize the music listening experience
          </p>
        </div>
      </section>

      <section className="mission-section">
        <div className="a-container">
          <h2>Our Mission</h2>
          <div className="mission-cards">
            <div className="mission-card">
              <div className="icon">🎵</div>
              <h3>Music Discovery</h3>
              <p>
                We provide innovative tools to help users discover new songs and
                artists.
              </p>
            </div>
            <div className="mission-card">
              <div className="icon">💎</div>
              <h3>Quality</h3>
              <p>
                We ensure high-quality audio and a seamless listening
                experience.
              </p>
            </div>
            <div className="mission-card">
              <div className="icon">🌍</div>
              <h3>Global Community</h3>
              <p>We unite music lovers from all around the world.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="a-container">
          <h2>Our Team</h2>
          <p className="subtitle">The talented people behind MuziMap</p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <p className="position">{member.position}</p>
                <p className="bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="a-container">
          <h2>Our History</h2>
          <p className="subtitle">The development journey of MuziMap</p>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-event">{milestone.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
