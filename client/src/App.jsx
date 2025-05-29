import { useState, useEffect } from "react";
import "./App.css";
import axiosClient from "./api/axiosClient";

function App() {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState("");

  const postUser = async (data) => {
    const res = await axiosClient.post("/users", data);
    return res.data;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosClient.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newUsername.trim()) {
      const newUser = {
        username: newUsername.trim(),
      };
      const res = await postUser(newUser);
      setNewUsername("");

      if (res.user) {
        setUsers([...users, res.user]);
      }
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
              <tr key={user._id}>
                <td>{user._id}</td>
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
