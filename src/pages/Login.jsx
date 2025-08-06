import { supabase } from '../supabaseClient'
import log from '../assets/log.png'
import logo from '../assets/InstagramLogo.png'
import google from '../assets/google_icon-icons.com_62736.svg'

export default function Login() {
    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }

    return (
        <div className="max-sm:gap-0 max-lg:gap-0 max-lg:max-h-screen flex gap-29 items-center justify-center min-h-screen">
            <div className='flex'>
                <img className='max-sm:hidden max-lg:hidden' src={log} alt="Imagen Landing" />
            </div>
            <div className=' max-sm:min-w-screen max-sm:min-h-screen flex flex-col justify-center items-center-safe'>
                <div className='mb-8'>
                    <img src={logo} alt="Logo Instagram" />
                </div>

                <div className='flex flex-col gap-2'>
                    <input className='w-65 h-10 px-2 text-xs bg-gray-100 border-none border-b-gray-400 rounded-sm' type="text" placeholder='Teléfono, usuario o correo electrónico' />
                    <input className='w-65 h-10 px-2 text-xs bg-gray-100 border-none border-b-gray-400 rounded-sm' type="password" name="" id="" placeholder='Contraseña' />
                    <button className='w-65 h-8 bg-blue-500 rounded-md text-white font-semibold' type="submit">Entrar</button>
                </div>
                <span className='flex justify-center m-3'>o</span>
                <button
                    onClick={handleLogin}
                    className=" flex items-center gap-1 font-medium text-blue-500 px-6 py-2 cursor-pointer"
                >
                    <img className='h-5' src={google} alt="Logo Google" /> Iniciar sesión con Google
                </button>

                <p className='text-sm mt-3.5 hover:text-gray-400 cursor-pointer'>¿Has olvidado la contraseña?</p>
                <p className='text-sm mt-12'>¿No tienes cuenta? <a className='text-blue-500 font-medium' href="">Regístrate</a></p>
            </div>
        </div>
    )
}