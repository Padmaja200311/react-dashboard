
import useUsersContext from "../context/useUsersContext.js";

export default function Dashboard() {
  const { users, loading, error } = useUsersContext();

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error: {error}</p>;

  const companies = new Set(
    users.map((user) => user.company.name)
  ).size;

  const cities = new Set(
    users.map((user) => user.address.city)
  ).size;

  const stats = [
    { title: "Total Users", value: users.length },
    { title: "Companies", value: companies },
    { title: "Cities", value: cities },
    { title: "Loaded Records", value: users.length },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <h3>{stat.title}</h3>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
