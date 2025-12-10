import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import usePacientes from "../../hooks/usePacientes";
import Alerta from './Alerta';
import { useState } from 'react';
export function ConfirmaEliminar({ open, setOpen, idPaciente, setIdPaciente }) {
    const { eliminarPaciente } = usePacientes();
    const [alerta, setAlerta] = useState({})
    const [eliminando, setEliminando] = useState(false)

    const handleEliminar = async () => {
        setAlerta({})
        setEliminando(true)
        const response = await eliminarPaciente(idPaciente);
        if (response.msg) {
            setAlerta({
                mensaje: 'Paciente eliminado correctamente',
                error: false
            })
            setTimeout(() => {
                setOpen(false)
                setIdPaciente(null)
                setAlerta({})
                setEliminando(false)
            }, 900)

        } else {
            setAlerta({
                mensaje: response,
                error: true
            })
            setEliminando(false)

        }
    }

    const { mensaje } = alerta
    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
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
                            <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:size-10">
                                        <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-400" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-white">
                                            Eliminar
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-400">
                                                ¿Estas seguro de que quieres eliminar al paciente?
                                            </p>
                                        </div>
                                        {mensaje &&
                                            <div className='mt-3'>
                                                <Alerta alerta={alerta} />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-700/25 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    disabled = {eliminando}
                                    onClick={() => handleEliminar(false)}
                                    className={`inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white  sm:ml-3 sm:w-auto 
                                        ${eliminando? 'bg-gray-500 opacity-60 cursor-not-allowed' : 'bg-red-500 hover:bg-red-400'}`}
                                >
                                    Eliminar
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => {
                                        setOpen(false)
                                        setIdPaciente(null)
                                    }}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20 sm:mt-0 sm:w-auto"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}