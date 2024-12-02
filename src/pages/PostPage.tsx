import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner } from 'flowbite-react';
import { motion } from 'framer-motion';
import { FiEdit2, FiClock, FiTag } from 'react-icons/fi';

import { getAllPosts, getPost, Post } from '../api/postApi';

import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function PostPage() {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPost] = useState<Post[]>([]);
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const userid = user.userid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (postId) {
          const [postResponse] = await Promise.all([
            getPost(postId),
          ]);
          console.log("API Response:", postResponse.data);
          setPost(postResponse.data.data);
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
    console.log("Updated post:", post);
  }, [post]);

  if (loading) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center min-h-screen"
    >
      <Spinner size="xl" />
    </motion.div>
  );

  if (error || !post) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-500">Failed to load post</p>
    </div>
  );

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black pt-24"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden mb-12"
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          
          <div className="absolute bottom-0 w-full p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-flex items-center gap-1 bg-yellow-500/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                  <FiTag className="w-4 h-4" />
                  {post.category}
                </span>
                <span className="text-gray-300 text-sm flex items-center gap-1">
                  <FiClock className="w-4 h-4" />
                  {post.updatedAt && new Date(post.updatedAt).toLocaleDateString()}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                {post.title}
              </h1>
            </div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Author Actions */}
          {post.author === userid && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/update-post/${post._id}`)}
              className="mb-8 px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 
                transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <FiEdit2 className="w-5 h-5" />
              Edit Post
            </motion.button>
          )}

          {/* Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Comments Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 rounded-xl p-8 mb-12 shadow-xl backdrop-blur-sm border border-gray-700/50"
          >
            {/* <CommentSection postId={post._id} /> */}
          </motion.div>

          {/* Recent Posts */}
          {/* {recentPosts && recentPosts.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-yellow-500 mb-8">More Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((recentPost) => (
                  <PostCard key={recentPost._id} post={recentPost} />
                ))}
              </div>
            </motion.div>
          )} */}
        </div>
      </div>
    </motion.main>
  );
}