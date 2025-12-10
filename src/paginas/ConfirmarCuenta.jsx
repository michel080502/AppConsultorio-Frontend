import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios.jsx";
import Alerta from "../components/Alerta.jsx";
export default function ConfirmarCuenta() {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    // Obtener el id de los parametros de la url
    const params = useParams()
    const { id } = params;
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${id}`;
                const { data } = await clienteAxios.get(url);
                setCuentaConfirmada(true)
                setAlerta({
                    mensaje: data.msg,
                    error: false
                })
            } catch (error) {
                setAlerta({
                    mensaje: error.response.data.msg,
                    error: true
                })
            }
            setCargando(false)
        }
        confirmarCuenta();
    }, [id])

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Confirma tu Cuenta y Empieza a Administrar tus pacientes</h2>
                </div>
                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    {!cargando &&
                        <Alerta
                            alerta={alerta}
                        />}
                </div>
                {
                    cuentaConfirmada &&
                    <div className="mt-4 text-center">
                        <span className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                            <Link to="/" className="">Inicia Sesión</Link>
                        </span>
                    </div>
                }

            </div>
        </>
    )
}
