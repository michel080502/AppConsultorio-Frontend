import { Link, useNavigate } from 'react-router-dom'
import clienteAxios from '../config/axios'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import Alerta from '../components/Alerta'
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate()

  const { setAuth } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if ([email, password].includes('')) {
      setAlerta({ mensaje: 'Todos los campos son obligatorios', error: true })
      return
    }

    try {
      const url = '/veterinarios/login'
      const { data } = await clienteAxios.post(url, { email, password })
      localStorage.setItem('apv_token', data.token)
      setAuth(data)
      navigate('/admin')
    } catch (error) {
      console.log(error)
      setAlerta({ mensaje: error.response.data.msg, error: true })
    }
  }

  const { mensaje } = alerta;

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Inicia Sesión y Administra tus Pacientes</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {mensaje &&
            <Alerta
              alerta={alerta}
            />}
          <form onSubmit={handleSubmit} className="space-y-6" >
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Email</label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Password</label>
                <div className="text-sm">
                  <span className='font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'>
                    <Link to="/olvide-password" className="">Olvidé mi contraseña</Link>
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:shadow-none dark:hover:bg-blue-400 dark:focus-visible:outline-blue-500">Iniciar sesión</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
            ¿Aún no tienes una cuenta?{' '}
            <span className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
              <Link to="/registrar" className="">Crea una cuenta</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  )
}
