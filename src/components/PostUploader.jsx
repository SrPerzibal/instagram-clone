import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../pages/Sidebar'

function PostUploader() {
    const { session } = useAuth()
    const [file, setFile] = useState(null)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate();

    const handleUpload = async () => {
        if (!file || !session) {
            alert("Falta el archivo o no hay sesión activa.")
            return
        }

        setUploading(true)

        try {
            // Generar nombre único por usuario y timestamp
            const fileExt = file.name.split('.').pop()
            const fileName = `${session.user.id}/${Date.now()}.${fileExt}`

            // Subir al bucket "posts"
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('posts')
                .upload(fileName, file)

            if (uploadError) {
                console.error("❌ Error al subir:", uploadError.message)
                alert("Error al subir imagen: " + uploadError.message)
                return
            }

            // Obtener la URL pública
            const { data: urlData } = supabase
                .storage
                .from('posts')
                .getPublicUrl(fileName)

            const imageUrl = urlData.publicUrl

            // Insertar en tabla "posts"
            const { error: insertError } = await supabase
                .from('posts')
                .insert({
                    user_id: session.user.id,
                    description,
                    image_url: imageUrl,
                    created_at: new Date().toISOString(),
                    username: session.user.user_metadata?.name || 'Usuario',
                    profile_picture: session.user.user_metadata?.picture || null
                })

            if (insertError) {
                console.error("❌ Error insertando:", insertError.message)
                alert("Error guardando post: " + insertError.message)
            } else {
                // alert("¡Post publicado! ✅")
                setFile(null)
                setDescription('')
                navigate('/')
            }
        } catch (err) {
            console.error("❗ Error inesperado:", err)
            alert("Algo salió mal.")
        } finally {
            setUploading(false)
        }
    }

    return (

        <>
            <Sidebar />
            <div className="max-w-md w-full mx-auto mt-10 bg-white border border-gray-200 rounded-3xl shadow-lg overflow-auto transition-all">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">Crear nueva publicación</h2>

                    {/* Imagen de vista previa */}
                    {file && (
                        <div className="mb-4">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Vista previa"
                                className="w-full h-64 object-cover rounded-xl border"
                            />
                        </div>
                    )}

                    <label className="block mb-4 cursor-pointer group">
                        <div className="flex items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl group-hover:border-blue-400 transition">
                            <span className="text-gray-400 group-hover:text-blue-500 transition">
                                {file ? 'Cambiar imagen' : 'Haz clic para subir una imagen'}
                            </span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="hidden"
                        />
                    </label>

                    <textarea
                        placeholder="Escribe una descripción..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-20 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none mb-4 text-gray-700"
                    />

                    <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                    >
                        {uploading ? 'Subiendo...' : 'Publicar'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default PostUploader
