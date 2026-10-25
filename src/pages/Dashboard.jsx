
import useUsersContext from "../context/useUsersContext.js";

export default function Dashboard() {
  const { users, loading, error } = useUsersContext();

  if (loading) {
    return (
      <div className="dashboard-status">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-status dashboard-error">
        <p>Unable to load dashboard: {error}</p>
      </div>
    );
  }

  const companies = new Set(
    users.map((user) => user.company.name)
  ).size;

  const cities = new Set(
    users.map((user) => user.address.city)
  ).size;

  const emailDomains = new Set(
    users.map((user) => user.email.split("@")[1])
  ).size;

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: "👥",
      description: "Users fetched from the API",
    },
    {
      title: "Companies",
      value: companies,
      icon: "🏢",
      description: "Unique companies",
    },
    {
      title: "Cities",
      value: cities,
      icon: "📍",
      description: "Cities represented",
    },
    {
      title: "Email Domains",
      value: emailDomains,
      icon: "✉️",
      description: "Unique email domains",
    },
  ];

  const recentUsers = users.slice(0, 5);

  return (
    <main className="dashboard">
      <section className="dashboard-welcome">
        <div>
          <p className="dashboard-eyebrow">OVERVIEW</p>
          <h1>Welcome to your Dashboard!</h1>
          <p className="dashboard-subtitle">
            View your user data and important statistics in one place.
          </p>
        </div>
        <div className="dashboard-welcome-icon">📊</div>
      </section>

      <section className="dashboard-stats">
        <div className="dashboard-section-heading">
          <div>
            <h2>Statistics</h2>
            <p>A quick overview of your user data</p>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.title}>
              <div className="stat-card-top">
                <span className="stat-icon" aria-hidden="true">
                  {stat.icon}
                </span>
                <span className="stat-label">{stat.title}</span>
              </div>

              <p className="stat-value">{stat.value}</p>
              <p className="stat-description">{stat.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-recent">
        <div className="dashboard-section-heading">
          <div>
            <h2>Recent Users</h2>
            <p>The first five users from your API data</p>
          </div>
          <span className="users-count">
            {users.length} total
          </span>
        </div>

        {recentUsers.length === 0 ? (
          <div className="dashboard-empty">
            No users available.
          </div>
        ) : (
          <div className="recent-users-table-wrapper">
            <table className="recent-users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Company</th>
                </tr>
              </thead>

              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="recent-user-name">
                      {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.address.city}</td>
                    <td>{user.company.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
