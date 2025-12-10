import { useState } from 'react';
import { FormularioCambiarPassword } from '../components/FormularioCambiarPassword';
import { FormularioEditarPerfil } from '../components/FormularioEditarPerfil';
import useAuth from "../../hooks/useAuth"
export const EditarPerfil = () => {
    const [activeTab, setActiveTab] = useState('perfil');
    const tabs = [
        { id: 'perfil', label: 'Mi Perfil' },
        { id: 'cambiar-password', label: 'Cambiar Password' }
    ];

    const { auth, actualizarPerfil, guardarPassword } = useAuth()

    return (
        <div className="w-full">
            <div className="bg-slate-900 rounded-lg p-1">
                <div className="border-b border-slate-700">
                    <nav className="flex gap-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 px-1 text-base font-medium transition-colors relative ${activeTab === tab.id
                                    ? 'text-blue-500'
                                    : 'text-slate-400 hover:text-slate-300'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-6 text-slate-300">
                    {activeTab === 'perfil' && <FormularioEditarPerfil auth={auth} actualizarPerfil={actualizarPerfil} />}
                    {activeTab === 'cambiar-password' && <FormularioCambiarPassword guardarPassword={guardarPassword} />}
                </div>
            </div>
        </div>
    )
}
