import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { User, Edit3, Save, X } from "lucide-react";

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
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-3 mr-4 shadow-md">
              <User className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Profile</h2>
              <p className="text-blue-100">Manage your account information</p>
            </div>
          </div>
          {!editing && (
            <button
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
              onClick={() => setEditing(true)}
            >
              <Edit3 className="h-4 w-4 text-black" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="p-8">
        {!editing ? (
          <div className="space-y-6">
            <div className="grid gap-6">
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Name</span>
                <p className="text-lg font-semibold text-gray-900 mt-1">{user.name}</p>
              </div>
              
              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                <span className="text-sm font-medium text-green-600 uppercase tracking-wide">Email</span>
                <p className="text-lg text-gray-900 mt-1">{user.email}</p>
              </div>
              
              <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                <span className="text-sm font-medium text-purple-600 uppercase tracking-wide">Role</span>
                <p className="text-lg text-gray-900 mt-1">{user.role}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 bg-gray-100 text-gray-500"
                  required
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={form.role}
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 bg-gray-100 text-gray-500"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Role is managed by administrators</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;