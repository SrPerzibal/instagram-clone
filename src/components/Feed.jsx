import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import PostCard from './PostCard'


import Sidebar from '../pages/Sidebar'
import Stories from './Stories'

function Feed() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false })

            if (!error) setPosts(data)
            else console.error(error)
        }

        fetchPosts()
    }, [])

    return (

        <>
            <div className="flex">
                <Sidebar />

                <div className="w-full md:ml-60 p-1 sm:p-6">
                    <Stories />

                    <div className="bg-white min-h-screen pt-6 max-w-full sm:max-w-2xl mx-auto pb-15">
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Feed
