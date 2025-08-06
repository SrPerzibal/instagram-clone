function PostCard({ post }) {
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
                <span>❤️</span>
                <span>💬</span>
                <span>🔖</span>
            </div>

            {/* Descripción y Comentarios */}
            <div className="px-4 pb-3 text-sm">
                <p className="font-semibold">13 022 Me gusta</p>
                <p>
                    <span className="font-semibold">{post.username}</span> {post.description}
                </p>
                <p className="text-gray-500">Ver los 46 comentarios</p>
                <input
                    placeholder="Añade un comentario..."
                    className="w-full mt-2 text-sm p-1  outline-none"
                />
            </div>
        </div>
    )
}

export default PostCard