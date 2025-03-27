import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { motion } from "framer-motion";
import {
  FiEdit2,
  FiClock,
  FiTag,
  FiArrowLeft,
  FiUser,
  FiShare2,
} from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getPost, Post } from "../api/postApi";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPost] = useState<Post[]>([]);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const userid = user.userid;
  setRecentPost

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (postId) {
          const postResponse = await getPost(postId);
          // console.log("API Response:", postResponse.data);
          // Set post data directly since it's not nested
          setPost(postResponse.data as unknown as Post);
        }
      } catch (e) {
        setError(true);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [postId]);

  useEffect(() => {
    // console.log("Updated post:", post);
  }, [post]);

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-screen bg-gray-900"
      >
        <Spinner size="xl" />
      </motion.div>
    );

  if (error || !post)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <p className="text-red-500">Failed to load post</p>
      </div>
    );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900"
    >
      {/* Navigation Bar */}
      <nav className="fixed top-20 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 
              transition-colors duration-200 group"
          >
            <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-4">
            {post.author === userid && (
              <button
                onClick={() => navigate(`/update-post/${post._id}`)}
                className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 
                  transition-all duration-200 flex items-center gap-2"
              >
                <FiEdit2 className="w-4 h-4" />
                Edit Post
              </button>
            )}
            <button
              onClick={() =>
                navigator.share({
                  title: post.title,
                  url: window.location.href,
                })
              }
              className="p-2 text-gray-400 hover:text-yellow-500 transition-colors duration-200"
            >
              <FiShare2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[70vh] mt-16">
        <div className="absolute inset-0">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-gray-900/60 to-gray-900" />
        </div>

        <div className="relative h-full max-w-4xl mx-auto px-4 flex flex-col justify-end pb-16">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center gap-1 bg-yellow-500/90 text-gray-900 
                px-3 py-1 rounded-full text-sm font-medium"
              >
                <FiTag className="w-4 h-4" />
                {post.category}
              </span>
              <span className="text-gray-300 text-sm flex items-center gap-1">
                <FiClock className="w-4 h-4" />
                {post.updatedAt &&
                  new Date(post.updatedAt).toLocaleDateString()}
              </span>
              <span className="text-gray-300 text-sm flex items-center gap-1">
                <FiUser className="w-4 h-4" />
                {post.author || "Anonymous"}
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className=" px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.article
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg prose-invert max-w-none 
            prose-headings:text-yellow-500 prose-a:text-yellow-500 
            prose-strong:text-yellow-500 mb-16 text-left"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Comments Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 rounded-xl p-8 mb-16 shadow-xl 
            backdrop-blur-sm border border-gray-700/50"
        >
          <CommentSection postId={post._id} />
        </motion.div>

        {/* Related Posts */}
        {recentPosts && recentPosts.length > 0 && (
          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-yellow-500 mb-8">
              More Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((recentPost) => (
                <PostCard key={recentPost._id} post={recentPost} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </motion.main>
  );
}
