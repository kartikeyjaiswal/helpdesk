import { useState, useEffect, useCallback } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import Auth from "./components/Auth";
import { getTickets, createTicket, toggleTicketStatus } from "./api";
import "./App.css"; // Global styles
function App() {
  const [user, setUser] = useState({ username: "", role: "" });
  const [tickets, setTickets] = useState([]);

  // Wrap fetchTickets in useCallback so it can be safely used in useEffect
  const fetchTickets = useCallback(async () => {
    if (!user.username) return;
    try {
      const allTickets = await getTickets();
      if (user.role === "user") {
        setTickets(allTickets.filter((t) => t.username === user.username));
      } else {
        setTickets(allTickets);
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  }, [user]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]); // fetchTickets is stable now, no ESLint warning

  const handleNewTicket = async (title) => {
    if (!title) return;
    try {
      await createTicket(title, user.username);
      fetchTickets();
    } catch (err) {
      console.error("Error creating ticket:", err);
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleTicketStatus(id);
      fetchTickets();
    } catch (err) {
      console.error("Error toggling ticket status:", err);
    }
  };

  const handleLogout = () => {
    setUser({ username: "", role: "" });
    setTickets([]);
  };

  return (
    <div className="app-container">
      <h1>Helpdesk Mini Dashboard</h1>

      {!user.username && <Auth onLoginSuccess={setUser} />}

      {user.username && (
        <p>
          Logged in as: <b>{user.username}</b> ({user.role}){" "}
          <button onClick={handleLogout}>Logout</button>
        </p>
      )}

      {user.username && <TicketForm onNewTicket={handleNewTicket} />}
      {user.username && (
        <TicketList
          tickets={tickets}
          onToggle={handleToggle}
          user={user}
          setTickets={setTickets}
          isAdmin={user.role === "admin"}
        />
      )}
    </div>
  );
}

export default App;
