import { useEffect, useState } from "react";
import { getPackages } from "../data/packages";
import { Link } from "react-router-dom";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);

  // Load packages + wishlist ids
  useEffect(() => {
    setPackages(getPackages());

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistIds(storedWishlist.map((item) => item.id));
  }, []);

  // Add to wishlist
  const addToWishlist = (pkg) => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = stored.find((item) => item.id === pkg.id);
    if (alreadyExists) {
      alert("Already in Wishlist ❤️");
      return;
    }

    const updated = [...stored, pkg];
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlistIds(updated.map((item) => item.id));

    alert("Added to Wishlist ❤️");
  };

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updated = stored.filter((item) => item.id !== id);

    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlistIds(updated.map((item) => item.id));

    alert("Removed from Wishlist ");
  };

  return (
    <div className="container">
      <div className="page-head">
        <h1>Tour Packages </h1>
        <p>Choose your destination and book your dream trip</p>

        <Link to="/wishlist">
          <button className="btn btn-view" style={{ marginTop: "10px" }}>
            View Wishlist ❤️ ({wishlistIds.length})
          </button>
        </Link>
      </div>

      <div className="mmt-grid">
        {packages.map((item) => {
          const isSaved = wishlistIds.includes(item.id);

          return (
            <div key={item.id} className="mmt-card">
              {/* Image */}
              <div className="mmt-img-wrap">
                <img src={item.image} alt={item.title} className="mmt-img" />
                <div className="mmt-duration">{item.days}</div>
              </div>

              {/* Content */}
              <div className="mmt-content">
                <h3 className="mmt-title">{item.title}</h3>

                {/* Includes */}
                <div className="mmt-includes">
                  <p className="mmt-small-title">Tour Includes</p>

                  <div className="mmt-icons">
                    <span title="Hotel">🏨</span>
                    <span title="Meals">🍽️</span>
                    <span title="Sightseeing">📸</span>
                    <span title="Transfer">🚗</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mmt-bottom">
                  <div>
                    <p className="mmt-price-label">All inclusive tour starts</p>
                    <h2 className="mmt-price">₹{item.price}</h2>
                  </div>

                  <Link to={`/packages/${item.id}`}>
                    <button className="mmt-btn">View</button>
                  </Link>
                </div>

                {/* Wishlist Toggle */}
                {!isSaved ? (
                  <button
                    className="btn btn-book"
                    style={{ width: "100%", marginTop: "12px" }}
                    onClick={() => addToWishlist(item)}
                  >
                    Save to Wishlist ❤️
                  </button>
                ) : (
                  <button
                    className="btn btn-cancel"
                    style={{ width: "100%", marginTop: "12px" }}
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Saved ❤️
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Packages;
