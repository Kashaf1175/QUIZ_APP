import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { User } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would send updated profile info to your backend
    setEditing(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
      <div className="flex items-center mb-6">
        <User className="h-12 w-12 text-blue-500 mr-4" />
        <h2 className="text-2xl font-bold">Profile</h2>
      </div>
      {!editing ? (
        <div>
          <div className="mb-4">
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Role:</span> {user.role}
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={form.role}
              className="w-full border rounded px-3 py-2"
              disabled
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;