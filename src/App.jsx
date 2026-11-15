
import { useState } from "react";
import "./App.css";

const initialTickets = [
  { id: "INC-1024", title: "Wi-Fi not connecting", category: "Network", priority: "High", status: "Open", user: "Arun Kumar" },
  { id: "INC-1023", title: "Printer not responding", category: "Hardware", priority: "Medium", status: "In Progress", user: "Priya Sharma" },
  { id: "INC-1022", title: "Unable to access portal", category: "Software", priority: "High", status: "Open", user: "Rahul M" },
  { id: "INC-1021", title: "Computer running slowly", category: "Hardware", priority: "Low", status: "Resolved", user: "Sneha R" },
];

function App() {
  const [tickets, setTickets] = useState(initialTickets);
  const [activePage, setActivePage] = useState("Dashboard");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", category: "Network", priority: "Medium", description: "" });

  const openCount = tickets.filter(t => t.status === "Open").length;
  const progressCount = tickets.filter(t => t.status === "In Progress").length;
  const resolvedCount = tickets.filter(t => t.status === "Resolved").length;

  function createTicket(e) {
    e.preventDefault();
    const newTicket = {
      id: `INC-${1025 + tickets.length - initialTickets.length}`,
      title: form.title,
      category: form.category,
      priority: form.priority,
      status: "Open",
      user: "Demo User",
    };
    setTickets([newTicket, ...tickets]);
    setForm({ title: "", category: "Network", priority: "Medium", description: "" });
    setShowForm(false);
    setActivePage("Tickets");
  }

  const filteredTickets = tickets.filter(t =>
    `${t.id} ${t.title} ${t.user}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">IT</div>
          <div><strong>HelpDesk</strong><small>Incident Management</small></div>
        </div>

        <p className="menu-label">MAIN MENU</p>
        {["Dashboard", "Tickets", "My Tasks", "Reports"].map((item, i) => (
          <button key={item} className={`nav-item ${activePage === item ? "active" : ""}`}
            onClick={() => setActivePage(item)}>
            <span>{["▦", "▤", "✓", "▥"][i]}</span>{item}
          </button>
        ))}

        <p className="menu-label support-label">SUPPORT</p>
        <button className={`nav-item ${activePage === "Settings" ? "active" : ""}`}
          onClick={() => setActivePage("Settings")}>
          <span>⚙</span>Settings
        </button>

        <div className="sidebar-bottom">
          <div className="avatar">DU</div>
          <div><strong>Demo User</strong><small>Administrator</small></div>
          <span className="more">⋯</span>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="breadcrumb">Workspace / </span>
            <strong>{activePage}</strong>
          </div>
          <div className="top-actions">
            <span className="notification">♧</span>
            <div className="top-avatar">DU</div>
          </div>
        </header>

        <section className="content">
          <div className="welcome-row">
            <div>
              <p className="date-label">IT SUPPORT CENTER</p>
              <h1>{activePage === "Dashboard" ? "Dashboard Overview" : activePage}</h1>
              <p className="subtitle">Monitor and manage your IT support incidents.</p>
            </div>
            <button className="primary-btn" onClick={() => setShowForm(true)}>
              + Create New Ticket
            </button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-top"><span>Total Tickets</span><span className="stat-icon purple">▤</span></div>
              <h2>{tickets.length}</h2><small>All reported incidents</small>
            </div>
            <div className="stat-card">
              <div className="stat-top"><span>Open Tickets</span><span className="stat-icon orange">◷</span></div>
              <h2>{openCount}</h2><small>Awaiting support</small>
            </div>
            <div className="stat-card">
              <div className="stat-top"><span>In Progress</span><span className="stat-icon blue">↻</span></div>
              <h2>{progressCount}</h2><small>Currently being handled</small>
            </div>
            <div className="stat-card">
              <div className="stat-top"><span>Resolved</span><span className="stat-icon green">✓</span></div>
              <h2>{resolvedCount}</h2><small>Successfully completed</small>
            </div>
          </div>

          <section className="ticket-panel">
            <div className="panel-heading">
              <div><h2>Recent Incidents</h2><p>Overview of reported IT issues</p></div>
              <button className="view-btn" onClick={() => setActivePage("Tickets")}>View all tickets →</button>
            </div>

            <div className="table-tools">
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search tickets..." />
              <span>{filteredTickets.length} tickets</span>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>TICKET</th><th>ISSUE</th><th>REPORTED BY</th><th>PRIORITY</th><th>STATUS</th></tr>
                </thead>
                <tbody>
                  {filteredTickets.map(ticket => (
                    <tr key={ticket.id}>
                      <td className="ticket-id">{ticket.id}</td>
                      <td><strong>{ticket.title}</strong><small className="category">{ticket.category}</small></td>
                      <td>{ticket.user}</td>
                      <td><span className={`priority ${ticket.priority.toLowerCase()}`}>{ticket.priority}</span></td>
                      <td><span className={`status ${ticket.status.toLowerCase().replace(" ", "-")}`}>{ticket.status}</span></td>
                    </tr>
                  ))}
                  {filteredTickets.length === 0 && <tr><td colSpan="5" className="empty">No matching tickets found.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>

          <footer>Smart IT Helpdesk & Incident Management System <span>● System Online</span></footer>
        </section>
      </main>

      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <form className="ticket-form" onSubmit={createTicket} onClick={e => e.stopPropagation()}>
            <div className="form-heading">
              <div><h2>Create a Support Ticket</h2><p>Describe the IT issue you are facing.</p></div>
              <button type="button" className="close-btn" onClick={() => setShowForm(false)}>×</button>
            </div>
            <label>Issue Title</label>
            <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Wi-Fi is not working" />
            <label>Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              <option>Network</option><option>Hardware</option><option>Software</option><option>Account / Login</option>
            </select>
            <label>Priority</label>
            <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
              <option>Low</option><option>Medium</option><option>High</option>
            </select>
            <label>Description</label>
            <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Explain the problem..." />
            <button className="primary-btn submit-btn" type="submit">Submit Ticket</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;