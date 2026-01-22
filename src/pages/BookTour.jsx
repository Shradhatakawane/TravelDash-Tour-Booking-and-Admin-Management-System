import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getPackages } from "../data/packages";

function BookTour() {
  const { id } = useParams();
  const navigate = useNavigate();

  const packages = getPackages();
  const tour = packages.find((p) => String(p.id) === String(id));

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    persons: 1,
  });

  // Add-ons list
  const addonsList = useMemo(
    () => [
      { id: 1, name: "Airport Pickup", price: 1500 },
      { id: 2, name: "Travel Insurance", price: 999 },
      { id: 3, name: "Luxury Hotel Upgrade", price: 3000 },
      { id: 4, name: "Local Guide", price: 1200 },
    ],
    []
  );

  const [selectedAddons, setSelectedAddons] = useState([]);

  useEffect(() => {
    if (!tour) return;
  }, [tour]);

  if (!tour) {
    return (
      <div className="container">
        <h2>Tour Not Found ❌</h2>
        <Link to="/packages">
          <button className="btn btn-confirm" style={{ marginTop: "12px" }}>
            Back to Packages
          </button>
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAddon = (addon) => {
    const exists = selectedAddons.find((a) => a.id === addon.id);

    if (exists) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const pricePerPerson = Number(tour.price || 0);
  const persons = Number(formData.persons || 1);

  const baseTotal = pricePerPerson * persons;

  const addonsTotal = selectedAddons.reduce(
    (sum, addon) => sum + Number(addon.price),
    0
  );

  const grandTotal = baseTotal + addonsTotal;

  const handleBooking = (e) => {
    e.preventDefault();

    const bookingId = Math.floor(100000 + Math.random() * 900000);

    const newBooking = {
      bookingId,
      packageId: tour.id,
      packageTitle: tour.title,
      location: tour.location,
      pricePerPerson,
      baseTotal,
      addonsTotal,
      totalPrice: grandTotal,
      selectedAddons,
      status: "Pending",
      ...formData,
    };

    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const updatedBookings = [...storedBookings, newBooking];

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    alert("Booking placed successfully ✅");
    navigate("/bookings");
  };

  return (
    <div className="container">
      {/* Head */}
      <div className="book-head">
        <h1 className="book-title">Book Your Tour</h1>
        <p className="book-subtitle">
          Fill details and confirm your booking instantly.
        </p>
      </div>

      <div className="book-grid">
        {/* LEFT SUMMARY */}
        <div className="book-summary">
          <div className="book-imgWrap">
            <img src={tour.image} alt={tour.title} className="book-img" />
            <div className="book-chip">{tour.days}</div>
          </div>

          <div className="book-summaryBody">
            <h2 className="book-tourTitle">{tour.title}</h2>
            <p className="book-location">📍 {tour.location}</p>

            <div className="book-priceRow">
              <h2 className="book-price">₹ {tour.price}</h2>
              <span className="book-smallText">per person</span>
            </div>

            <div className="book-actions">
              <Link to={`/packages/${tour.id}`}>
                <button className="book-btn book-btn-light">View Details</button>
              </Link>

              <Link to="/packages">
                <button className="book-btn book-btn-light">Back</button>
              </Link>
            </div>

            <div className="book-note">
              ✅ Add-ons are optional. Grand total updates automatically.
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="book-formCard">
          <h2 className="book-formTitle">Booking Form</h2>

          <form className="book-form" onSubmit={handleBooking}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input"
              required
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input"
              required
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date"
              className="input"
              required
              value={formData.date}
              onChange={handleChange}
            />

            <input
              type="number"
              name="persons"
              placeholder="Number of Persons"
              className="input"
              min="1"
              required
              value={formData.persons}
              onChange={handleChange}
            />

            {/* Add-ons */}
            <div style={{ marginTop: "10px" }}>
              <h3 style={{ margin: "0 0 8px", fontWeight: "900" }}>
                Add-ons (Optional)
              </h3>

              {addonsList.map((addon) => {
                const checked = selectedAddons.some((a) => a.id === addon.id);

                return (
                  <label
                    key={addon.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                      padding: "10px",
                      borderRadius: "14px",
                      border: "1px solid var(--border)",
                      background: "#fafafa",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddon(addon)}
                    />
                    <span style={{ fontWeight: "800" }}>
                      {addon.name} (+₹{addon.price})
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Price summary */}
            <div
              style={{
                marginTop: "10px",
                padding: "12px",
                borderRadius: "16px",
                border: "1px solid var(--border)",
                background: "#f8fafc",
              }}
            >
              <p style={{ margin: "0 0 6px", fontWeight: "800" }}>
                Base Total: ₹ {baseTotal}
              </p>
              <p style={{ margin: "0 0 6px", fontWeight: "800" }}>
                Add-ons Total: ₹ {addonsTotal}
              </p>
              <p style={{ margin: 0, fontWeight: "900", fontSize: "16px" }}>
                Grand Total: ₹ {grandTotal}
              </p>
            </div>

            <button type="submit" className="book-btn book-btn-primary">
              Confirm Booking ✅
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookTour;
