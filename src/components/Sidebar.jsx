
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  PanelsTopLeft,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="sidebar">
      <h2 className="brand">
        <PanelsTopLeft size={25} />
        AdminPanel
      </h2>

      <p className="menu-title">MENU</p>

      <NavLink to="/" end className="nav-link">
        <LayoutDashboard size={19} />
        Dashboard
      </NavLink>

      <NavLink to="/users" className="nav-link">
        <Users size={19} />
        Users
      </NavLink>

      <NavLink to="/settings" className="nav-link">
        <Settings size={19} />
        Settings
      </NavLink>

      <div className="sidebar-bottom">
        <div className="profile-info">
          <div className="avatar">{user?.name?.[0] || "A"}</div>
          <div>
            <strong>{user?.name || "Admin"}</strong>
            <p>{user?.email}</p>
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}
