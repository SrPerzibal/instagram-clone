import React, { useEffect, useState } from 'react'

function StoryModal({ isOpen, onClose, story }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (isOpen && story) {
            setProgress(0) // reiniciar progreso
            let elapsed = 0
            const duration = 30 * 1000 // 30 segundos
            const interval = 100 // cada 100ms actualizamos

            const timer = setInterval(() => {
                elapsed += interval
                setProgress((elapsed / duration) * 100)

                if (elapsed >= duration) {
                    clearInterval(timer)
                    onClose() // cerrar automáticamente
                }
            }, interval)

            return () => clearInterval(timer)
        }
    }, [isOpen, story, onClose])

    if (!isOpen || !story) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="relative bg-black rounded-lg shadow-lg w-full max-w-md sm:max-w-lg overflow-hidden">

                {/* Barra de progreso */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700">
                    <div
                        className="h-1 bg-blue-500 transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Botón cerrar */}
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
