import {FaArrowUp, FaArrowDown, FaComments} from "react-icons/fa";
import {Link} from "react-router";
import {formatPostTime} from "../../../utils/app";

const PostCard = ({post}) => {
  const {
    _id,
    title,
    authorName,
    authorImage,
    tags = [],
    createdAt,
    upVote = 0,
    downVote = 0,
    comments,
    description,
  } = post;

  return (
    <Link to={`/posts/${_id}`}>
      <div className="bg-base-100 p-6 rounded-xl shadow border border-neutral-content mb-6 hover:shadow-md transition">
        {/* Header */}
        <div className="flex items-start gap-4 mb-3">
          <img
            src={authorImage || "https://i.ibb.co/fFkZ2sp/default-avatar.png"}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="text-sm text-base-content">
            <p className="font-semibold text-secondary-content">{authorName}</p>
            <p className="text-xs">{formatPostTime(createdAt)}</p>
          </div>
        </div>

        {/* Title & Description */}

        <h2 className="text-xl font-bold text-base-content hover:underline mb-2 font-urbanist">
          {title}
        </h2>

        <p className="text-secondary-content text-sm line-clamp-2 mb-3">
          {description?.slice(0, 120)}...
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t, index) => (
            <span
              key={index}
              className="bg-sky-100 text-black text-xs font-medium px-2 py-1 rounded-full"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Stats & Buttons */}
        <div className="flex items-center justify-between text-sm text-base-content">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1">
              <FaArrowUp className="text-accent" /> {upVote}
            </span>
            <span className="flex items-center gap-1">
              <FaArrowDown className="text-red-500" /> {downVote}
            </span>
            <span className="flex items-center gap-1">
              <FaComments /> {comments || 0} comments
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
