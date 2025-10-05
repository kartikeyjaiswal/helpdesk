const BASE_URL = "http://localhost:5000/api";

export const signup = async (username, password, role = "user") => {
  const res = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
  });
  return res.json();
};

export const login = async (username, password) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

export const getTickets = async () => {
  const res = await fetch(`${BASE_URL}/tickets`);
  return res.json();
};

export const createTicket = async (title, username) => {
  const res = await fetch(`${BASE_URL}/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, username }),
  });
  return res.json();
};

export const toggleTicketStatus = async (id) => {
  const res = await fetch(`${BASE_URL}/tickets/${id}/status`, {
    method: "PATCH",
  });
  return res.json();
};
export const addComment = async (id, user, message) => {
  const res = await fetch(`http://localhost:5000/api/tickets/${id}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, message }),
  });
  return res.json();
};

