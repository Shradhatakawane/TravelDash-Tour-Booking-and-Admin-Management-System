import { useParams, Link } from "react-router-dom";
import { getPackages } from "../data/packages";

function PackageDetails() {
  const { id } = useParams();
  const packages = getPackages();

  const tour = packages.find((p) => String(p.id) === String(id));

  if (!tour) {
    return (
      <div className="container">
        <h2>Package Not Found ❌</h2>
        <Link to="/packages">
          <button className="btn btn-confirm" style={{ marginTop: "12px" }}>
            Back to Packages
          </button>
        </Link>
      </div>
    );
  }

  // ✅ USE PACKAGE DATA (NO AUTO LOCATION LOGIC)
  const bestTime = tour.bestTime || "Depends on season";

  const bestFor =
    tour.bestFor && Array.isArray(tour.bestFor) && tour.bestFor.length > 0
      ? tour.bestFor
      : ["Family", "Couples", "Friends"];

  const services =
    tour.services && Array.isArray(tour.services) && tour.services.length > 0
      ? tour.services
      : ["Hotel", "Meals", "Sightseeing", "Transfers", "Guide Support"];

  const whyFamous =
    tour.whyFamous && Array.isArray(tour.whyFamous) && tour.whyFamous.length > 0
      ? tour.whyFamous
      : ["Popular destination", "Local attractions", "Great experience"];

  const famousSpots =
    tour.famousSpots &&
    Array.isArray(tour.famousSpots) &&
    tour.famousSpots.length > 0
      ? tour.famousSpots
      : ["Top Attractions", "Local Markets", "Viewpoints"];

  const localFood =
    tour.localFood && Array.isArray(tour.localFood) && tour.localFood.length > 0
      ? tour.localFood
      : ["Local Meals", "Street Food", "Traditional Sweets"];

  const culture =
    tour.culture && Array.isArray(tour.culture) && tour.culture.length > 0
      ? tour.culture
      : ["Local lifestyle", "Traditional art", "Festivals & events"];

  const travelTips =
    tour.travelTips &&
    Array.isArray(tour.travelTips) &&
    tour.travelTips.length > 0
      ? tour.travelTips
      : ["Carry essentials", "Plan early", "Keep documents safe"];

  const formatDays = (d) => (d ? d : "Tour Duration");
  const formatPrice = (p) => (p ? `₹${p}` : "₹0");

  return (
    <div className="container">
      {/* HEADER */}
      <div className="pd-head">
        <div>
          <h1 className="pd-title">{tour.title}</h1>
          <p className="pd-subtitle">📍 {tour.location}</p>
        </div>

        <div className="pd-actions">
          <Link to={`/book/${tour.id}`}>
            <button className="pd-btn pd-btn-primary">Book Now</button>
          </Link>

          <Link to="/packages">
            <button className="pd-btn pd-btn-light">Back</button>
          </Link>
        </div>
      </div>

      {/* TOP GRID */}
      <div className="pd-top">
        {/* IMAGE */}
        <div className="pd-imageCard">
          <img src={tour.image} alt={tour.title} className="pd-image" />
          <div className="pd-chip">{formatDays(tour.days)}</div>
        </div>

        {/* QUICK INFO */}
        <div className="pd-infoCard">
          <div className="pd-priceRow">
            <div>
              <p className="pd-label">Starting Price</p>
              <h2 className="pd-price">{formatPrice(tour.price)}</h2>
              <p className="pd-muted">Per person (approx.)</p>
            </div>

            <div className="pd-miniStats">
              <div className="pd-miniStat">
                <p className="pd-label">Best Time</p>
                <p className="pd-value">{bestTime}</p>
              </div>
              <div className="pd-miniStat">
                <p className="pd-label">Best For</p>
                <p className="pd-value">{bestFor.slice(0, 2).join(", ")}</p>
              </div>
            </div>
          </div>

          <div className="pd-divider" />

          <p className="pd-overview">
            {tour.overview ||
              "A complete travel experience with sightseeing, local culture, and must-visit attractions."}
          </p>

          <div className="pd-tags">
            {bestFor.map((t, i) => (
              <span key={i} className="pd-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="pd-grid">
        <div className="pd-box">
          <h3 className="pd-boxTitle">Services Included</h3>
          <div className="pd-pills">
            {services.map((s, i) => (
              <span key={i} className="pd-pill">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="pd-box">
          <h3 className="pd-boxTitle">Why This Tour is Famous</h3>
          <ul className="pd-list">
            {whyFamous.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="pd-box">
          <h3 className="pd-boxTitle">Top Famous Spots</h3>
          <div className="pd-pills">
            {famousSpots.map((x, i) => (
              <span key={i} className="pd-pill pd-pill-spot">
                {x}
              </span>
            ))}
          </div>
        </div>

        <div className="pd-box">
          <h3 className="pd-boxTitle">Local Foods to Try</h3>
          <div className="pd-pills">
            {localFood.map((x, i) => (
              <span key={i} className="pd-pill pd-pill-food">
                {x}
              </span>
            ))}
          </div>
        </div>

        <div className="pd-box">
          <h3 className="pd-boxTitle">Culture & Experience</h3>
          <ul className="pd-list">
            {culture.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="pd-box">
          <h3 className="pd-boxTitle">Travel Tips</h3>
          <ul className="pd-list">
            {travelTips.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA BOTTOM */}
      <div className="pd-cta">
        <div>
          <h3 className="pd-ctaTitle">Ready to confirm this trip?</h3>
          <p className="pd-muted">
            Book now to lock your package and manage it inside Dashboard.
          </p>
        </div>

        <Link to={`/book/${tour.id}`}>
          <button className="pd-btn pd-btn-primary">Confirm Booking</button>
        </Link>
      </div>
    </div>
  );
}

export default PackageDetails;
