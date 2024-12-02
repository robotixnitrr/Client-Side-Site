import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Post } from '../api/postApi';
import { FiClock, FiTag } from 'react-icons/fi';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg border border-gray-700/50 hover:border-yellow-500/50 transition-colors"
    >
      <Link to={`/post/${post._id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 bg-yellow-500/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
              <FiTag className="w-3 h-3" />
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h2 className="text-xl font-bold text-gray-100 line-clamp-2 hover:text-yellow-500 transition-colors">
            {post.title}
          </h2>
          
          <p className="text-gray-400 text-sm line-clamp-2">
            {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
          </p>

          <div className="flex items-center justify-between pt-2">
            {/* Date */}
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <FiClock className="w-4 h-4" />
              {post.updatedAt && formatDate(post.updatedAt)}
            </div>

            {/* Read More */}
            <span className="text-yellow-500 text-sm font-medium hover:text-yellow-400 transition-colors">
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PostCard;
