import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPackages, savePackages } from "../data/packages";

function AddPackage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    location: "",
    days: "",
    price: "",
    image: "",

    bestTime: "",
    bestForText: "",

    servicesText: "",
    whyFamousText: "",
    famousSpotsText: "",
    localFoodText: "",
    cultureText: "",
    travelTipsText: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!form.title || !form.location || !form.days || !form.price || !form.image) {
      alert("Please fill required fields ❗");
      return;
    }

    const old = getPackages();

    const newPkg = {
      id: Date.now(),
      title: form.title,
      location: form.location,
      days: form.days,
      price: Number(form.price),
      image: form.image,

      bestTime: form.bestTime || "Depends on season",
      bestFor: form.bestForText
        ? form.bestForText.split(",").map((x) => x.trim()).filter(Boolean)
        : ["Family", "Couples", "Friends"],

      services: form.servicesText
        ? form.servicesText.split(",").map((x) => x.trim()).filter(Boolean)
        : [],

      whyFamous: form.whyFamousText
        ? form.whyFamousText.split(",").map((x) => x.trim()).filter(Boolean)
        : [],

      famousSpots: form.famousSpotsText
        ? form.famousSpotsText.split(",").map((x) => x.trim()).filter(Boolean)
        : [],

      localFood: form.localFoodText
        ? form.localFoodText.split(",").map((x) => x.trim()).filter(Boolean)
        : [],

      culture: form.cultureText
        ? form.cultureText.split(",").map((x) => x.trim()).filter(Boolean)
        : [],

      travelTips: form.travelTipsText
        ? form.travelTipsText.split(",").map((x) => x.trim()).filter(Boolean)
        : [],
    };

    const updated = [...old, newPkg];
    savePackages(updated);

    alert("Package Added Successfully ✅");
    navigate("/admin-packages");
  };

  return (
    <div className="container">
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Add Package</h1>
          <p className="admin-subtitle">
            Add complete tour details so View page shows real information
          </p>
        </div>

        <Link to="/admin-packages">
          <button className="btn btn-view">Back</button>
        </Link>
      </div>

      {/* ✅ UI FIX ONLY (NO LOGIC CHANGE) */}
      <form onSubmit={handleAdd} className="admin-form-wrap">
        {/* BASIC */}
        <div className="admin-form-card">
          <h2 className="admin-form-title">Basic Details</h2>

          <div className="admin-form-grid">
            <input
              className="input"
              name="title"
              placeholder="Title *"
              value={form.title}
              onChange={handleChange}
            />

            <input
              className="input"
              name="location"
              placeholder="Location * (example: Paris, France)"
              value={form.location}
              onChange={handleChange}
            />

            <input
              className="input"
              name="days"
              placeholder="Days * (example: 5D / 4N)"
              value={form.days}
              onChange={handleChange}
            />

            <input
              className="input"
              name="price"
              type="number"
              placeholder="Price *"
              value={form.price}
              onChange={handleChange}
            />

            <input
              className="input admin-full"
              name="image"
              placeholder="Image URL *"
              value={form.image}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* EXTRA */}
        <div className="admin-form-card">
          <h2 className="admin-form-title">Extra Tour Details</h2>

          <div className="admin-form-grid">
            <input
              className="input"
              name="bestTime"
              placeholder="Best Time (example: Apr - Jun)"
              value={form.bestTime}
              onChange={handleChange}
            />

            <input
              className="input"
              name="bestForText"
              placeholder="Best For (comma separated) (example: Couples, Family, Friends)"
              value={form.bestForText}
              onChange={handleChange}
            />

            <input
              className="input admin-full"
              name="servicesText"
              placeholder="Services Included (comma separated)"
              value={form.servicesText}
              onChange={handleChange}
            />

            <input
              className="input admin-full"
              name="whyFamousText"
              placeholder="Why This Tour is Famous (comma separated)"
              value={form.whyFamousText}
              onChange={handleChange}
            />

            <input
              className="input admin-full"
              name="famousSpotsText"
              placeholder="Top Famous Spots (comma separated)"
              value={form.famousSpotsText}
              onChange={handleChange}
            />

            <input
              className="input admin-full"
              name="localFoodText"
              placeholder="Local Foods to Try (comma separated)"
              value={form.localFoodText}
              onChange={handleChange}
            />

            <input
              className="input admin-full"
              name="cultureText"
              placeholder="Culture & Experience (comma separated)"
              value={form.cultureText}
              onChange={handleChange}
            />

            <input
              className="input admin-full"
              name="travelTipsText"
              placeholder="Travel Tips (comma separated)"
              value={form.travelTipsText}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button className="btn btn-confirm admin-submit-btn">
          Add Package ✅
        </button>
      </form>
    </div>
  );
}

export default AddPackage;
