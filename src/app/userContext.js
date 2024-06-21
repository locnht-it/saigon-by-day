import React, { createContext, useState, useContext } from "react";

// Tạo Context
const UserContext = createContext();

// Tạo Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook để sử dụng context dễ dàng
export const useUser = () => useContext(UserContext);
