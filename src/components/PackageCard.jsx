import { Link } from "react-router-dom";

function PackageCard({ item }) {
  return (
    <div className="tour-card">
      <div className="tour-img-wrap">
        <img src={item.image} alt={item.title} className="tour-img" />

        <div className="tour-badge">{item.days}</div>
      </div>

      <div className="tour-content">
        <h3 className="tour-title">{item.title}</h3>
        <p className="tour-location">📍 {item.location}</p>

        <div className="tour-bottom">
          <div>
            <p className="tour-price-label">Starting from</p>
            <h3 className="tour-price">₹ {item.price}</h3>
          </div>

          <Link to={`/packages/${item.id}`}>
            <button className="tour-btn">View</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;
