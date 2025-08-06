import React from 'react'

function StoryModal({ isOpen, onClose, story }) {
    if (!isOpen || !story) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="relative bg-black rounded-lg shadow-lg w-full max-w-md sm:max-w-lg overflow-hidden">

                {/* Cerrar */}
                <button
                    className="absolute top-3 right-3 text-blue-500 text-2xl z-50"
                    onClick={onClose}
                >
                    &times;
                </button>

                {/* Imagen de la historia */}
                <img
                    src={story.image_url}
                    alt="Historia"
                    className="w-full h-auto object-contain max-h-[80vh]"
                />

            </div>
        </div>
    )
}

export default StoryModal
