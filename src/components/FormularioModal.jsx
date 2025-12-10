import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Alerta from './Alerta';
import { useEffect, useState } from 'react'
import usePacientes from '../../hooks/usePacientes';
export const FormularioModal = ({ open, setOpen }) => {
    const { paciente, setPaciente, editando, setEditando, guardarPaciente, actualizarPaciente } = usePacientes()
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [alerta, setAlerta] = useState({})
    const [subiendoCambios,setSubiendoCambios] = useState(false)
    const resetForm = () => {
        setAlerta({});
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
    }

    const handleSubmit = async (e) => {
        let response, mensaje;
        e.preventDefault();

        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                mensaje: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        setAlerta({})
        setSubiendoCambios(true)

        if (!editando) {
            response = await guardarPaciente({ nombre, propietario, email, fecha, sintomas });
            mensaje = "Paciente agregado correctamente";
        } else {
            response = await actualizarPaciente({ nombre, propietario, email, fecha, sintomas }, id)
            mensaje = "Paciente actualizado correctamente";
        }


        if (response.createdAt) {
            setAlerta({
                mensaje: mensaje,
                error: false
            })

            setTimeout(() => {
                handleClose();
                setSubiendoCambios(false)
            }, 900)

        } else {
            setAlerta({
                mensaje: response,
                error: true
            })
            setSubiendoCambios(false)
        }
    }

    const handleClose = () => {
        setOpen(false);
        setTimeout(()=>{
        setAlerta({});
        resetForm();
        setEditando(false);
        setPaciente({});
        },300)
    }

    useEffect(() => {
        if (editando) setOpen(true);
        if (paciente && paciente._id) {
            setId(paciente._id);
            setNombre(paciente.nombre || '');
            setPropietario(paciente.propietario || '');
            setEmail(paciente.email || '');
            setFecha(paciente.fecha ? paciente.fecha.split('T')[0] : '');
            setSintomas(paciente.sintomas || '')
        }
    }, [editando, paciente])

    const { mensaje } = alerta
    return (
        <>
            <Dialog open={open} onClose={handleClose}  className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            <form onSubmit={handleSubmit}>
                                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex-col sm:items-center">
                                        <div className="mt-3 text-center sm:mt-0 sm:m-4 sm:text-left">
                                            <DialogTitle as="h3" className="text-base font-semibold text-white">
                                                {editando? 'Actualiza la información de tu paciente' : "Añade un nuevo paciente"}
                                            </DialogTitle>

                                            <div className="mt-2">

                                                <label className='text-md text-gray-100' htmlFor="nombre">Nombre </label>
                                                <input
                                                    className=' w-full rounded-md bg-white my-2 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500'
                                                    type="text"
                                                    id='mascota'
                                                    placeholder='Nombre de la Mascota'
                                                    value={nombre}
                                                    onChange={e => { setNombre(e.target.value) }} />

                                                <label className='text-md text-gray-100' htmlFor="propietario">Propietario </label>
                                                <input
                                                    className=' w-full rounded-md bg-white my-2 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500'
                                                    type="text"
                                                    id='propietario'
                                                    placeholder='Nombre del propietario'
                                                    value={propietario}
                                                    onChange={e => { setPropietario(e.target.value) }} />

                                                <label className='text-md text-gray-100' htmlFor="email">Email </label>
                                                <input
                                                    className=' w-full rounded-md bg-white my-2 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500'
                                                    type="email"
                                                    id='propietario'
                                                    placeholder='Email del propietario'
                                                    value={email}
                                                    onChange={e => { setEmail(e.target.value) }} />

                                                <label className='text-md text-gray-100' htmlFor="fecha">Fecha Alta</label>
                                                <input
                                                    className=' w-full rounded-md bg-white my-2 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500'
                                                    type="date"
                                                    id='fecha'
                                                    value={fecha}
                                                    onChange={e => { setFecha(e.target.value) }} />

                                                <label className='text-md text-gray-100' htmlFor="sintomas">Sintomas</label>
                                                <textarea
                                                    className=' w-full rounded-md bg-white my-2 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-blue-500'
                                                    id='sintomas'
                                                    placeholder='Describe los sintomas'
                                                    value={sintomas}
                                                    onChange={e => { setSintomas(e.target.value) }} />
                                                {mensaje && <Alerta alerta={alerta} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <input
                                        type="submit"
                                        value={editando? 'Guardar' : 'Agregar'}
                                        disabled={subiendoCambios}
                                        className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white sm:ml-3 sm:w-auto transition-all ${
                                            subiendoCambios 
                                                ? 'bg-gray-500 opacity-60 cursor-not-allowed' 
                                                : 'bg-green-500 hover:bg-green-400'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        data-autofocus
                                        onClick={handleClose}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
