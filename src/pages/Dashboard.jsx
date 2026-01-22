import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

function Dashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  const updateBookings = (newBookings) => {
    setBookings(newBookings);
    localStorage.setItem("bookings", JSON.stringify(newBookings));
  };

  // Email Demo
  const sendEmailNotification = (type, booking) => {
    if (!booking) return;

    const subject =
      type === "confirm"
        ? "Booking Confirmed"
        : type === "cancel"
        ? "Booking Cancelled"
        : "Booking Deleted";

    alert(
      `📩 Email Sent\n\nTo: ${booking.email}\nSubject: ${subject}\nTour: ${booking.packageTitle}`
    );
  };

  const confirmBooking = (bookingId) => {
    const booking = bookings.find((b) => b.bookingId === bookingId);

    const updated = bookings.map((b) =>
      b.bookingId === bookingId ? { ...b, status: "Confirmed" } : b
    );

    updateBookings(updated);
    sendEmailNotification("confirm", booking);
  };

  const cancelBooking = (bookingId) => {
    const booking = bookings.find((b) => b.bookingId === bookingId);

    const updated = bookings.map((b) =>
      b.bookingId === bookingId ? { ...b, status: "Cancelled" } : b
    );

    updateBookings(updated);
    sendEmailNotification("cancel", booking);
  };

  const deleteBooking = (bookingId) => {
    const booking = bookings.find((b) => b.bookingId === bookingId);

    const updated = bookings.filter((b) => b.bookingId !== bookingId);
    updateBookings(updated);
    sendEmailNotification("delete", booking);
  };

  const clearAllBookings = () => {
    const ok = window.confirm("Clear ALL bookings? This cannot be undone ❌");
    if (!ok) return;

    localStorage.removeItem("bookings");
    setBookings([]);
    alert("All bookings cleared ✅");
  };

  const clearAllPackages = () => {
    const ok = window.confirm("Reset ALL packages? ❌");
    if (!ok) return;

    localStorage.removeItem("packages");
    alert("Packages reset 🔄");
  };

  const exportBookingsCSV = () => {
    if (bookings.length === 0) {
      alert("No bookings available to export ❌");
      return;
    }

    const headers = [
      "Booking ID",
      "Tour Name",
      "Location",
      "Customer Name",
      "Phone",
      "Email",
      "Persons",
      "Date",
      "Price Per Person",
      "Base Total",
      "Addons Total",
      "Grand Total",
      "Status",
    ];

    const rows = bookings.map((b) => [
      b.bookingId,
      b.packageTitle,
      b.location,
      b.name,
      b.phone,
      b.email,
      b.persons,
      b.date,
      b.pricePerPerson || b.price || 0,
      b.baseTotal || 0,
      b.addonsTotal || 0,
      b.totalPrice || 0,
      b.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "bookings.csv");
  };

  const downloadInvoicePDF = (booking) => {
    if (!booking) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("TravelDash Invoice 🧾", 20, 20);

    doc.setFontSize(12);
    doc.text(`Invoice ID: INV-${booking.bookingId}`, 20, 35);
    doc.text(`Booking Date: ${booking.date}`, 20, 43);

    doc.text("Customer Details:", 20, 58);
    doc.text(`Name: ${booking.name}`, 20, 66);
    doc.text(`Phone: ${booking.phone}`, 20, 74);
    doc.text(`Email: ${booking.email}`, 20, 82);

    doc.text("Tour Details:", 20, 98);
    doc.text(`Tour: ${booking.packageTitle}`, 20, 106);
    doc.text(`Location: ${booking.location}`, 20, 114);
    doc.text(`Persons: ${booking.persons}`, 20, 122);
    doc.text(`Status: ${booking.status}`, 20, 130);

    doc.setFontSize(12);
    doc.text(
      `Price Per Person: ₹ ${booking.pricePerPerson || booking.price}`,
      20,
      144
    );
    doc.text(`Base Total: ₹ ${booking.baseTotal || 0}`, 20, 152);
    doc.text(`Add-ons Total: ₹ ${booking.addonsTotal || 0}`, 20, 160);

    doc.setFontSize(14);
    doc.text(`Grand Total: ₹ ${booking.totalPrice || 0}`, 20, 172);

    doc.save(`Invoice_INV-${booking.bookingId}.pdf`);
  };

  const openBookingModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const closeBookingModal = () => {
    setSelectedBooking(null);
    setShowModal(false);
  };

  // Stats
  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
    const cancelled = bookings.filter((b) => b.status === "Cancelled").length;
    const pending = bookings.filter((b) => b.status === "Pending").length;

    const revenue = bookings
      .filter((b) => b.status === "Confirmed")
      .reduce((sum, b) => sum + Number(b.totalPrice || 0), 0);

    return { total, confirmed, cancelled, pending, revenue };
  }, [bookings]);

  // Filtered
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchSearch =
        b.packageTitle?.toLowerCase().includes(searchText.toLowerCase()) ||
        b.location?.toLowerCase().includes(searchText.toLowerCase()) ||
        b.name?.toLowerCase().includes(searchText.toLowerCase());

      const matchStatus =
        statusFilter === "All" ? true : b.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [bookings, searchText, statusFilter]);

  return (
    <div className="container">
      {/* Header */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Admin Dashboard</h1>
          <p className="dash-subtitle">
            Track bookings, manage packages, export reports and invoices.
          </p>
        </div>

        <div className="dash-actions">
          <button className="btn btn-view" onClick={() => navigate("/add-package")}>
            + Add Package
          </button>

          <button className="btn btn-book" onClick={() => navigate("/admin-packages")}>
            Manage Packages
          </button>

          <button className="btn btn-confirm" onClick={exportBookingsCSV}>
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="dash-stats">
        <div className="dash-stat-card">
          <p>Total Bookings</p>
          <h2>{stats.total}</h2>
        </div>

        <div className="dash-stat-card">
          <p>Pending</p>
          <h2>{stats.pending}</h2>
        </div>

        <div className="dash-stat-card">
          <p>Confirmed</p>
          <h2>{stats.confirmed}</h2>
        </div>

        <div className="dash-stat-card">
          <p>Cancelled</p>
          <h2>{stats.cancelled}</h2>
        </div>

        <div className="dash-stat-card">
          <p>Revenue</p>
          <h2>₹ {stats.revenue}</h2>
        </div>
      </div>

      {/* Filters */}
      <div className="dash-filterbar">
        <input
          className="input"
          placeholder="Search by tour, customer or location..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ maxWidth: "220px" }}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button className="btn btn-cancel" onClick={clearAllPackages}>
          Reset Packages
        </button>

        <button className="btn btn-delete" onClick={clearAllBookings}>
          Clear Bookings
        </button>
      </div>

      {/* Table */}
      <div className="dash-table">
        {filteredBookings.length === 0 ? (
          <div className="dash-empty">
            <h3>No bookings found ❌</h3>
            <p>Try changing search or filter.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tour</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Persons</th>
                <th>Grand Total</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.bookingId}>
                  <td>
                    <div className="dash-cell-title">{b.packageTitle}</div>
                    <div className="dash-cell-sub">{b.location}</div>
                  </td>

                  <td>
                    <div className="dash-cell-title">{b.name}</div>
                    <div className="dash-cell-sub">{b.phone}</div>
                  </td>

                  <td>{b.date}</td>
                  <td>{b.persons}</td>

                  <td>
                    <b>₹ {b.totalPrice}</b>
                    <div style={{ fontSize: "12px", color: "gray" }}>
                      Base ₹{b.baseTotal} + Add-ons ₹{b.addonsTotal}
                    </div>
                  </td>

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

                  <td style={{ textAlign: "right" }}>
                    <div className="dash-action-row">
                      <button className="btn btn-view" onClick={() => openBookingModal(b)}>
                        View
                      </button>

                      <button className="btn btn-book" onClick={() => downloadInvoicePDF(b)}>
                        Invoice
                      </button>

                      <button className="btn btn-confirm" onClick={() => confirmBooking(b.bookingId)}>
                        Confirm
                      </button>

                      <button className="btn btn-cancel" onClick={() => cancelBooking(b.bookingId)}>
                        Cancel
                      </button>

                      <button className="btn btn-delete" onClick={() => deleteBooking(b.bookingId)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedBooking && (
        <div className="dash-modal-overlay" onClick={closeBookingModal}>
          <div className="dash-modal" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>Booking Details</h2>

            <div className="dash-modal-grid">
              <p>
                <b>Tour:</b> {selectedBooking.packageTitle}
              </p>
              <p>
                <b>Location:</b> {selectedBooking.location}
              </p>
              <p>
                <b>Customer:</b> {selectedBooking.name}
              </p>
              <p>
                <b>Phone:</b> {selectedBooking.phone}
              </p>
              <p>
                <b>Email:</b> {selectedBooking.email}
              </p>
              <p>
                <b>Date:</b> {selectedBooking.date}
              </p>
              <p>
                <b>Persons:</b> {selectedBooking.persons}
              </p>

              <p>
                <b>Price Per Person:</b> ₹ {selectedBooking.pricePerPerson}
              </p>
              <p>
                <b>Base Total:</b> ₹ {selectedBooking.baseTotal}
              </p>
              <p>
                <b>Add-ons Total:</b> ₹ {selectedBooking.addonsTotal}
              </p>
              <p>
                <b>Grand Total:</b> ₹ {selectedBooking.totalPrice}
              </p>

              {/* ✅ Show addons list */}
              <p style={{ marginBottom: 6 }}>
                <b>Selected Add-ons:</b>
              </p>

              {selectedBooking.selectedAddons &&
              selectedBooking.selectedAddons.length > 0 ? (
                <ul style={{ marginTop: 0, paddingLeft: "18px" }}>
                  {selectedBooking.selectedAddons.map((a, i) => (
                    <li key={i}>
                      {a.name} — ₹{a.price}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ marginTop: 0, color: "gray" }}>No add-ons selected</p>
              )}

              <p>
                <b>Status:</b> {selectedBooking.status}
              </p>
            </div>

            <button
              className="btn btn-delete"
              style={{ width: "100%" }}
              onClick={closeBookingModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
