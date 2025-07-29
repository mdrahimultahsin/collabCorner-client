# 💬 CollabCorner Frontend

CollabCorner is a full-featured **MERN stack forum application** where users can share ideas, upvote/downvote posts, comment, report content, and more. This repository contains the **frontend** built using **React** and modern web development libraries.

🌐 **Live Website URL**: [https://collabcorner-forum.web.app/](https://collabcorner-forum.web.app/)

---

## 🚀 Tech Stack

- ⚛️ **React**
- 🧭 **React Router**
- 🎯 **React Hook Form**
- 🎛 **React Select**
- 💡 **React Icons**
- 🌼 **DaisyUI**
- 🎨 **Tailwind CSS**
- 🔄 **TanStack Query**
- 🛠️ Other supporting packages for animation, state management, and validation

---

## 🌟 Key Features

### 🔐 User Authentication
- Login with email/password or social providers
- Firebase-based auth with JWT integration
- Role-based access (User / Admin)

### 📝 Posts
- Create, update, and delete posts
- Tag-based filtering
- Sorting by newest or popularity
- Voting system (Upvote / Downvote)
- Pagination for performance

### 💬 Comments
- Add and view comments on each post
- Admin can delete inappropriate comments

### 👤 Membership & Badges
- Users can upgrade to Gold badge
- Member limit restricts features (e.g., max 5 posts for regular users)

### 📌 Admin Dashboard
- View stats (total users/posts/comments)
- Add new tags
- Manage users and comments
- Post announcements to users

---

## 🚩 Report Activities Feature (Moderation System)

A moderation system enabling users to report inappropriate comments and allowing admins to take appropriate action.

### 🧑‍💻 For Users
- **Report comments** by selecting a feedback reason
- Submit reports directly from the post comments page

### 🛡️ For Admins
- Access all reports from the **Report Activities** page
- See **comment text**, **feedback**, **reporter email**, and **status**
- Take actions via a dropdown:
  - ✅ **Mark as Reviewed**
  - ❌ **Dismiss Report**
  - 🗑 **Delete Comment**
- **Confirmation dialogs** appear before deleting comments
- **No actions available** is shown when the comment has already been deleted

### 🖼 UI Behavior
- Dropdown options only visible when status is `pending`, `reviewed`, or `dismissed`
- If status is `deleted`, a message: **No actions available** is shown

---

## 🌐 Live API Base URL

Frontend interacts with the backend hosted at:  
[https://collab-corner-server.vercel.app](https://collab-corner-server.vercel.app)

---