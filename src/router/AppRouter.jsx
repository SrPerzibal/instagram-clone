import { BrowserRouter, Routes, Route } from "react-router"
import PostUploader from "../components/PostUploader"
import Feed from "../components/Feed"
import Perfil from "../components/Perfil"

function AppRouter() {
    return (

        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/crear" element={<PostUploader />} />
            <Route path="/perfil" element={<Perfil />} />
        </Routes>

    )
}

export default AppRouter