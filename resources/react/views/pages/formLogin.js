import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TicketFormLogin = () => {
  const [formData, setFormData] = useState({
    client_name: "",
    mobile: "",
    email: "",
    query: "",
    products_id: "",
  });
  const [screenshots, setScreenshots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user")); // Retrieve user data from sessionStorage
  
    if (userData && userData.token) {
      // Validate the token's existence and possibly its format or expiration
      const isTokenValid = userData.token && typeof userData.token === "string" && userData.token.length > 0;
  
      if (isTokenValid) {
        // Set form data if token and user details are valid
        setFormData({
          client_name: userData.user?.name || "",
          mobile: userData.user?.mobile || "",
          email: userData.user?.email || "",
          query: "",
          products_id: "",
        });
      } else {
        // Token is invalid, redirect to login
        navigate("/login");
      }
    } else {
      // No user data or token, redirect to login
      navigate("/login");
    }
  }, [navigate]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setScreenshots([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.query || !formData.products_id) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = new FormData();
    payload.append("client_name", formData.client_name);
    payload.append("mobile", formData.mobile);
    payload.append("email", formData.email);
    payload.append("query", formData.query);
    payload.append("products_id", formData.products_id);

    // Append all selected screenshots
    screenshots.forEach((file) => {
      payload.append("screenshots[]", file);
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tickets", // Update with your API endpoint
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Ticket submitted successfully!");
      navigate("/dashboard"); 
    } catch (error) {
      alert("Failed to submit ticket. Please try again.");
    }
  };

  return (
    <div>
      <h1>Raise a Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Query:</label>
          <input
            type="text"
            name="query"
            value={formData.query}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            name="products_id"
            value={formData.products_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Screenshots:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TicketFormLogin;
