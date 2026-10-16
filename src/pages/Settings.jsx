
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("Settings saved for this session.");
  }

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <h1>Settings</h1>
          <p>Manage your profile information.</p>
        </div>
      </header>

      <section className="content-card settings-card">
        <h2>Profile Settings</h2>

        <form onSubmit={handleSubmit} className="settings-form">
          <label htmlFor="profile-name">Display Name</label>
          <input
            id="profile-name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setMessage("");
            }}
            required
          />

          <label htmlFor="profile-email">Email Address</label>
          <input
            id="profile-email"
            type="email"
            value={user?.email || ""}
            readOnly
          />

          <button type="submit">Save Settings</button>

          {message && <p className="settings-message">{message}</p>}
        </form>
      </section>
    </div>
  );
}
