import React, { useEffect, useState } from 'react'
import Sidebar from '../pages/Sidebar'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabaseClient'

function Perfil() {
    const { session } = useAuth()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchMyPosts = async () => {
            if (!session?.user?.id) return

            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error trayendo tus posts:', error.message)
            } else {
                setPosts(data)
            }
        }

        fetchMyPosts()
    }, [session]);

    return (
        <div className="flex">
            <Sidebar />

            {/* Contenedor centralizado */}
            <div className="ml-60 max-sm:ml-0 w-full min-h-screen px-4">
                <div className="max-w-[935px] mx-auto">

                    {/* Sección de perfil */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 mt-12 mb-8 sm:ml-45 md:ml-0">
                        {/* Imagen de perfil */}
                        <img
                            src={session.user.user_metadata?.picture || 'https://via.placeholder.com/150'}
                            alt="avatar"
                            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                        />

                        {/* Info del usuario */}
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <h2 className="text-xl sm:text-2xl font-light">
                                    {session.user.user_metadata?.name || 'Usuario'}
                                </h2>
                                <div className="flex gap-2">
                                    <button className="border border-neutral-600 px-4 py-1 rounded text-sm">Editar perfil</button>
                                    <button className="border border-neutral-600 px-4 py-1 rounded text-sm">Ver archivo</button>
                                    <button className="text-xl">⚙️</button>
                                </div>
                            </div>

                            <div className="flex gap-6 text-sm mt-1">
                                <span><strong>{posts.length}</strong> publicaciones</span>
                                <span><strong>92</strong> seguidores</span>
                                <span><strong>194</strong> seguidos</span>
                            </div>

                            <div>
                                <p className="font-semibold">{session.user.user_metadata?.name || 'Usuario de instagram'}</p>
                                <p className="text-pink-500 text-sm">🍷</p>
                            </div>
                        </div>
                    </div>

                    {/* Línea divisoria */}
                    <div className="border-t border-neutral-800 mb-4" />

                    {/* Grid de publicaciones */}
                    <div className="grid grid-cols-3 gap-1 sm:gap-2">
                        {posts.map(post => (
                            <div key={post.id} className="aspect-square overflow-hidden">
                                <img
                                    src={post.image_url}
                                    alt="post"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil
