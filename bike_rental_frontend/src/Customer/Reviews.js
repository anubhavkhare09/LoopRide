import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsStarFill, BsPlusCircleFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  // Fetch Reviews from API
  useEffect(() => {
    axios
      .get("http://localhost:8080/customer/getAllFeedback")
      .then((response) => setReviews(response.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
    <div>
      <CustomerNavbar />
      <ToastContainer />
      <div className="p-5 bg-light min-vh-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Customer Reviews</h2>
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => {
              const userId = sessionStorage.getItem("userId");
              if (!userId) {
                toast.warn("You must be logged in to add a review!", {
                  autoClose: 1000,
                });
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              } else {
                navigate("/customer/addreview");
              }
            }}
          >
            <BsPlusCircleFill size={20} className="me-2" />
            Add Review
          </button>
        </div>

        {/* Render Reviews */}
        {reviews.length > 0 ? (
          <div className="row">
            {reviews.map((review) => (
              <div key={review.feedbackId} className="col-md-6 mb-4">
                <div className="card p-3 shadow-sm">
                  <h5 className="card-title fw-bold">{review.userName}</h5>
                  <p className="card-text text-muted">{review.comment}</p>
                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No reviews available yet.</p>
        )}
      </div>
    </div>
  );
}

export default Reviews;
