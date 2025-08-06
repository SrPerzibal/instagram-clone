// src/components/Stories.jsx
function Stories() {
    const dummyStories = [
        {
            id: 1,
            username: 'efrain',
            image: 'https://i.pravatar.cc/150?img=1',
        },
        {
            id: 2,
            username: 'laura',
            image: 'https://i.pravatar.cc/150?img=2',
        },
        {
            id: 3,
            username: 'andres',
            image: 'https://i.pravatar.cc/150?img=3',
        },
        {
            id: 4,
            username: 'cata',
            image: 'https://i.pravatar.cc/150?img=4',
        },
        {
            id: 5,
            username: 'maria',
            image: 'https://i.pravatar.cc/150?img=5',
        },
    ]

    return (
        <div className="flex  justify-center overflow-x-auto  gap-4 py-4 px-2">
            {dummyStories.map(story => (
                <div key={story.id} className="flex flex-col items-center text-sm">
                    <div className="w-22 h-22 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-yellow-500">
                        <img
                            src={story.image}
                            alt={story.username}
                            className="w-full h-full object-cover rounded-full border-2 border-white"
                        />
                    </div>
                    <p className="mt-1 text-gray-700">{story.username}</p>
                </div>
            ))}
        </div>
    )
}

export default Stories
