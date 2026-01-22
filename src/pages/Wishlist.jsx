import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist (always refresh)
  useEffect(() => {
    const loadWishlist = () => {
      const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(stored);
    };

    loadWishlist();
    window.addEventListener("storage", loadWishlist);

    return () => window.removeEventListener("storage", loadWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    alert("Removed from Wishlist ");
  };

  const clearWishlist = () => {
    const ok = window.confirm("Clear Wishlist? ");
    if (!ok) return;

    localStorage.removeItem("wishlist");
    setWishlist([]);
    alert("Wishlist Cleared ✅");
  };

  return (
    <div className="container">
      <div className="page-head">
        <h1>My Wishlist ❤️</h1>
        <p>Saved packages that you want to book later</p>

        <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
          <Link to="/packages">
            <button className="btn btn-view">⬅ Back</button>
          </Link>

          {wishlist.length > 0 && (
            <button className="btn btn-delete" onClick={clearWishlist}>
              Clear Wishlist
            </button>
          )}
        </div>
      </div>

      {wishlist.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No packages saved 😢</h3>
      ) : (
        <div className="mmt-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="mmt-card">
              <div className="mmt-img-wrap">
                <img src={item.image} alt={item.title} className="mmt-img" />
                <div className="mmt-duration">{item.days}</div>
              </div>

              <div className="mmt-content">
                <h3 className="mmt-title">{item.title}</h3>
                <p style={{ color: "gray", marginTop: "6px" }}>
                  {item.location}
                </p>

                <h2 className="mmt-price" style={{ marginTop: "10px" }}>
                  ₹{item.price}
                </h2>

                <Link to={`/packages/${item.id}`}>
                  <button
                    className="btn btn-confirm"
                    style={{ width: "100%", marginTop: "12px" }}
                  >
                    Book Now
                  </button>
                </Link>

                <button
                  className="btn btn-delete"
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
