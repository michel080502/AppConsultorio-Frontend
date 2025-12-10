import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"
export const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmaPassword, setConfirmaPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const [alertaToken, setAlertaToken] = useState({})
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setPasswordModificado] = useState(false)
  const params = useParams()
  const { token } = params;
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      setAlerta({
        mensaje: "El password debe tener minimo 6 caracteres",
        error: true
      })
      return
    }

    if (password != confirmaPassword) {
      setAlerta({
        mensaje: "Las contraseñas no coinciden",
        error: true
      })
      return
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`
      const { data } = await clienteAxios.post(url, { password })
      setAlerta({
        mensaje: data.msg,
        error: false
      })
      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        mensaje: error.response.data.msg,
        error: true,
      })
    }

  }
  useEffect(() => {
    const confirmarToken = async () => {
      try {
        const url = `/veterinarios/olvide-password/${token}`
        await clienteAxios(url);
        setTokenValido(true)
      } catch (error) {
        setAlertaToken({
          mensaje: 'Enlace invalido :(',
          error: true
        })
      }
    }
    confirmarToken()
  }, [token])

  const { mensaje } = alertaToken
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Restablece tu Password</h2>
        </div>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Mostrar alerta si hay algo  */}
        {mensaje &&
          <Alerta
            alerta={alertaToken}
          />}
        {tokenValido &&
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              {alerta.mensaje &&
                <Alerta
                  alerta={alerta}
                />}
              <div>
                <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Nuevo Password</label>
                <div className="mt-2">
                  <input id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Confirma Nuevo Password</label>
                <div className="mt-2">
                  <input id="confirmapassword"
                    type="password"
                    name="confirmapassword"
                    value={confirmaPassword}
                    onChange={e => setConfirmaPassword(e.target.value)}
                    autoComplete="password" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500" />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-500 dark:shadow-none dark:hover:bg-blue-400 dark:focus-visible:outline-blue-500">Restablecer Password</button>
              </div>
            </form>

            {passwordModificado &&
              <div className="text-center py-4 mt-3">
                <span className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                  <Link to="/" className="">Inicia Sesión</Link>
                </span>
              </div>
            }
          </>
        }
      </div>
    </>
  )
}
