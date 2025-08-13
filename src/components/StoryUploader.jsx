import React, { useState } from 'react'
import { supabase } from '../supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../pages/Sidebar'

function StoryUploader() {
    const { session } = useAuth()
    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const navigate = useNavigate();


    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleUpload = async () => {
        if (!image || !session?.user) return;

        const filename = `${uuidv4()}-${image.name}`;

        // Subir imagen a Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('stories')
            .upload(filename, image);

        if (uploadError) {
            alert('Error al subir la historia');
            return;
        }

        // Obtener URL pública de la imagen
        const { data: publicUrlData } = supabase.storage
            .from('stories')
            .getPublicUrl(filename);

        // Datos del usuario desde AuthContext
        const username = session.user.user_metadata?.username || session.user.email;
        const profile_picture = session.user.user_metadata?.avatar_url || 'https://via.placeholder.com/150';

        // Insertar historia en la tabla con nombre e imagen del usuario
        const { error: insertError } = await supabase
            .from('stories')
            .insert([
                {
                    image_url: publicUrlData.publicUrl,
                    user_id: session.user.id,
                    username,
                    profile_picture,
                },
            ]);

        if (insertError) {
            alert('Error al guardar en la base de datos');
        } else {
            setImage(null);
            setPreviewUrl(null);
            navigate('/');
        }
    };

    return (

        <>
            <Sidebar />
            <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg text-center mt-10">
                <h2 className="text-2xl font-bold mb-4">Crear nueva historia</h2>

                {/* Área de imagen */}
                <label
                    htmlFor="file"
                    className="border-2 border-dashed border-gray-300 w-full h-48 flex items-center justify-center cursor-pointer text-gray-400 rounded-lg mb-4"
                >
                    {previewUrl ? (
                        <img src={previewUrl} alt="preview" className="h-full object-contain" />
                    ) : (
                        <span>Haz clic para subir una imagen</span>
                    )}
                    <input
                        type="file"
                        id="file"
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                    />
                </label>

                {/* Botón */}
                <button
                    onClick={handleUpload}
                    disabled={!image}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg w-full disabled:opacity-50"
                >
                    Publicar
                </button>
            </div>
        </>
    )
}

export default StoryUploader
