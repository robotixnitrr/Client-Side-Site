import React, { useState, useEffect } from 'react';
import { createComment, getCommentsForPost, editComment, deleteComment, likeComment, Comment } from '../api/commentApi';
import { getUser } from '../api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FiHeart, FiEdit2, FiTrash2, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface CommentSectionProps {
  postId: string;
}

interface AuthorNames {
  [key: string]: string;
}

export interface NewComment {
  content: string;
  author: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const user = useSelector((state: RootState) => state.user);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<NewComment>({ content: '', author: user?.userid || '' });
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [updatedComment, setUpdatedComment] = useState<{ content: string }>({ content: '' });
  const [authorNames, setAuthorNames] = useState<AuthorNames>({});
  // console.log(postId);


  useEffect(() => {
    const fetchAuthorNames = async () => {
      const namesMap = { ...authorNames };
      comments ? await Promise.all(
        comments.map(async (comment) => {
          if (!namesMap[comment._id]) {
            try {
              const response = await getUser(comment.author);
              namesMap[comment._id] = response.data.data.username;
            } catch (error) {
              namesMap[comment._id] = 'Unknown Author';
            }
          }
        })
      ) : null;
      setAuthorNames(namesMap);
    };
    fetchAuthorNames();
  }, [comments]);

  useEffect(() => {
    getCommentsForPost(postId)
      .then((response) => setComments(response.data.data))
      .catch((error: Error) => console.log(error.message));
    // console.log(comments);

  }, [postId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user);
    console.log(newComment);
    if (!newComment.content.trim() || !user?.userid) return;

    try {
      const commentData = {
        content: newComment.content,
        author: user.userid,
        postId: postId
      };
      console.log(commentData);

      const response = await createComment(commentData);
      console.log("New comment response:", response.data);

      const newlyCreatedComment: Comment = {
        _id: response.data.data._id,
        content: response.data.data.content,
        author: response.data.data.author,
        postId: response.data.data.postId,
        createdAt: response.data.data.createdAt,
        updatedAt: response.data.data.updatedAt,
        likes: 0
      };

      setComments(prevComments => [newlyCreatedComment, ...prevComments]);

      setAuthorNames(prev => ({
        ...prev,
        [newlyCreatedComment._id]: user.username || 'Unknown'
      }));

      setNewComment({ content: '', author: user.userid });
      useEffect(() => {
        window.location.reload();
      }, [newComment]);
    } catch (error) {
      console.log("error comment", error);
    }
  };


  const handleLike = async (commentId: string) => {
    try {
      await likeComment(commentId);
      setComments(
        comments.map((comment) =>
          comment._id === commentId ? { ...comment, likes: (comment.likes || 0) + 1 } : comment
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditComment = (commentId: string, commentContent: string) => {
    setEditingCommentId(commentId);
    setUpdatedComment({ content: commentContent });
  };

  const handleUpdateComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCommentId || !updatedComment.content.trim()) return;

    try {
      const response = await editComment(editingCommentId, updatedComment);
      setComments(
        comments.map((comment) =>
          comment._id === editingCommentId ? response.data.data : comment
        )
      );
      setEditingCommentId(null);
      setUpdatedComment({ content: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8 lg:flex justify-around">
      <div className="textArea lg:w-[40%] flex flex-col gap-4">

        <h3 className="text-2xl font-bold text-yellow-500 mb-6">Discussion</h3>

        {/* Comment Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAddComment}
          className="relative"
        >
          <textarea
            className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700/50 focus:border-yellow-500 
            focus:ring-2 focus:ring-yellow-500/20 text-gray-200 placeholder-gray-500 transition-all duration-200"
            placeholder="Share your thoughts..."
            value={newComment.content}
            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
            rows={3}
          />
          <button
            type="submit"
            className="absolute bottom-4 right-4 p-2 rounded-lg bg-yellow-500 text-gray-900 
            hover:bg-yellow-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!newComment.content.trim()}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </motion.form>
      </div>

      {/* Comments List */}
      <div className="comment lg:w-[50%] flex flex-col gap-4">

        <AnimatePresence>
          {comments && comments.map((comment, index) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-xl bg-gray-900/30 border border-gray-700/50 
              hover:bg-gray-900/50 transition-all duration-200"
            >
              {editingCommentId === comment._id ? (
                <form onSubmit={handleUpdateComment} className="space-y-4">
                  <textarea
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-500 
                    focus:ring-2 focus:ring-yellow-500/20 text-gray-200"
                    value={updatedComment.content}
                    onChange={(e) => setUpdatedComment({ content: e.target.value })}
                    rows={3}
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-yellow-500 text-gray-900 hover:bg-yellow-400 
                      transition-colors duration-200"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCommentId(null)}
                      className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 
                      transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 
                      flex items-center justify-center text-gray-900 font-bold text-lg">
                        {authorNames[comment._id]?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-200">{authorNames[comment._id]}</h4>
                        <p className="text-sm text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {comment && comment.author === user.userid && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => handleEditComment(comment._id, comment.content)}
                          className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-yellow-500 
                          transition-colors duration-200"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-red-500 
                          transition-colors duration-200"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-300 mb-4">{comment.content}</p>

                  <button
                    onClick={() => handleLike(comment._id)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-500 
                    transition-colors duration-200"
                  >
                    <FiHeart className={`w-4 h-4 ${comment.likes ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                    <span>{comment.likes || 0} likes</span>
                  </button>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
