export const handleLogout = (navigate) => {
    // Clear localStorage data
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
  
    // Redirect to login page
    navigate("/login");
  };
  