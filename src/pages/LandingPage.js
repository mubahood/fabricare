import React from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-bootstrap";
import {
  FaPhoneAlt,
  FaCheck,
  FaCloudUploadAlt,
  FaTshirt,
  FaShippingFast,
  FaStar,
  FaRegClock,
  FaBox,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden">
        <div className="background-overlay"></div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="container text-center py-5 position-relative"
        >
          <h1 className="display-4 fw-bold text-white mb-4">
            FabriCare: Your Trusted Partner for Laundry & Dry Cleaning
          </h1>
          <motion.p variants={slideUp} className="lead text-white mb-5">
            Seamless pickup and delivery, right to your doorstep. Save time and
            enjoy fresh, perfectly cleaned clothes without lifting a finger.
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/orders/new"
              className="btn btn-lg btn-primary px-5 py-3 shadow-lg"
            >
              Schedule Your Pickup
            </Link>
          </motion.div>
          <motion.div variants={slideUp} className="rating-badge mt-4">
            <div className="stars">
              <FaStar className="text-warning" />
              <FaStar className="text-warning" />
              <FaStar className="text-warning" />
              <FaStar className="text-warning" />
              <FaStar className="text-warning" />
            </div>
            <div className="text-white small mt-2">Google Rating 4.3</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={slideUp}
            className="fw-bold mb-4"
          >
            The Best Laundry and Dry Cleaning Service
          </motion.h2>
          <motion.div
            className="row g-4"
            initial="hidden"
            whileInView="visible"
            variants={slideUp}
          >
            <div className="col-md-3">
              <FaTshirt className="text-primary mb-3 display-5" />
              <h4>Wash & Fold</h4>
              <p className="text-muted">
                Professional care for everyday laundry
              </p>
            </div>
            <div className="col-md-3">
              <FaRegClock className="text-success mb-3 display-5" />
              <h4>Quick Turnaround</h4>
              <p className="text-muted">24-hour service available</p>
            </div>
            <div className="col-md-3">
              <FaShippingFast className="text-info mb-3 display-5" />
              <h4>Free Pickup</h4>
              <p className="text-muted">Convenient scheduling</p>
            </div>
            <div className="col-md-3">
              <FaCheck className="text-danger mb-3 display-5" />
              <h4>Satisfaction</h4>
              <p className="text-muted">100% Guaranteed</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-5">
        <div className="container text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={slideUp}
            className="fw-bold mb-5"
          >
            3+ Years of Excellence
          </motion.h2>
          <div className="row g-4">
            {[
              { number: "1,250,000+", label: "Lbs of laundry completed" },
              { number: "100,000+", label: "Pickups handled" },
              { number: "8,500+", label: "Happy customers" },
              { number: "250,000+", label: "Hours saved" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="col-md-3"
                initial="hidden"
                whileInView="visible"
                variants={slideUp}
              >
                <div className="stat-card p-4">
                  <h3 className="fw-bold text-primary">{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-light">
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={slideUp}
            className="fw-bold text-center mb-5"
          >
            How It Works in 3 Easy Steps
          </motion.h2>
          <div className="row g-5">
            {[
              {
                icon: <FaCheck className="text-primary" />,
                title: "You Schedule Your Pickup",
                text: "Book a pickup time that fits your schedule. We'll come right to your door—no hassle, no waiting.",
              },
              {
                icon: <FaCloudUploadAlt className="text-success" />,
                title: "Wash, Dry & Fold",
                text: "We partner with professional laundromats and dry cleaners near you. Eco-friendly detergents, premium care.",
              },
              {
                icon: <FaCheck className="text-primary" />,
                title: "We Drop Off Your Laundry",
                text: "Enjoy clean, fresh laundry delivered back to you in 12–48 hours. Dry cleaning in 2–3 business days.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="col-md-4 text-center"
                initial="hidden"
                whileInView="visible"
                variants={slideUp}
              >
                <div className="step-card p-4 h-100">
                  <div className="icon-wrapper mb-4">{step.icon}</div>
                  <h5>{step.title}</h5>
                  <p className="text-muted">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Storage Services */}
      <section className="py-5">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" variants={slideUp}>
            <h2 className="fw-bold mb-4">Storage Services</h2>
            <p className="lead">
              <strong>Secure, Convenient, and Accessible</strong>. Store your
              out-of-season clothing or shoes with FabriCare and free up space
              at home.
            </p>
            <div className="row g-4 mt-4">
              <div className="col-md-6">
                <ul className="benefits-list">
                  <li>
                    <FaCheck className="text-success me-2" />
                    Shoes of any type
                  </li>
                  <li>
                    <FaCheck className="text-success me-2" />
                    Free pickup included
                  </li>
                  <li>
                    <FaCheck className="text-success me-2" />
                    Item inspection & tagging
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="benefits-list">
                  <li>
                    <FaCheck className="text-success me-2" />
                    Photo catalog of stored items
                  </li>
                  <li>
                    <FaCheck className="text-success me-2" />
                    Clothing items (except wedding dresses)
                  </li>
                  <li>
                    <FaCheck className="text-success me-2" />
                    Delivery: $9.99 (no limit on item count)
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-light">
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={slideUp}
            className="fw-bold text-center mb-5"
          >
            What Our Customers Say
          </motion.h2>
          <Carousel fade>
            {[
              {
                text: "A little expensive for a senior, but they are efficient and do a great job on laundry—very professional.",
                author: "Robert Dabor, Toronto",
              },
              {
                text: "Used the service when our washing machine broke down—great experience! Clothes came back smelling amazing and neatly folded.",
                author: "Alexandria Brown, Vancouver",
              },
              {
                text: "Excellent service. Ordered same-day, on time pickup and drop-off. Highly recommend!",
                author: "Ryan Punambolam, Vancouver",
              },
            ].map((testimonial, index) => (
              <Carousel.Item key={index}>
                <motion.div
                  className="testimonial-card text-center p-4"
                  variants={fadeIn}
                >
                  <p className="fs-5">"{testimonial.text}"</p>
                  <p className="fw-bold mt-3">{testimonial.author}</p>
                </motion.div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Mobile CTA */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <motion.div initial="hidden" whileInView="visible" variants={slideUp}>
            <h2 className="fw-bold mb-4">Try Our Mobile App</h2>
            <p className="mb-4">
              Take care of all your laundry and dry cleaning needs with just a
              few taps.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <motion.button
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.laundary.app",
                    "_blank"
                  )
                }
                className="btn btn-light px-4 py-2"
                whileHover={{ scale: 1.05 }}
              >
                iOS – App Store
              </motion.button>
              <motion.button
                className="btn btn-outline-light px-4 py-2"
                whileHover={{ scale: 1.05 }}
                onClick={() =>
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.laundary.app",
                    "_blank"
                  )
                }
              >
                Android – Google Play
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

// Add these styles
const styles = `
.hero-section {
  padding: 120px 0;
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
              url('https://static.vecteezy.com/system/resources/thumbnails/038/949/537/small_2x/ai-generated-laundry-basket-with-dirty-clothes-on-blurred-background-of-washing-machine-photo.jpg') center/cover;
}

.stat-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
}

.step-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  .icon-wrapper {
    font-size: 2.5rem;
  }
}

.testimonial-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin: 0 1rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.benefits-list {
  list-style: none;
  padding-left: 0;
  li {
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 80px 0;
  }
  .display-4 {
    font-size: 2rem;
  }
}
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
