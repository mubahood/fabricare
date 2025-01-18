import React from "react";
import { FaPhoneAlt, FaCheck, FaCloudUploadAlt } from "react-icons/fa";
import { Carousel } from "react-bootstrap"; // Using Bootstrap Carousel
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      {/* HERO SECTION */}
      <section
        className="py-5 text-light position-relative container"
        style={{
          background:
            "url('https://static.vecteezy.com/system/resources/thumbnails/038/949/537/small_2x/ai-generated-laundry-basket-with-dirty-clothes-on-blurred-background-of-washing-machine-photo.jpg') no-repeat center center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="overlay position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        ></div>
        <div className="container text-center py-5 position-relative">
          <h1 className="display-5 fw-bold">
            FabriCare: Your Trusted Partner for Laundry & Dry Cleaning
          </h1>
          <p className="lead mt-3">
            Seamless pickup and delivery, right to your doorstep. Save time and
            enjoy fresh, perfectly cleaned clothes without lifting a finger.
          </p>
          <div className="mt-4">
            <Link to="admin/dashboard" className="btn btn-primary btn-lg">
              Schedule Your Pickup
            </Link>
          </div>
          <div className="mt-4">
            <p className="fw-bold mb-0">Google Rating</p>
            <span className="text-warning fs-4">4.3 ★★★★☆</span>
          </div>
        </div>
      </section>

      {/* SERVICES/PRICING SECTION */}
      <section className="py-5" id="pricing">
        <div className="container text-center">
          <h2 className="fw-bold">The Best Laundry and Dry Cleaning Service</h2>
          <p className="text-muted">
            Wash & Fold: $2.10/lb | Pickup and Delivery: $10.99 | Quick
            Turnaround: 24 hours | 100% Satisfaction Guaranteed
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h3 className="mb-4 fw-bold">3+ Years of Excellence</h3>
          <div className="row g-4">
            <div className="col-md-3">
              <h4 className="fw-bold">1,250,000+</h4>
              <p>Lbs of laundry completed</p>
            </div>
            <div className="col-md-3">
              <h4 className="fw-bold">100,000+</h4>
              <p>Pickups successfully handled</p>
            </div>
            <div className="col-md-3">
              <h4 className="fw-bold">8,500+</h4>
              <p>Happy customers</p>
            </div>
            <div className="col-md-3">
              <h4 className="fw-bold">250,000+</h4>
              <p>Hours saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-5">
        <div className="container" id="business">
          <h2 className="fw-bold text-center mb-5">
            How It Works in 3 Easy Steps
          </h2>
          <div className="row g-5">
            <div className="col-md-4 text-center">
              <FaCheck size={50} className="text-primary mb-3" />
              <h5>You Schedule Your Pickup</h5>
              <p className="text-muted">
                Book a pickup time that fits your schedule. We'll come right to
                your door—no hassle, no waiting.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <FaCloudUploadAlt size={50} className="text-success mb-3" />
              <h5>Wash, Dry & Fold</h5>
              <p className="text-muted">
                We partner with professional laundromats and dry cleaners near
                you. Eco-friendly detergents, premium care.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <FaCheck size={50} className="text-primary mb-3" />
              <h5>We Drop Off Your Laundry</h5>
              <p className="text-muted">
                Enjoy clean, fresh laundry delivered back to you in 12–48 hours.
                Dry cleaning in 2–3 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORAGE SERVICES */}
      <section className="bg-light py-5" id="storage">
        <div className="container">
          <h2 className="fw-bold mb-4">Storage Services</h2>
          <p className="mb-4">
            <strong>Secure, Convenient, and Accessible</strong>. Store your
            out-of-season clothing or shoes with FabriCare and free up space at
            home.
          </p>
          <ul>
            <li>Shoes of any type</li>
            <li>Free pickup included</li>
            <li>Item inspection & tagging</li>
            <li>Photo catalog of stored items</li>
            <li>Clothing items (except wedding dresses)</li>
            <li>Delivery: $9.99 (no limit on item count)</li>
          </ul>
        </div>
      </section>

      {/* TIME SAVING */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold">Save Time with FabriCare</h2>
          <p>
            You could be saving <strong>9+ hours</strong> every month by letting
            us handle your laundry.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-light py-5" id="gift-cards">
        <div className="container">
          <h2 className="fw-bold mb-4">Frequently Asked Questions</h2>
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="faq1">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  How does the pricing work?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="faq1"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Our wash-and-fold service is $2.10 per pound. Pickup and
                  delivery is $12.99, but waived if &gt;28 lbs. Household and
                  dry cleaning are per item.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq2">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Are there any cancellation or rescheduling fees?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="faq2"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <a href="#learn-more">Click here to learn more</a>
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="faq3">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Are there any discounts for students, seniors, or customers
                  with disabilities?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="faq3"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  <a href="#learn-more">Click here to learn more</a>
                </div>
              </div>
            </div>

            {/* Add more FAQ items as needed */}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">What Our Customers Say</h2>
          <Carousel>
            <Carousel.Item>
              <div className="d-flex justify-content-center">
                <div className="text-center" style={{ maxWidth: "700px" }}>
                  <p className="fs-5">
                    “A little expensive for a senior, but they are efficient and
                    do a great job on laundry—very professional.”
                  </p>
                  <p className="fw-bold">— Robert Dabor, Toronto</p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex justify-content-center">
                <div className="text-center" style={{ maxWidth: "700px" }}>
                  <p className="fs-5">
                    “Used the service when our washing machine broke down—great
                    experience! Clothes came back smelling amazing and neatly
                    folded.”
                  </p>
                  <p className="fw-bold">— Alexandria Brown, Vancouver</p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="d-flex justify-content-center">
                <div className="text-center" style={{ maxWidth: "700px" }}>
                  <p className="fs-5">
                    “Excellent service. Ordered same-day, on time pickup and
                    drop-off. Highly recommend!”
                  </p>
                  <p className="fw-bold">— Ryan Punambolam, Vancouver</p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </section>

      {/* MOBILE APP PROMO */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Try Our Mobile App</h2>
          <p>
            Take care of all your laundry and dry cleaning needs with just a few
            taps.
          </p>
          <div className="mt-3">
            <a href="#app-store" className="btn btn-dark me-2">
              iOS – App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.laundary.app"
              target="_blank"
              className="btn btn-dark"
            >
              Android – Google Play
            </a>
          </div>
          <p className="mt-3">Doing laundry has never been simpler!</p>

          <hr></hr>
          <div className="mt-4">
            <Link to="admin/dashboard" className="btn btn-primary btn-lg">
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
