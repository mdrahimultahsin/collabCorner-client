# 💬 CollabCorner Frontend

CollabCorner is a full-featured **MERN stack forum application** where users can share ideas, upvote/downvote posts, comment, report content, and more. This repository contains the **frontend** built using **React** and modern web development libraries.

🌐 **Live Website URL**: [https://collabcorner-forum.web.app/](https://collabcorner-forum.web.app/)
Frontend interacts with the backend hosted at:  
[https://collab-corner-server.vercel.app](https://collab-corner-server.vercel.app)

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
- Firebase-based authentication with JWT integration
- Role-based access (User / Admin)

### 🧭 Separate Dashboards
- **User Dashboard**:  
  - Normal logged-in users can access their dashboard to:
    - Add new posts (up to 5 posts unless upgraded to member)
    - View their posts and delete them
    - Access comments and reports they’ve made
  - Users can upgrade to a **Gold Member** to unlock unlimited posting
- **Admin Dashboard**:  
  - Access full moderation and management tools including:
    - User management
    - Comment deletion
    - Tag addition
    - Viewing platform statistics (users, posts, comments)
    - Posting announcements

### 📝 Posts
- Create, update, and delete posts
- Tag-based filtering system
- Sorting options: Newest or Popular
- Voting system (Upvote / Downvote)
- Pagination for better performance

### 💬 Comments
- Add and view comments under posts
- Admin can delete inappropriate comments

### 👤 Membership & Badges
- Free users: Up to 5 posts allowed
- **Gold Badge Members**: Unlimited posts
- Membership status is displayed on profile and used for feature access

### 📌 Admin Tools
- Dashboard with total counts (Users / Posts / Comments)
- Add and manage tags
- Manage users and their roles
- Moderate reports and content
- Post global announcements

---

## 🚩 Report Activities Feature (Moderation System)

A moderation system enabling users to report inappropriate comments and allowing admins to take appropriate action.

### 🧑‍💻 For Users
- **Report comments** by selecting a feedback reason (only for comments on their own posts)
- Submit reports directly from the comments section of a post

### 🛡️ For Admins
- Access all reports from the **Report Activities** page
- View details: **Comment text**, **Feedback**, **Reporter email**, **Status**
- Perform actions from a dropdown:
  - ✅ **Mark as Reviewed**
  - ❌ **Dismiss Report**
  - 🗑 **Delete Comment**
- Confirmation dialogs appear before deleting comments
- If a comment is already deleted, the status shows **No actions available**

### 🖼 UI Behavior
- Dropdown actions appear only for statuses: `pending`, `reviewed`, or `dismissed`
- For `deleted` status, dropdown is hidden and message shown instead

---
🛠 Run Locally
1️⃣ Clone the repository
git clone https://github.com/yourusername/collabcorner-frontend.git
cd collabcorner-frontend
2️⃣ Install dependencies
npm install
3️⃣ Set up environment variables
Create a .env file in the root folder and add:
VITE_API_URL=https://collab-corner-server.vercel.app
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# Add other Firebase keys as needed
4️⃣ Start the development server
npm run dev
5️⃣ Build for production
Edit
npm run build
