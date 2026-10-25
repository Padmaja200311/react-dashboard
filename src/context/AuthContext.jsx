
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("dashboardUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("dashboardUser");
      return null;
    }
  });

  function login(email, password) {
    // Keep the existing demo login credentials.
    if (
      email === "admin@example.com" &&
      password === "admin123"
    ) {
      const userData = { email, name: "Admin" };

      localStorage.setItem(
        "dashboardUser",
        JSON.stringify(userData)
      );

      setUser(userData);
      return true;
    }

    return false;
  }

  function updateProfile(name, email) {
    if (!user) return false;

    const updatedUser = {
      ...user,
      name: name.trim(),
      email: email.trim(),
    };

    localStorage.setItem(
      "dashboardUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    return true;
  }

  function logout() {
    localStorage.removeItem("dashboardUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
