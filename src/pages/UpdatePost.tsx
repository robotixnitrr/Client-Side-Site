import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePost,
  getPost,
  updatePost,
  Post,
  ApiResponse,
} from "../api/postApi";
import { AxiosResponse } from "axios";

interface UpdatedPost {
  title: string;
  content: string;
  author: string;
  category: string;
}

export default function UpdatePost() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [updatedPost, setUpdatedPost] = useState<UpdatedPost>({
    title: "",
    content: "",
    author: "",
    category: "",
  });
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  error;
  const handleUpdatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (postId) {
        const response = await updatePost(postId, updatedPost);
        if (response) {
          setPost(response.data.data);
          navigate(`/post/${postId}`);
        }
      }
    } catch (err) {
      console.log("Error updating post:", err);
    }
  };

  const handleDeletePost = async () => {
    try {
      if (postId) {
        await deletePost(postId);
        navigate("/post");
      }
    } catch (err) {
      console.log("Error deleting post:", err);
    }
  };

  useEffect(() => {
    if (postId) {
      getPost(postId)
        .then((response: AxiosResponse<ApiResponse<Post>>) => {
          setPost(response.data.data);
          setUpdatedPost({
            title: response.data.data.title,
            content: response.data.data.content,
            author: response.data.data.author,
            category: response.data.data.category,
          });
        })
        .catch((err: Error) => {
          console.error("Error fetching post:", err);
          setError("Failed to fetch post details");
        });
    }
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form
        onSubmit={handleUpdatePost}
        className="max-w-lg mx-auto p-6 bg-gray-900 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-yellow-500">
          Update Post
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={updatedPost.title}
          onChange={(e) =>
            setUpdatedPost({ ...updatedPost, title: e.target.value })
          }
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 transition-all duration-200 placeholder-yellow-500 placeholder-opacity-100 bg-gray-800"
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={updatedPost.category}
          onChange={(e) =>
            setUpdatedPost({ ...updatedPost, category: e.target.value })
          }
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 transition-all duration-200 placeholder-yellow-500 placeholder-opacity-100 bg-gray-800"
          required
        />

        <textarea
          placeholder="Content"
          value={updatedPost.content}
          onChange={(e) =>
            setUpdatedPost({ ...updatedPost, content: e.target.value })
          }
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 transition-all duration-200 placeholder-yellow-500 placeholder-opacity-100 bg-gray-800"
          rows={5}
          required
        />
        {/* 
        <input
          type="text"
          placeholder="Author Name"
          value={updatedPost.author}
          onChange={(e) => setUpdatedPost({ ...updatedPost, author: e.target.value })}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-yellow-500 transition-all duration-200 placeholder-yellow-500 placeholder-opacity-100 bg-gray-800"
          required
        /> */}

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-500"
        >
          Update Post
        </button>
      </form>

      <button
        onClick={handleDeletePost}
        className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors duration-200 mt-4 focus:outline-none focus:ring-4 focus:ring-red-500"
      >
        Delete Post
      </button>
    </>
  );
}
