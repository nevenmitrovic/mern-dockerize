import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState("");

  // Dummy data for now - replace with actual API call
  useEffect(() => {
    // Example data - in a real app, fetch from your API
    setUsers([
      { id: 1, username: "user1" },
      { id: 2, username: "user2" },
      { id: 3, username: "user3" },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUsername.trim()) {
      const newUser = {
        id: users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1,
        username: newUsername.trim(),
      };
      setUsers([...users, newUser]);
      setNewUsername("");
    }
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      <div className="table-container">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="form-container">
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
}

export default App;
