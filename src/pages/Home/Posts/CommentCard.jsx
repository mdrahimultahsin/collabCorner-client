import {formatDistanceToNow} from "date-fns";

const CommentCard = ({comment}) => {
  const {name, email, photo, comments, commentAt} = comment;

  return (
    <div className="flex gap-3 p-4 bg-base-200 rounded-lg shadow border border-neutral-content">
      <img
        src={photo}
        alt={name}
        className="w-10 h-10 rounded-full object-cover border"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-base-content">{name}</p>
            <p className="text-sm text-neutral">{email}</p>
          </div>
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(commentAt), {addSuffix: true})}
          </span>
        </div>
        <p className="mt-2 text-secondary-content">"{comments}"</p>
      </div>
    </div>
  );
};

export default CommentCard;
