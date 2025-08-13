import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function PostCard({ post, user }) {
    const [likesCount, setLikesCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const username = user.user_metadata?.name

    // ✅ Cargar likes y comentarios al montar
    useEffect(() => {
        if (!post?.id) return;

        const fetchLikes = async () => {
            const { data } = await supabase
                .from("likes")
                .select("*")
                .eq("post_id", post.id);
            setLikesCount(data.length);
            setHasLiked(data.some(like => like.user_id === user?.id));
        };

        const fetchComments = async () => {
            const { data } = await supabase
                .from("comments")
                .select("*")
                .eq("post_id", post.id)
                .order("created_at", { ascending: true });
            setComments(data || []);
        };

        fetchLikes();
        fetchComments();
    }, [post?.id, user]);

    // ❤️ Like
    const toggleLike = async () => {
        if (!user) {
            alert("Debes iniciar sesión para dar like");
            return;
        }

        if (hasLiked) {
            await supabase
                .from("likes")
                .delete()
                .eq("post_id", post.id)
                .eq("user_id", user.id);
            setLikesCount(prev => prev - 1);
            setHasLiked(false);
        } else {
            await supabase
                .from("likes")
                .insert([{ post_id: post.id, user_id: user.id }]);
            setLikesCount(prev => prev + 1);
            setHasLiked(true);
        }
    };

    // 💬 Agregar comentario
    const addComment = async (e) => {
        if (e.key === "Enter" && newComment.trim() !== "") {
            if (!user) {
                alert("Debes iniciar sesión para comentar");
                return;
            }

            const { data, error } = await supabase
                .from("comments")
                .insert([{ post_id: post.id, user_id: user.id, content: newComment, username: username}])
                .select();

            if (!error && data) {
                setComments(prev => [...prev, data[0]]);
                setNewComment("");
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white border border-gray-300 rounded-md mb-6">
            {/* Top - Usuario */}
            <div className="flex items-center p-4">
                <img
                    src={post.profile_picture || 'https://via.placeholder.com/40'}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3">
                    <p className="font-semibold text-sm">{post.username || 'Usuario'}</p>
                    <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
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
                <span
                    onClick={toggleLike}
                    className="cursor-pointer"
                >
                    {hasLiked ? "❤️" : "🤍"}
                </span>
                <span>💬</span>
                <span>🔖</span>
            </div>

            {/* Descripción y Comentarios */}
            <div className="px-4 pb-3 text-sm">
                <p className="font-semibold">{likesCount} Me gusta</p>
                <p>
                    <span className="font-semibold">{post.username}</span> {post.description}
                </p>

                {/* Lista de comentarios */}
                {comments.length > 0 && (
                    <div className="mt-2">
                        {comments.map((c) => (
                            <p key={c.id}>
                                <span className="font-semibold">{c.username || "User"}:</span> {c.content}
                            </p>
                        ))}
                    </div>
                )}

                {/* Input de comentario */}
                <input
                    placeholder="Añade un comentario..."
                    className="w-full mt-2 text-sm p-1 outline-none"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={addComment}
                />
            </div>
        </div>
    );
}

export default PostCard;
