import { useEffect, useState } from 'react'
import Alerta from './Alerta'
export const FormularioEditarPerfil = ({auth, actualizarPerfil}) => {
    const [perfil, setPerfil] =  useState({})
    const [alerta,setAlerta] = useState({})

    const handleSubmit = async (e)=>{
        e.preventDefault()     
        const {nombre,email} = perfil
        if([nombre,email].includes('')){
            setAlerta({mensaje:"Email y Nombre son obligatorios", error:true})
            return
        }

        const resultado = await actualizarPerfil(perfil);
        setAlerta(resultado)
    }

    useEffect(()=>{
        setPerfil(auth)
    },[auth])

    const {mensaje} = alerta
    return (
        <>
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Mi Perfil</h1>
                <p className="text-gray-200">Modifica tu información aqui</p>
            </div>

            <form action="" onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-white/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                            <div className="">
                                <label htmlFor="nombre" className="block text-sm/6 font-medium text-white">Nombre</label>
                                <div className="mt-2">
                                    <input 
                                    id="nombre" 
                                    type="text" 
                                    name="nombre" 
                                    autoComplete="nombre" 
                                    value={perfil.nombre || ''}
                                    onChange={e=>setPerfil({
                                        ...perfil,
                                        [e.target.name] : e.target.value
                                    })}
                                    placeholder='Tu nombre'
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" />
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="web" className="block text-sm/6 font-medium text-white">Sitio Web</label>
                                <div className="mt-2">
                                    <input 
                                    id="web" 
                                    type="text" 
                                    name="web" 
                                    autoComplete="web" 
                                    value={perfil.web || ''}
                                    onChange={e=>setPerfil({
                                        ...perfil,
                                        [e.target.name] : e.target.value
                                    })}
                                    placeholder='www.mipaginaWeb.com'
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" />
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="telefono" className="block text-sm/6 font-medium text-white">Telefono</label>
                                <div className="mt-2">
                                    <input 
                                    id="telefono" 
                                    type="text" 
                                    name="telefono" 
                                    autoComplete="tel"
                                    placeholder='123456789'
                                    maxLength={10}
                                    value={perfil.telefono || ''}
                                    onChange={e=>setPerfil({
                                        ...perfil,
                                        [e.target.name] : e.target.value
                                    })}
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" />
                                </div>
                            </div>

                            <div className="">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-white">Email</label>
                                <div className="mt-2">
                                    <input 
                                    id="email" 
                                    type="email" 
                                    name="email" 
                                    autoComplete="email" 
                                    value={perfil.email || ''}
                                    onChange={e=>setPerfil({
                                        ...perfil,
                                        [e.target.name] : e.target.value
                                    })}
                                    placeholder='micorreo@correo.com'
                                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="mt-6 mb-6 flex items-center justify-between gap-x-6">
                    <div className='mt-2'>
                        {mensaje && <Alerta alerta={alerta}/>}
                    </div>
                    <input type="submit"
                    value= 'Guardar'
                    className="hover:cursor-pointer rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"/>
                </div>
            </form>
        </>
    )
}
