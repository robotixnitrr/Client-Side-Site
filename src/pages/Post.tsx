import { useState, useEffect } from "react";
import { getAllPosts, Post as PostType } from "../api/postApi";
import PostCard from "../components/PostCard";
import { FiSearch, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Post() {
  const [recentPosts, setRecentPost] = useState<PostType[]>([]);
  const [userLogged] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        if (response.data) {
          if (Array.isArray(response.data)) {
            setRecentPost(response.data);
          } else if (response.data.data && Array.isArray(response.data.data)) {
            setRecentPost(response.data.data);
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("Error fetching posts:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = recentPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black pt-24"
    >
      {/* Header Section */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="fixed top-20 left-0 right-0 bg-gray-900/80 backdrop-blur-sm z-10 py-6 border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.h1
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent"
            >
              Latest Posts
            </motion.h1>

            {/* Search and Actions */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-gray-200"
                />
              </div>

              {userLogged && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/create-post")}
                  className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 font-medium"
                >
                  <FiPlus className="w-5 h-5" />
                  <span className="hidden md:inline">New Post</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : (
          <>
            {filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-gray-400 text-lg">No posts found</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <PostCard post={post} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

// TODO:
//   1. Show More Functionality
