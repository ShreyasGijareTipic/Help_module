import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "16px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "16px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "24px",
  },
  th: {
    border: "1px solid #ccc",
    padding: "10px",
    background: "#f4f4f4",
    textAlign: "center",
  },
  td: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
  },
  img: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    marginRight: "8px",
  },
  button: {
    padding: "8px 12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    minWidth: "80px",
  },
  deleteButton: {
    padding: "8px 12px",
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    minWidth: "80px",
  },
  actionContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
};

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/tickets");
        setTickets(response.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError("Unable to fetch tickets.");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleDelete = async (ticketId) => {
    try {
      console.log("Deleting ticket with ID:", ticketId);

      const response = await axios.delete(
        `http://127.0.0.1:8000/api/tickets/${ticketId}`
      );

      if (response.status === 200) {
        alert(`Ticket ${ticketId} deleted successfully`);
        setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
      }
    } catch (error) {
      console.error("Error while deleting ticket:", error);
      alert("Failed to delete ticket");
    }
  };

  const handleAssign = (ticketId) => {
    console.log("Navigating to assign page with ID:", ticketId);
    navigate(`/Assign/${ticketId}`);
  };

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Ticket Management</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Ticket ID</th>
            <th style={styles.th}>Product ID</th>
            <th style={styles.th}>Client Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Mobile</th>
            <th style={styles.th}>Query</th>
            <th style={styles.th}>Screenshots</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td style={styles.td}>{ticket.id}</td>
              <td style={styles.td}>{ticket.products_id}</td>
              <td style={styles.td}>{ticket.client_name}</td>
              <td style={styles.td}>{ticket.email}</td>
              <td style={styles.td}>{ticket.mobile}</td>
              <td style={styles.td}>{ticket.query}</td>
              <td style={styles.td}>
                {ticket.screen_shot && Array.isArray(ticket.screen_shot) ? (
                  ticket.screen_shot.map((screenshot, index) => (
                    <a
                      href={`http://127.0.0.1:8000${screenshot}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index}
                    >
                      <img
                        src={`http://127.0.0.1:8000${screenshot}`}
                        alt={`screenshot ${index}`}
                        style={styles.img}
                      />
                    </a>
                  ))
                ) : (
                  "No Screenshot"
                )}
              </td>
              <td style={styles.td}>
                {ticket.status === 0 ? "New" : ticket.status === 1 ? "In process" : ticket.status === 2 ? "Closed" : "Unknown"}
              </td>
              <td style={styles.td}>
                <div style={styles.actionContainer}>
                  <button
                    style={styles.button}
                    onClick={() => handleAssign(ticket.id)}
                  >
                    Assign
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(ticket.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
