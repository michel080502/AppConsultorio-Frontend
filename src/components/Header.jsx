import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { PawPrint } from 'lucide-react'
export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const {cerrarSesion} = useAuth()

    return (
        <header className="bg-white dark:bg-slate-950">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1 gap-2">
                    <span className="text-3xl text-white font-bold">VetCare Pro</span>
                    <Link to={"/admin"} className="-m-1.5 p-1.5">
                        <PawPrint className="h-8 w-auto text-blue-500" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Link to={"/admin"} className='text-lg/6 font-semibold text-white'>
                        Pacientes
                    </Link>
                    <Link to={"/admin/perfil"} className="text-lg/6 font-semibold text-white">
                        Perfil
                    </Link>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <button  onClick={cerrarSesion} className="text-lg/6 font-semibold text-white hover:cursor-pointer">
                        Cerrar Sesión <span aria-hidden="true">&rarr;</span>
                    </button>
                </div>
            </nav>

            <Transition show={mobileMenuOpen} as={Fragment}>
                <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
                    {/* Fondo semitransparente */}
                    <div className="fixed inset-0 z-50" />
                    <TransitionChild
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
                    </TransitionChild>

                    {/* Panel lateral */}
                    <TransitionChild
                        as={Fragment}
                        enter="transform transition ease-in-out duration-300"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-300"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-gray-900 p-6 sm:ring-1 sm:ring-gray-100/10">
                            <div className="flex items-center justify-between">
                                <div className='flex gap-2'>
                                    <span className="text-2xl text-white font-bold">VetCare Pro</span>
                                    <a href="#" className="-m-1.5 p-1.5">
                                        <PawPrint className="h-8 w-auto text-blue-500" />
                                    </a>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-m-2.5 rounded-md p-2.5 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>

                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-white/10">
                                    <div className="space-y-2 py-6">
                                        <Link
                                            to={"/admin"}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold text-white hover:bg-white/5">
                                            Pacientes
                                        </Link>
                                        <Link
                                            to={"/admin/perfil"} className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold text-white hover:bg-white/5">
                                            Perfil
                                        </Link>
                                    </div>
                                    <div className="py-6">
                                        <button 
                                        type='button'
                                        onClick={cerrarSesion}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold text-white hover:bg-white/5">
                                            Cerrar  Sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </Dialog>
            </Transition>

        </header>
    )
}
