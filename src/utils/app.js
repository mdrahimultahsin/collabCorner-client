export const formatPostTime = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const diffTime = now - postDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};
