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

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "16px",
      maxWidth: "600px",
      margin: "0 auto",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      marginBottom: "4px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#ccc",
      borderRadius: "8px",
      border: "none",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
    },
    buttonActive: {
      backgroundColor: "green",
    },
  };

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (userData && userData.token) {
      const isTokenValid =
        typeof userData.token === "string" && userData.token.length > 0;

      if (isTokenValid) {
        setFormData({
          client_name: userData.user?.name || "",
          mobile: userData.user?.mobile || "",
          email: userData.user?.email || "",
          query: "",
          products_id: "",
        });
      } else {
        navigate("/login"); // Redirect to login if token is invalid
      }
    } else {
      navigate("/login"); // Redirect to login if no user data or token is found
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

    screenshots.forEach((file) => {
      payload.append("screenshots[]", file);
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tickets",
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
    <div style={styles.container}>
      <h1 style={styles.title}>Raise a Ticket</h1>
      <p style={styles.subtitle}>Fill in the details to submit your ticket</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={styles.label}>Query:</label>
          <input
            type="text"
            name="query"
            value={formData.query}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label style={styles.label}>Product ID:</label>
          <input
            type="text"
            name="products_id"
            value={formData.products_id}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </div>
        <div>
          <label style={styles.label}>Screenshots:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={formData.query && formData.products_id ? { ...styles.button, ...styles.buttonActive } : styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TicketFormLogin;