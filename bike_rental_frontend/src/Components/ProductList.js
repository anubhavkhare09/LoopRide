import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductList.css";
import CustomerNavbar from "./CustomerNavbar";

function ProductList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.get(
          `http://localhost:8080/admin/getVehicleByCategory/${id}`,
          config
        );
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const handleSubmit = (product, startDate, endDate) => {
    if (!startDate || !endDate) {
      toast.error("Please select valid dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (differenceInDays <= 0) {
      toast.error("End date should be later than the start date.");
      return;
    }

    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      toast.warn("Please login to add items to the cart.", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    const totalPrice = differenceInDays * product.price;

    const rentalData = {
      vehicleId: product.vehicleId,
      vehicleName: product.vehicleName,
      pricePerDay: product.price,
      startDate,
      endDate,
      totalPrice,
    };

    navigate("/payment", { state: rentalData });
  };

  return (
    <div>
      <CustomerNavbar/>
      <ToastContainer />
      <div className="product-list-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.productId}>
              {product.productImage && (
                <img
                  src={`data:image/png;base64,${product.productImage}`}
                  alt={product.vehicleName}
                  className="product-image"
                />
              )}
              <h3 className="product-name">{product.vehicleName}</h3>
              <p className="product-price">Rs. {product.price} per day</p>
              <p className="product-description">{product.description}</p>

              {/* Date Selection within Product Card */}
              <div className="date-selection">
                <label>
                  Start Date:
                  <input
                    type="date"
                    onChange={(e) => (product.startDate = e.target.value)}
                  />
                </label>
                <label>
                  End Date:
                  <input
                    type="date"
                    onChange={(e) => (product.endDate = e.target.value)}
                  />
                </label>
              </div>

              <button
                className="add-to-cart-button"
                onClick={() =>
                  handleSubmit(product, product.startDate, product.endDate)
                }
                disabled={product.quantity === 0}
                style={{
                  backgroundColor: product.quantity === 0 ? "red" : "#007bff",
                  color: "white",
                  cursor: product.quantity === 0 ? "not-allowed" : "pointer",
                }}
              >
                {product.quantity === 0 ? "Not Available" : "Rent"}
              </button>
            </div>
          ))
        ) : (
          <p>No vehicle found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
