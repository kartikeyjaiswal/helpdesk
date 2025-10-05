import { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function App() {
  const [user, setUser] = useState("");
  const [tickets, setTickets] = useState([]); // Store tickets in App state

  // Add new ticket
  const handleNewTicket = (title) => {
    if (!title) return;
    const newTicket = {
      id: tickets.length + 1,
      title,
      status: "open",
      username: user,
    };
    setTickets([...tickets, newTicket]);
  };

  // Toggle ticket status
  const handleToggle = (id) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id
        ? { ...ticket, status: ticket.status === "open" ? "closed" : "open" }
        : ticket
    );
    setTickets(updatedTickets);
  };

  return (
    <div>
      <h1>Helpdesk Mini Dashboard</h1>

      {!user && <Signup />}
      {!user && <Login onLogin={setUser} />}

      {user && <p>Logged in as: {user}</p>}

      {user && <TicketForm onNewTicket={handleNewTicket} />}

      {user && <TicketList tickets={tickets} onToggle={handleToggle} />}
    </div>
  );
}

export default App;

