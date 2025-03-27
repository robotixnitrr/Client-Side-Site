import { TextInput, Select } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

import { useNavigate, useLocation } from 'react-router-dom'
import PostCard from '../components/PostCard';
import "../styles/Search.css"
import { Post, getQueryLimitPost } from "../api/postApi"

interface SidebarData {
    searchTerm: string;
    sort: string;
    category: string;
}

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarData, setSiderbarData] = useState<SidebarData>({
        searchTerm: '',
        sort: 'desc',
        category: 'all'
    })
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(true);
    const [limit, setLimit] = useState(10);
    const [limitPost, setLimitPost] = useState<Post[]>([]);
    setLimit

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm') || '';
        const sortFromUrl = urlParams.get('sort') || 'desc';
        const categoryFromUrl = urlParams.get('category') || 'all';

        setSiderbarData({
            searchTerm: searchTermFromUrl,
            sort: sortFromUrl,
            category: categoryFromUrl
        });

        const fetchPost = async () => {
            setLoading(true);
            console.log(urlParams.toString());
            
            const searchQuery = urlParams.toString();
            try {
                const res = await fetch(`/api/post/getposts?${searchQuery}`);
                if (!res.ok) {
                    setLoading(false);
                    return;
                }
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);
                setShowMore(data.posts.length >= 9);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchPost();
    }, [location.search]);

    useEffect(() => {
        const fetchLimitPost = async () => {
            try {
                const res = await getQueryLimitPost(limit);
                setLimitPost(res.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLimitPost();
    }, [limit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.id === 'searchTerm') {
            setSiderbarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSiderbarData({ ...sidebarData, sort: order });
        }
        if (e.target.id === 'category') {
            const category = e.target.value === "null" ? '' : e.target.value;
            setSiderbarData({ ...sidebarData, category });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('term', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category === "null" ? 'all' : sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleShowMore = async () => {
        const startIndex = posts.length;
        try {
            const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setPosts([...posts, ...data.posts]);
                setShowMore(data.posts.length >= 9);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='search flex flex-col md:flex-row'
        >
            <motion.div 
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
                className='p-7 border-t border-b md:border-r md:min-h-screen border-gray-500'
            >
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term: </label>
                        <TextInput placeholder='Serach..' id='searchTerm' style={{ "padding": "0.5rem" }} type='text' value={sidebarData.searchTerm} onChange={handleChange} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="" className='whitespace-nowrap font-semibold'>Sort:</label>
                        <Select onChange={handleChange} value={sidebarData.sort} id='sort' style={{ padding: "0.5rem" }}>
                            <option value="desc">Latest</option>
                            <option value="asc">Oldest</option>
                        </Select>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="" className='whitespace-nowrap font-semibold'>Category:</label>
                        <Select onChange={handleChange} value={sidebarData.category} id='category' style={{ padding: "0.5rem" }}>
                            <option value="" className='p-4'>Select a Category</option>
                            <option value="uncategorized">Uncategorized</option>
                            <option value="sports">Sports</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="raipur">Raipur</option>
                            <option value="bilaspur">Bilaspur</option>
                            <option value="india">india</option>
                            <option value="foregin">foregin</option>
                        </Select>

                    </div>
                    <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-base px-5 py-2.5 text-center my-5 dark:bg-blue-600 dark:hover:bg-blue-700 mx-2 dark:focus:ring-blue-800'>Search</button>
                </form>
            </motion.div>

            <motion.div 
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3 }}
                className='w-full'
            >
                <h1 className='text-3xl font-semibold sm: bodrder-b border-gray=500 p-3 mt-5'>POST RESULTS:</h1>
                <div className="p-7 flex flex-wrap max-w-7xl">
                    {
                        !loading && posts.length === 0 && (<p className='text-xl text-gray-500'>No Post found.</p>)
                    }
                    {
                        posts.length == 0 && (
                            <div className="flex flex-wrap mt-5 max-w-7xl">
                                {
                                    limitPost && limitPost.map((post) => (
                                        <PostCard key={post._id} post={post} />
                                    ))
                                }
                            </div>

                        )
                    }
                    {
                        !loading && posts && posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))
                    }
                    {
                        showMore && <button className='text-teal-500 text-lg hover:underline p-7 w-full' onClick={handleShowMore}>show more</button>
                    }
                </div>
            </motion.div>
        </motion.div>
    )
}