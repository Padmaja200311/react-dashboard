
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
  }, [user]);

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setError("Name and email are required.");
      setMessage("");
      return;
    }

    const saved = updateProfile(trimmedName, trimmedEmail);

    if (saved) {
      setMessage("Profile updated successfully!");
      setError("");
    } else {
      setError("Unable to update profile. Please log in again.");
      setMessage("");
    }
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
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setMessage("");
              setError("");
            }}
            maxLength={50}
            required
          />

          <label htmlFor="profile-email">Email Address</label>
          <input
            id="profile-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
              setError("");
            }}
            required
          />

          <button type="submit">Save Settings</button>

          {message && (
            <p className="settings-message" role="status">
              {message}
            </p>
          )}

          {error && (
            <p className="settings-message" role="alert">
              {error}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
