import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUser(parsedData.user);
      setIsLoggedIn(true);
    }
  }, []);

  
  const loginUser = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    sessionStorage.setItem("userData", JSON.stringify({ user: userData }));
  };

  
  const logoutUser = () => {
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem("userData");
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    sessionStorage.setItem("userData", JSON.stringify({ user: newUser }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        loginUser,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
