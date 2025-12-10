import { useState, useEffect, createContext } from "react";
import clienteAxios from "../src/config/axios";
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('apv_token')
            //Si no hay token deja de ejecutar 
            if (!token) {
                setCargando(false)
                return
            }
            //Se configuran headers para autenticarse
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const url = '/veterinarios/perfil'
                const { data } = await clienteAxios(url, config)
                //Asiganamos los datos del usuario al State
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('apv_token');
        setAuth({})
    }

    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem('apv_token')
        //Si no hay token deja de ejecutar 
        if (!token) {
            setCargando(false)
            return
        }
        //Se configuran headers para autenticarse
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config);
            const { token, confirmado, password, ...veterinarioActualizado } = data;
            //Asiganamos los datos del usuario al State
            setAuth(veterinarioActualizado)
            return {
                mensaje: 'Datos actualizado correctamente',
                error: false
            }
        } catch (error) {
            return {
                mensaje: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('apv_token')
        //Si no hay token deja de ejecutar 
        if (!token) {
            setCargando(false)
            return
        }
        //Se configuran headers para autenticarse
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/actualizar-password`
            const { data } = await clienteAxios.put(url, datos, config);
            return {
                mensaje: data.msg,
                error: false
            }
        } catch (error) {
            return {
                mensaje: error.response.data.msg,
                error: true
            }
        }
    }
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext