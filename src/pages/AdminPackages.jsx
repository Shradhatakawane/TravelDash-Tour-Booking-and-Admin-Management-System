import { useEffect, useState } from "react";
import { getPackages, savePackages } from "../data/packages";
import { Link } from "react-router-dom";

function AdminPackages() {
  const [packages, setPackages] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    setPackages(getPackages());
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete? ❌");
    if (!confirmDelete) return;

    const updated = packages.filter((p) => p.id !== id);
    setPackages(updated);
    savePackages(updated);

    alert("Package Deleted Successfully 🗑️");
  };

  const openEdit = (pkg) => {
    setEditData({
      ...pkg,

      bestForText: (pkg.bestFor || []).join(", "),
      servicesText: (pkg.services || []).join(", "),
      whyFamousText: (pkg.whyFamous || []).join(", "),
      famousSpotsText: (pkg.famousSpots || []).join(", "),
      localFoodText: (pkg.localFood || []).join(", "),
      cultureText: (pkg.culture || []).join(", "),
      travelTipsText: (pkg.travelTips || []).join(", "),
    });

    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setEditData(null);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    if (
      !editData.title ||
      !editData.location ||
      !editData.days ||
      !editData.price ||
      !editData.image
    ) {
      alert("Please fill required fields ❗");
      return;
    }

    const updatedPackages = packages.map((p) =>
      p.id === editData.id
        ? {
            ...p,
            title: editData.title,
            location: editData.location,
            days: editData.days,
            price: Number(editData.price),
            image: editData.image,

            bestTime: editData.bestTime || "Depends on season",

            bestFor: editData.bestForText
              ? editData.bestForText
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
              : [],

            services: editData.servicesText
              ? editData.servicesText
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
              : [],

            whyFamous: editData.whyFamousText
              ? editData.whyFamousText
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
              : [],

            famousSpots: editData.famousSpotsText
              ? editData.famousSpotsText
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
              : [],

            localFood: editData.localFoodText
              ? editData.localFoodText
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
              : [],

            culture: editData.cultureText
              ? editData.cultureText
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
              : [],

            travelTips: editData.travelTipsText
              ? editData.travelTipsText
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
              : [],
          }
        : p
    );

    setPackages(updatedPackages);
    savePackages(updatedPackages);

    alert("Package Updated Successfully ✅");
    closeEdit();
  };

  return (
    <div className="container">
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Manage Packages </h1>
        </div>

        <div className="admin-top-actions">
          <Link to="/add-package">
            <button className="btn btn-confirm">+ Add Package</button>
          </Link>
        </div>
      </div>

      {packages.length === 0 ? (
        <div className="admin-empty">
          <h3>No Packages Found ❌</h3>
          <p>Add a package from Admin Dashboard</p>
        </div>
      ) : (
        <div className="admin-grid">
          {packages.map((item) => (
            <div key={item.id} className="admin-card">
              <div className="admin-img-wrap">
                <img src={item.image} alt={item.title} className="admin-img" />
              </div>

              <div className="admin-card-body">
                <h3 className="admin-card-title">{item.title}</h3>
                <p className="admin-card-sub">
                  📍 {item.location} • {item.days}
                </p>

                <h2 className="admin-price">₹{item.price}</h2>

                <div className="admin-btn-row admin-btn-row-2">
                  <button
                    className="btn btn-view"
                    onClick={() => openEdit(item)}
                  >
                    Edit ✏️
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-delete"
                  >
                    Delete 🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ SAME MODAL LOGIC, ONLY RESPONSIVE UI FIX */}
      {showEdit && editData && (
        <div className="dash-modal-overlay" onClick={closeEdit}>
          <div className="dash-modal admin-edit-modal" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>Edit Package ✏️</h2>

            <div className="admin-modal-body">
              <div className="admin-modal-grid">
                <input
                  className="input"
                  name="title"
                  placeholder="Title *"
                  value={editData.title}
                  onChange={handleEditChange}
                />

                <input
                  className="input"
                  name="location"
                  placeholder="Location *"
                  value={editData.location}
                  onChange={handleEditChange}
                />

                <input
                  className="input"
                  name="days"
                  placeholder="Days *"
                  value={editData.days}
                  onChange={handleEditChange}
                />

                <input
                  className="input"
                  name="price"
                  type="number"
                  placeholder="Price *"
                  value={editData.price}
                  onChange={handleEditChange}
                />

                <input
                  className="input admin-full"
                  name="image"
                  placeholder="Image URL *"
                  value={editData.image}
                  onChange={handleEditChange}
                />

                <input
                  className="input"
                  name="bestTime"
                  placeholder="Best Time"
                  value={editData.bestTime || ""}
                  onChange={handleEditChange}
                />

                <input
                  className="input"
                  name="bestForText"
                  placeholder="Best For (comma separated)"
                  value={editData.bestForText}
                  onChange={handleEditChange}
                />

                <input
                  className="input admin-full"
                  name="servicesText"
                  placeholder="Services Included (comma separated)"
                  value={editData.servicesText}
                  onChange={handleEditChange}
                />

                <input
                  className="input admin-full"
                  name="whyFamousText"
                  placeholder="Why Famous (comma separated)"
                  value={editData.whyFamousText}
                  onChange={handleEditChange}
                />

                <input
                  className="input admin-full"
                  name="famousSpotsText"
                  placeholder="Famous Spots (comma separated)"
                  value={editData.famousSpotsText}
                  onChange={handleEditChange}
                />

                <input
                  className="input admin-full"
                  name="localFoodText"
                  placeholder="Local Foods (comma separated)"
                  value={editData.localFoodText}
                  onChange={handleEditChange}
                />

                <input
                  className="input admin-full"
                  name="cultureText"
                  placeholder="Culture & Experience (comma separated)"
                  value={editData.cultureText}
                  onChange={handleEditChange}
                />

                <input
                  className="input admin-full"
                  name="travelTipsText"
                  placeholder="Travel Tips (comma separated)"
                  value={editData.travelTipsText}
                  onChange={handleEditChange}
                />
              </div>
            </div>

            <div className="admin-modal-actions">
              <button className="btn btn-delete" onClick={closeEdit}>
                Cancel ❌
              </button>

              <button className="btn btn-confirm" onClick={saveEdit}>
                Save Changes ✅
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPackages;
