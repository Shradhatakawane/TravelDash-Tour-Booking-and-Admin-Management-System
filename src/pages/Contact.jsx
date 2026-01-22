import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully ✅");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <div className="contact-head">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            Have questions? Want to customize a trip? Send us a message and we’ll
            get back to you quickly.
          </p>
        </div>

        {/* Grid */}
        <div className="contact-grid">
          {/* Info Card */}
          <div className="contact-info-card">
            <div>
              <h2 className="contact-card-title">TravelDash Support</h2>
              <p className="contact-card-text">
                We’re available for bookings, cancellations, and tour
                customization.
              </p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <p className="contact-label">Phone</p>
                    <p className="contact-value">+91 98765 43210</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">📧</div>
                  <div>
                    <p className="contact-label">Email</p>
                    <p className="contact-value">support@traveldash.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <p className="contact-label">Office</p>
                    <p className="contact-value">Pune, Maharashtra</p>
                  </div>
                </div>
              </div>

              <div className="contact-note">
                💡 Tip: For faster support, include your booking ID in message.
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="contact-form-card">
            <h2 className="contact-card-title">Send a Message</h2>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input"
                  required
                  value={form.name}
                  onChange={handleChange}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="input"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <textarea
                name="message"
                placeholder="Write your message..."
                className="input contact-textarea"
                required
                value={form.message}
                onChange={handleChange}
              />

              <button type="submit" className="btn-primary contact-btn">
                Send Message ✅
              </button>
            </form>

            <p className="contact-footer">
              We typically reply within 24 hours ⏳
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
