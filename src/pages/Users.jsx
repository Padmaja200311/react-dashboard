
import { useState } from "react";
import useUsersContext from "../context/useUsersContext.js";
import { Search, Users as UsersIcon } from "lucide-react";

export default function Users() {
  const { users, loading, error } = useUsersContext();

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const cities = [
    ...new Set(users.map((user) => user.address.city)),
  ].sort();

  const filteredUsers = users
    .filter((user) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      const matchesCity =
        !selectedCity || user.address.city === selectedCity;

      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      const first = a[sortBy].toLowerCase();
      const second = b[sortBy].toLowerCase();

      const comparison = first.localeCompare(second);

      return sortOrder === "asc" ? comparison : -comparison;
    });

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const startIndex = (safePage - 1) * pageSize;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + pageSize
  );

  function clearFilters() {
    setSearch("");
    setSelectedCity("");
    setSortBy("name");
    setSortOrder("asc");
    setCurrentPage(1);
  }

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="users-page">
      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p>Search, sort, and manage user records.</p>
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
            placeholder="Search name or email..."
            aria-label="Search users by name or email"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          aria-label="Filter by city"
          value={selectedCity}
          onChange={(event) => {
            setSelectedCity(event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          aria-label="Sort users by"
          value={sortBy}
          onChange={(event) => {
            setSortBy(event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
        </select>

        <button
          type="button"
          aria-label={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
          onClick={() => {
            setSortOrder((order) =>
              order === "asc" ? "desc" : "asc"
            );
            setCurrentPage(1);
          }}
        >
          {sortOrder === "asc" ? "A–Z ↑" : "Z–A ↓"}
        </button>

        <button type="button" onClick={clearFilters}>
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
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
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
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>
          Showing{" "}
          {filteredUsers.length === 0 ? 0 : startIndex + 1}–
          {Math.min(startIndex + pageSize, filteredUsers.length)} of{" "}
          {filteredUsers.length}
        </span>

        <label>
          Rows:
          <select
            aria-label="Rows per page"
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>

        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => setCurrentPage((page) => page - 1)}
        >
          Previous
        </button>

        <span>
          Page {safePage} of {Math.max(totalPages, 1)}
        </span>

        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => setCurrentPage((page) => page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
