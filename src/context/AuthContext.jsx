
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("dashboardUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(email, password) {
    if (email === "admin@example.com" && password === "admin123") {
      const userData = { email, name: "Admin" };
      localStorage.setItem("dashboardUser", JSON.stringify(userData));
      setUser(userData);
      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem("dashboardUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
