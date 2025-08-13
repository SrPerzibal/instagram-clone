import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import StoryModal from './StoryModal'



function Stories() {
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchStories = async () => {
            const { data, error } = await supabase
                .from('stories')
                .select('id, image_url, username, profile_picture, created_at')
                .order('created_at', { ascending: false });

            if (!error) setStories(data);
        };

        fetchStories();
    }, []);

    const openModal = (story) => {
        setSelectedStory(story);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedStory(null);
    };

    return (
        <div className="flex justify-center overflow-x-auto gap-4 py-4 px-2">
            {stories.map((story) => (
                <div key={story.id} onClick={() => openModal(story)} className="flex flex-col items-center text-sm">
                    <div className="w-22 h-22 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-yellow-500">
                        <img
                            src={story.profile_picture || 'https://via.placeholder.com/150'}
                            alt={story.username}
                            className="w-full h-full object-cover rounded-full border-2 border-white"
                        />
                    </div>
                    <p className="mt-1 text-gray-700">{story.username || 'Usuario'}</p>
                </div>
            ))}
            <StoryModal isOpen={isModalOpen} onClose={closeModal} story={selectedStory} />
        </div>
    );
}


export default Stories
