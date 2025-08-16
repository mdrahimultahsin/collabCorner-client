import React, { useState } from "react";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Setting = () => {
  const { user, profileUpdate, passwordChange } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    const updatedData = { displayName: name, photoURL };
    setLoading(true);
    try {
      await profileUpdate(updatedData);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
    setLoading(false);
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!user || !currentPassword || !newPassword) return;

    setLoading(true);
    try {
      // Reauthenticate user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

     
      await passwordChange(newPassword);

      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-base-300 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-base-content">User Settings</h1>

      {/* Profile Info */}
      <form onSubmit={handleProfileUpdate} className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={photoURL || "https://i.ibb.co/60DDYC98/man-inscription-admin-icon-outline-600nw-1730974153.webp"}
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-primary object-cover text-secondary-content"
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-base-content w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <input
          type="text"
          placeholder="Profile Image URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary text-base-content"
        />

        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full md:w-auto border rounded-md p-2 bg-base-200 text-base-content cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 md:mt-0 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
          >
            Update Profile
          </button>
        </div>
      </form>

      {/* Password Change */}
      <form onSubmit={handlePasswordChange} className="space-y-4">
        <h2 className="text-xl font-semibold text-base-content">Change Password</h2>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary text-base-content"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary text-base-content"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
