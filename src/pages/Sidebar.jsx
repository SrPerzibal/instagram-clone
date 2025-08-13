import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

import insta_logo from '../assets/InstagramLogo.png';
import home from '../assets/Home.png';
import crear from '../assets/Create.png';

function Sidebar() {
    const { session } = useAuth();

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <>
            {/* Sidebar para escritorio */}
            <div className="hidden md:flex flex-col h-screen w-84 md:w-55 bg-white p-6 fixed border-r border-gray-300">
                <img className="h-9 w-30 mt-5" src={insta_logo} alt="Instagram" />

                <nav className="flex flex-col gap-4 mt-9">
                    <Link to="/" className="flex gap-4 items-center h-10 rounded hover:bg-gray-200 text-left font-semibold">
                        <img className="h-6 w-auto" src={home} alt="Inicio" />
                        Inicio
                    </Link>

                    <Link to="/crear" className="flex gap-4 items-center h-10 rounded hover:bg-gray-200 text-left font-semibold">
                        <img className="h-6 w-auto" src={crear} alt="Crear" />
                        Crear
                    </Link>

                    <Link to="/historia" className="flex gap-4 items-center h-10 rounded hover:bg-gray-200 text-left font-semibold">
                        <img className="h-6 w-auto" src={crear} alt="Crear Historia" />
                        Crear Historia
                    </Link>

                    <Link to="/perfil" className="flex gap-4 items-center h-10 rounded hover:bg-gray-200 text-left font-semibold">
                        <img
                            src={session.user.user_metadata?.picture || 'https://via.placeholder.com/40'}
                            alt="Perfil"
                            className="h-7 w-7 rounded-full object-cover"
                        />
                        Perfil
                    </Link>

                    <button onClick={handleLogout} className="h-10 rounded hover:bg-gray-200 hover:text-red-500 mt-6 text-left">
                        Cerrar sesión
                    </button>
                </nav>
            </div>

            {/* Barra inferior para móvil */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 flex justify-around items-center h-14 z-50">
                <Link to="/" className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-black transition">
                    <img src={home} className="h-6 w-auto mb-1" alt="Inicio" />
                    <span>Inicio</span>
                </Link>

                <Link to="/crear" className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-black transition">
                    <img src={crear} className="h-6 w-auto mb-1" alt="Crear" />
                    <span>Publicar</span>
                </Link>

                <Link to="/historia" className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-black transition">
                    <img className="h-6 w-auto mb-1" src={crear} alt="Historia" />
                    <span>Historia</span>
                </Link>

                <Link to="/perfil" className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-black transition">
                    <img
                        src={session.user.user_metadata?.picture || 'https://via.placeholder.com/40'}
                        alt="Perfil"
                        className="h-7 w-7 rounded-full object-cover mb-1"
                    />
                    <span>Perfil</span>
                </Link>
            </div>

        </>
    );
}

export default Sidebar;
