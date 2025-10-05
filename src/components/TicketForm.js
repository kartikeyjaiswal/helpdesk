import { useState } from "react";
import "./TicketForm.css"; // separate CSS for this component

export default function TicketForm({ onNewTicket }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a ticket title");
    onNewTicket(title);
    setTitle("");
  };

  return (
    <section className="ticket-form">
      <h2>Create New Ticket</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Enter ticket title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </section>
  );
}
