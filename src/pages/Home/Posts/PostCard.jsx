import { format } from "date-fns";
import {FaArrowUp, FaArrowDown, FaComments} from "react-icons/fa";
import {Link} from "react-router";

const PostCard = ({post}) => {
  const {
    _id,
    title,
    authorName,
    authorImage,
    tag = [],
    createdAt,
    upVote = 0,
    downVote = 0,
    comments = [],
    description,
  } = post;

  const voteCount = upVote - downVote;

  return (
    <Link to={`/posts/${_id}`}>
      <div className="bg-white p-6 rounded-xl shadow border border-border-color mb-6 hover:shadow-md transition">
        {/* Header */}
        <div className="flex items-start gap-4 mb-3">
          <img
            src={authorImage || "https://i.ibb.co/fFkZ2sp/default-avatar.png"}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="text-sm text-gray-600">
            <p className="font-semibold text-gray-900">{authorName}</p>
            <p className="text-xs">{post?.createdAt ? format(new Date(post.createdAt), 'dd MMM yyyy') : ''}</p>
          </div>
        </div>

        {/* Title & Description */}

        <h2 className="text-xl font-semibold text-gray-900 hover:underline mb-2">
          {title}
        </h2>

        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {description?.slice(0, 120)}...
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-sky-100 text-secondary-content text-xs font-medium px-2 py-1 rounded-full">
            #{tag}
          </span>
        </div>

        {/* Stats & Buttons */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1">
              <FaArrowUp className="text-accent" /> {upVote}
            </span>
            <span className="flex items-center gap-1">
              <FaArrowDown className="text-red-500" /> {downVote}
            </span>
            <span className="flex items-center gap-1">
              <FaComments /> {comments.length || 0} comments
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
