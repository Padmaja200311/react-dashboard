
import { useState } from "react";
import useUsersContext from "../context/useUsersContext.js";
import { Search, Users as UsersIcon } from "lucide-react";

export default function Users() {
  const { users, loading, error } = useUsersContext();

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const cities = [...new Set(
    users.map((user) => user.address.city)
  )].sort();

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText);

    const matchesCity =
      !selectedCity || user.address.city === selectedCity;

    return matchesSearch && matchesCity;
  });

  if (loading) {
    return <p className="page-message">Loading users...</p>;
  }

  if (error) {
    return <p className="page-message">Error: {error}</p>;
  }

  return (
    <div className="users-page">
      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p>Manage and view all registered users.</p>
        </div>

        <div className="users-count">
          <UsersIcon size={20} />
          <span>{filteredUsers.length} users</span>
        </div>
      </div>

      <div className="users-toolbar">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search users by name or email"
          />
        </div>

        <select
          value={selectedCity}
          onChange={(event) => setSelectedCity(event.target.value)}
          aria-label="Filter users by city"
        >
          <option value="">All Cities</option>

          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => {
            setSearch("");
            setSelectedCity("");
          }}
        >
          Clear Filters
        </button>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Company</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                  <td>{user.company.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">
                  No users found. Try changing your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
