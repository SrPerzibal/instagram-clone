import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function PostCard({ post, user }) {
    const [likesCount, setLikesCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        fetchLikes();
    }, []);

    const fetchLikes = async () => {
        // Contar likes
        const { count, error } = await supabase
            .from("likes")
            .select("*", { count: "exact", head: true })
            .eq("post_id", post.id);

        if (!error) setLikesCount(count);

        // Ver si el usuario ya dio like
        if (user) {
            const { data } = await supabase
                .from("likes")
                .select("*")
                .eq("post_id", post.id)
                .eq("user_id", user.id);
            setHasLiked(data.length > 0);
        }
    };

    const toggleLike = async () => {
        if (!user) return;

        if (hasLiked) {
            // Quitar like
            await supabase
                .from("likes")
                .delete()
                .eq("post_id", post.id)
                .eq("user_id", user.id);
            setLikesCount(likesCount - 1);
        } else {
            // Dar like
            await supabase
                .from("likes")
                .insert([{ post_id: post.id, user_id: user.id }]);
            setLikesCount(likesCount + 1);
        }
        setHasLiked(!hasLiked);
    };

    return (
        <div className="max-w-xl mx-auto bg-white border border-gray-300 rounded-md mb-6">
            {/* Top - Usuario */}
            <div className="flex items-center p-4">
                <img
                    src={post.profile_picture || "https://via.placeholder.com/40"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                    <p className="font-semibold text-sm">{post.username || "Usuario"}</p>
                    <p className="text-xs text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Imagen */}
            <img
                src={post.image_url}
                alt="post"
                className="w-full max-h-[600px] object-cover"
            />

            {/* Acciones */}
            <div className="flex items-center gap-4 px-4 pt-2 text-xl">
                <button onClick={toggleLike}>{hasLiked ? "❤️" : "🤍"}</button>
                <span>💬</span>
                <span>🔖</span>
            </div>

            {/* Descripción */}
            <div className="px-4 pb-3 text-sm">
                <p className="font-semibold">{likesCount} Me gusta</p>
                <p>
                    <span className="font-semibold">{post.username}</span>{" "}
                    {post.description}
                </p>
            </div>
        </div>
    );
}

export default PostCard;
