import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getPackages, savePackages } from "../data/packages";

function EditPackage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    days: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const packages = getPackages();
    const selected = packages.find((p) => p.id === parseInt(id));

    if (!selected) {
      alert("Package not found ❌");
      navigate("/admin-packages");
      return;
    }

    setFormData({
      title: selected.title,
      location: selected.location,
      days: selected.days,
      price: selected.price,
      image: selected.image,
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const oldPackages = getPackages();

    const updatedPackages = oldPackages.map((p) =>
      p.id === parseInt(id)
        ? {
            ...p,
            title: formData.title,
            location: formData.location,
            days: formData.days,
            price: parseInt(formData.price),
            image: formData.image,
          }
        : p
    );

    savePackages(updatedPackages);

    alert("Package Updated Successfully ✅");
    navigate("/admin-packages");
  };

  return (
    <div className="container">
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Edit Package ✏️</h1>
          <p className="admin-subtitle">Update your package details</p>
        </div>

        <Link to="/admin-packages">
          <button className="btn btn-view">Back</button>
        </Link>
      </div>

      <div className="admin-form-card" style={{ maxWidth: "520px", margin: "0 auto" }}>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="title"
            placeholder="Package Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            type="text"
            name="days"
            placeholder="Duration (Example: 3 Days / 2 Nights)"
            value={formData.days}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="input"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
            className="input"
          />

          <button type="submit" className="btn-primary">
            Update Package ✅
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPackage;
