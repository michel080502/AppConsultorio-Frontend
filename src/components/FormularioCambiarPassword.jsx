import Alerta from "./Alerta"
import { useState } from "react"
export const FormularioCambiarPassword = ({guardarPassword}) => {
    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        pwd_actual: '',
        pwd_nuevo: '',
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        const esVacio = Object.values(password).some(campo => campo === '')
        if (esVacio) {
            setAlerta({ mensaje: 'Ambos campos son obligatorios', error: true })
            setTimeout(() => { setAlerta({}) }, 3000)
            return
        }

        if (password.pwd_nuevo.length < 6) {
            setAlerta({ mensaje: 'El nuevo password debe tener minimo 6 caracteres', error: true })
            setTimeout(() => { setAlerta({}) }, 3000)
            return
        }

        const respuesta = await guardarPassword(password);
        setAlerta(respuesta)
    }

    const { mensaje } = alerta
    return (
        <>
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Nuevo Password</h1>
                <p className="text-gray-200">Modifica tu password aqui</p>
            </div>

            <form action="" onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-white/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                            <div className="">
                                <label htmlFor="p" className="block text-sm/6 font-medium text-white">Password Actual</label>
                                <div className="mt-2">
                                    <input
                                        id="pwd_actual"
                                        type="password"
                                        name="pwd_actual"
                                        autoComplete="pwd_actual"
                                        placeholder='Escribe tu password actual'
                                        onChange={e => setPassword({
                                            ...password,
                                            [e.target.name]: e.target.value
                                        })}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" />
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="pwd_nuevo" className="block text-sm/6 font-medium text-white">Nuevo Password</label>
                                <div className="mt-2">
                                    <input
                                        id="pwd_nuevo"
                                        type="password"
                                        name="pwd_nuevo"
                                        onChange={e => setPassword({
                                            ...password,
                                            [e.target.name]: e.target.value
                                        })}
                                        placeholder='Escribe tu nuevo password'
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="mt-6 mb-6 flex items-center justify-between gap-x-6">
                    <div className='mt-2'>
                        {mensaje && <Alerta alerta={alerta} />}
                    </div>
                    <input type="submit"
                        value='Actualizar password'
                        className="hover:cursor-pointer rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500" />
                </div>
            </form>
        </>
    )
}
