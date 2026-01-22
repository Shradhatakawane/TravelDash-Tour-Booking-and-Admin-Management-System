import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="home-hero-overlay"></div>

        {/* Decorative blur blobs */}
        <div className="home-blob home-blob-1"></div>
        <div className="home-blob home-blob-2"></div>

        <div className="home-hero-inner">
          <div className="home-hero-card">
            <h1 className="home-title">
              Explore Your Dream Trips.
              <br />
              <span>Travel Smarter.</span>
            </h1>

            <p className="home-subtitle">
              Discover packages, book tours instantly, track bookings, and manage
              everything in one clean dashboard.
            </p>

            <div className="home-hero-actions">
              <Link to="/packages">
                <button className="btn-primary home-btn">
                  Explore Packages ✈️
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY USE SECTION */}
      <section className="home-why">
        <div className="home-section-head">
          <h2 className="section-title">Why Choose Our Travel Agency?</h2>
          <p className="section-subtitle">
            Everything you need — booking, tracking, invoice, admin dashboard — in one place.
          </p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">🌍</div>
            <h3>Best Tour Packages</h3>
            <p>Curated destinations with the best price and travel experience.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">📅</div>
            <h3>Easy Booking</h3>
            <p>Book tours in minutes with simple steps & instant status.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">💳</div>
            <h3>Invoice & Confirmation</h3>
            <p>Download invoice PDF, track status, and stay updated.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">📊</div>
            <h3>Admin Dashboard</h3>
            <p>Manage bookings, confirm/cancel, export CSV, track revenue.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="home-cta">
        <div className="home-cta-inner">
          <h2>Ready to plan your next trip?</h2>
          <p>Explore packages, book instantly, and enjoy your journey smoothly.</p>

          <Link to="/packages">
            <button className="btn-primary home-btn">Start Booking Now ✈️</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
