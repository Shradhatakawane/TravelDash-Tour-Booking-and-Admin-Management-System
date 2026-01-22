import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  const clearBookings = () => {
    const ok = window.confirm("Clear all bookings? ❌");
    if (!ok) return;

    localStorage.removeItem("bookings");
    setBookings([]);
    alert("Bookings cleared ✅");
  };

  return (
    <div className="container">
      <div className="page-head">
        <h1>My Bookings</h1>
        <p>Track your tour booking status and details</p>

        <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
          <Link to="/packages">
            <button className="btn btn-view">⬅ Back</button>
          </Link>

          {bookings.length > 0 && (
            <button className="btn btn-delete" onClick={clearBookings}>
              Clear Bookings
            </button>
          )}
        </div>
      </div>

      {bookings.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No bookings found 😢</h3>
      ) : (
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Tour</th>
                <th>Location</th>
                <th>Date</th>
                <th>Persons</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>{b.bookingId}</td>
                  <td>{b.packageTitle}</td>
                  <td>{b.location}</td>
                  <td>{b.date}</td>
                  <td>{b.persons}</td>
                  <td>₹ {b.totalPrice}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        b.status === "Confirmed"
                          ? "status-confirmed"
                          : b.status === "Cancelled"
                          ? "status-cancelled"
                          : "status-pending"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Bookings;
