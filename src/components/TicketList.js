
// import React, { useState } from "react";
// import axios from "axios";
// import "./TicketList.css"; // Create a CSS file for styles

// function TicketList({ tickets, onToggle, isAdmin, setTickets }) {
//   const [commentInputs, setCommentInputs] = useState({});

//   const handleCommentChange = (id, value) => {
//     setCommentInputs((prev) => ({ ...prev, [id]: value }));
//   };

// const handleAddComment = async (id) => {
//   console.log("Adding comment to ticket ID:", id); // check the ID
//   if (!commentInputs[id]) return;

//   try {
//     const res = await axios.post(`/api/tickets/${id}/comment`, {
//       user: "currentUser", // replace with actual logged-in username
//       message: commentInputs[id],
//     });
//     console.log("Response:", res.data); // check server response
//     setCommentInputs((prev) => ({ ...prev, [id]: "" }));
//     window.location.reload(); // or better: fetchTickets() instead of reload
//   } catch (err) {
//     console.error("Error adding comment:", err);
//   }
// };



//   const checkSLA = (ticket) => {
//     const created = new Date(ticket.createdAt);
//     const now = new Date();
//     const hours = (now - created) / (1000 * 60 * 60);
//     return hours > ticket.slaHours ? "Overdue" : "Within SLA";
//   };

//   return (
//     <div className="ticket-list">
//       <h3>Tickets</h3>
//       {tickets.map((t) => (
//         <div key={t._id} className="ticket-card">
//           <h4>{t.title}</h4>
//           <p>
//             <b>Status:</b> {t.status} | <b>SLA:</b>{" "}
//             <span
//               style={{
//                 color: checkSLA(t) === "Overdue" ? "red" : "green",
//               }}
//             >
//               {checkSLA(t)}
//             </span>
//           </p>

//           {isAdmin && (
//             <button onClick={() => onToggle(t._id)}>
//               {t.status === "open" ? "Close" : "Reopen"}
//             </button>
//           )}

//           {/* Comments Section */}
//           <div className="comments-section">
//             <h5>Comments:</h5>
//             {t.comments?.length > 0 ? (
//               t.comments.map((c, i) => (
//                 <p key={i}>
//                   <b>{c.user}:</b> {c.message}
//                 </p>
//               ))
//             ) : (
//               <p>No comments yet</p>
//             )}

//             <input
//               type="text"
//               value={commentInputs[t._id] || ""}
//               onChange={(e) => handleCommentChange(t._id, e.target.value)}
//               placeholder="Add a comment..."
//             />
//             <button onClick={() => handleAddComment(t._id)}>Send</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default TicketList;
import React, { useState } from "react";
import axios from "axios";
import "./TicketList.css";

function TicketList({ tickets, onToggle, isAdmin, user, setTickets }) {
  const [commentInputs, setCommentInputs] = useState({});

  const handleCommentChange = (id, value) => {
    setCommentInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddComment = async (id) => {
    if (!commentInputs[id]) return;
    try {
      const res = await axios.post(`/api/tickets/${id}/comment`, {
        user: user.username, // ✅ use actual logged-in user
        message: commentInputs[id],
      });

      // Update tickets state instead of full reload
      setTickets((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );

      setCommentInputs((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const checkSLA = (ticket) => {
    const created = new Date(ticket.createdAt);
    const now = new Date();
    const hours = (now - created) / (1000 * 60 * 60);
    return hours > ticket.slaHours ? "Overdue" : "Within SLA";
  };

  return (
    <div className="ticket-list">
      <h3>Tickets</h3>
      {tickets.map((t) => (
        <div key={t._id} className="ticket-card">
          <h4>{t.title}</h4>
          <p>
            <b>Status:</b> {t.status} | <b>SLA:</b>{" "}
            <span style={{ color: checkSLA(t) === "Overdue" ? "red" : "green" }}>
              {checkSLA(t)}
            </span>
          </p>

          {isAdmin && (
            <button onClick={() => onToggle(t._id)}>
              {t.status === "open" ? "Close" : "Reopen"}
            </button>
          )}

          {/* Comments Section */}
          <div className="comments-section">
            <h5>Comments:</h5>
            {t.comments?.length > 0 ? (
              t.comments.map((c, i) => (
                <p key={i}>
                  <b>{c.user}:</b> {c.message}
                </p>
              ))
            ) : (
              <p>No comments yet</p>
            )}

            <input
              type="text"
              value={commentInputs[t._id] || ""}
              onChange={(e) => handleCommentChange(t._id, e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={() => handleAddComment(t._id)}>Send</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketList;

