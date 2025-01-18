import React from "react";

function OrderModal({ service, onClose }) {
  if (!service) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2>{service.title}</h2>
        <p>{service.description}</p>
        <p>
          <strong>Price: </strong>${service.price}
        </p>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default OrderModal;
