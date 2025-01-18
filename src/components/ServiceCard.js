import React from "react";

function ServiceCard({ title, description, price, onOrder }) {
  return (
    <div className="card" style={{ width: "18rem", margin: "10px" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          <strong>Price: </strong>${price}
        </p>
        <button className="btn btn-primary" onClick={onOrder}>
          Order Now
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
