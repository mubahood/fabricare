import React, { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/services");
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      if (!response.ok) throw new Error("Failed to fetch services");
      const data = await response.json();
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h1 className="my-4">Our Services</h1>
      {/* re-button to load */}
      <button className="btn btn-success" onClick={() => fetchServices()}>
        RE-LOAD
      </button>
      {services.length === 0 ? (
        <p>No services available at the moment. Please check back later.</p>
      ) : (
        <div className="d-flex flex-wrap">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              price={service.price}
              description="Premium laundry service."
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;
