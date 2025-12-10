import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";
export default function Registrar() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ mensaje: 'Todos los campos son obligatorios', error: true })
      return
    }

    if (password !== repetirPassword) {
      setAlerta({ mensaje: 'Los password no coinciden', error: true })
      return
    }

    if (password.length < 6) {
      setAlerta({ mensaje: 'El password debe ser minimo 6 caracteres', error: true })
      return
    }
    setAlerta({});

    //Crear el usuario en el backend
    try {
      const url = `/veterinarios`;
      await clienteAxios.post(url,{nombre,email,password});
      setAlerta({
        mensaje: 'Usuario Registrado, Revisa tu email para confirmar tu cuenta',
        error: false
      })
    } catch (error) {
      console.log(error);
      setAlerta({
        mensaje: error.response.data.msg,
        error: true
      })
    }

  }

  const { mensaje } = alerta;
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Crea tu Cuenta</h2>
        </div>
        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Mostrar alerta si hay algo  */}
          {mensaje &&
            <Alerta
              alerta={alerta}
            />}
          <form
            onSubmit={handleSubmit}
            className="space-y-5">
            <div>
              <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Nombre</label>
              <div className="mt-2">
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  value={nombre}
                  onChange={e => { setNombre(e.target.value) }}
                  //required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Email</label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value) }}
                  //required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Password</label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value) }}
                  //required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Confirma password</label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="repetirpassword"
                  value={repetirPassword}
                  onChange={e => { setRepetirPassword(e.target.value) }}
                  // required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500" />
              </div>
            </div>

            <div>
              <button type="submit"
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:shadow-none dark:hover:bg-blue-400 dark:focus-visible:outline-blue-500">Sign in</button>
            </div>

            <p className="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
              ¿Ya tienes una cuenta?{' '}
              <span className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                <Link to="/" className="">Inicia Sesión</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
