import React, { useState } from "react";
import "./Premium.css";

const Premium = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [learnMoreText, setLearnMoreText] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    university: "",
    graduationYear: "",
  });

  const plans = {
    monthly: [
      {
        name: "Individual",
        price: "9.99",
        features: [
          "Ad-free music listening",
          "Offline playback",
          "Unlimited skips",
          "High-quality audio",
          "1 account",
        ],
        color: "#1DB954",
      },
      {
        name: "Duo",
        price: "12.99",
        features: [
          "2 Premium accounts",
          "Duo Mix playlist",
          "Ad-free listening",
          "Offline playback",
          "High quality",
        ],
        color: "#4A38D3",
        popular: true,
      },
      {
        name: "Family",
        price: "15.99",
        features: [
          "Up to 6 accounts",
          "Family Mix playlist",
          "Explicit content filter",
          "Ad-free listening",
          "Offline playback",
        ],
        color: "#FF5B5B",
      },
      {
        name: "Student",
        price: "4.99",
        features: [
          "Student discount",
          "Ad-free listening",
          "Offline playback",
          "Unlimited skips",
          "High quality",
        ],
        color: "#FFA500",
      },
    ],
    annual: [
      {
        name: "Individual",
        price: "99.99",
        features: [
          "Ad-free music listening",
          "Offline playback",
          "Unlimited skips",
          "High-quality audio",
          "1 account",
        ],
        color: "#1DB954",
        saving: "2 months free",
      },
      {
        name: "Duo",
        price: "129.99",
        features: [
          "2 Premium accounts",
          "Duo Mix playlist",
          "Ad-free listening",
          "Offline playback",
          "High quality",
        ],
        color: "#4A38D3",
        saving: "2 months free",
        popular: true,
      },
      {
        name: "Family",
        price: "159.99",
        features: [
          "Up to 6 accounts",
          "Family Mix playlist",
          "Explicit content filter",
          "Ad-free listening",
          "Offline playback",
        ],
        color: "#FF5B5B",
        saving: "2 months free",
      },
      {
        name: "Student",
        price: "49.99",
        features: [
          "Student discount",
          "Ad-free listening",
          "Offline playback",
          "Unlimited skips",
          "High quality",
        ],
        color: "#FFA500",
        saving: "2 months free",
      },
    ],
  };

  const handleStudentInfoChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert("Ödəniş uğurla tamamlandı!");
    setShowPaymentForm(false);
    setSelectedPlan(null);
  };

  const toggleLearnMore = () => {
    setLearnMoreText(!learnMoreText);
  };

  return (
    <div className="premium-page">
      <div className="premium-hero">
        <div className="hero-content">
          <h1>Enhance your music listening experience with MuziMap Premium.</h1>
          <p className="premium-text">
            Premium membership offers you exclusive benefits and an ad-free
            experience.
          </p>
          <div className="hero-buttons">
            <button
              onClick={() =>
                document
                  .getElementById("plans")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="cta-button">
              View Plans
            </button>
            <button onClick={toggleLearnMore} className="secondary-button">
              {learnMoreText ? "Show Less" : "Learn More"}
            </button>
          </div>

          {learnMoreText && (
            <div className="learn-more-content">
              <h3>Premium Features:</h3>
              <p>
                {learnMoreText
                  ? "Listen to your favorite music without any limits with MuziMap Premium. Exclusive playlists, special tracks, and much more are waiting for you"
                  : "Click the button for more information"}
              </p>
            </div>
          )}
        </div>
        <div className="hero-image">
          <div className="floating-albums">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`album-cover album-${i}`}></div>
            ))}
          </div>
        </div>
      </div>

      <section id="plans" className="plans-section">
        <h2>Select a Premium Plan</h2>
        <p>Enhance your listening experience even furthe</p>

        <div className="payment-options">
          <button
            className={activeTab === "monthly" ? "active" : ""}
            onClick={() => setActiveTab("monthly")}>
            Monthly
          </button>
          <button
            className={activeTab === "annual" ? "active" : ""}
            onClick={() => setActiveTab("annual")}>
            Annual (15% savings)
          </button>
        </div>

        <div className="plans-grid">
          {plans[activeTab].map((plan, index) => (
            <div
              key={index}
              className={`plan-card ${plan.popular ? "popular" : ""}`}
              style={{ borderTop: `5px solid ${plan.color}` }}>
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              <h3>{plan.name}</h3>
              <div className="plan-price">
                <span className="price">{plan.price}</span>
                <span className="period">
                  AZN/{activeTab === "monthly" ? "month" : "year"}
                </span>
              </div>
              {plan.saving && <div className="saving-badge">{plan.saving}</div>}
              <ul className="plan-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button
                className="get-plan-button"
                style={{ backgroundColor: plan.color }}
                onClick={() => {
                  setSelectedPlan(plan);
                  setShowPaymentForm(true);
                }}>
                Get Premium {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {showPaymentForm && (
        <div className="payment-modal">
          <div className="payment-content">
            <button
              className="close-button"
              onClick={() => setShowPaymentForm(false)}>
              ×
            </button>
            <h2>{selectedPlan.name} Plan Payment</h2>

            {selectedPlan.name === "Tələbə" && (
              <div className="student-form">
                <h3>Student Information</h3>
                <div className="form-group">
                  <label>Universty:</label>
                  <input
                    type="text"
                    name="university"
                    value={studentInfo.university}
                    onChange={handleStudentInfoChange}
                    placeholder="Oxuduğunuz universitet"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Graduation Year:</label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={studentInfo.graduationYear}
                    onChange={handleStudentInfoChange}
                    placeholder="Graduation Year"
                    min={new Date().getFullYear()}
                    max={new Date().getFullYear() + 5}
                    required
                  />
                </div>
              </div>
            )}

            <form onSubmit={handlePaymentSubmit}>
              <h3>Payment Information</h3>
              <div className="form-group">
                <label>Card Number:</label>
                <input type="text" placeholder="5555 5555 5555 5555" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiration Date:</label>
                  <input type="text" placeholder="MM/YY" required />
                </div>
                <div className="form-group">
                  <label>CVV:</label>
                  <input type="text" placeholder="123" required />
                </div>
              </div>
              <div className="form-group">
                <label>Cardholder's Name</label>
                <input type="text" placeholder="Full Name" required />
              </div>
              <button type="submit" className="submit-payment">
                {selectedPlan.price} Pay in AZN
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Premium;
