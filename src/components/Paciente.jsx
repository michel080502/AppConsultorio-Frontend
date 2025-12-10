import { Pencil, Dog, Trash } from 'lucide-react';
import usePacientes from "../../hooks/usePacientes";
export const Paciente = ({ paciente, onEliminar }) => {
    const { setEdicion} = usePacientes()
    const fechaFormateada = new Date(paciente.fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    return (
        <div
            className="bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow px-6 py-5 border border-gray-100 overflow-auto"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                    <Dog className="text-blue-600" size={24} />
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-gray-800">{paciente.nombre}</h3>
                    <p className="text-sm text-gray-500">Propietario: {paciente.propietario}</p>
                </div>
            </div>

            <div className="space-y-2 text-sm px-2">
                <div className="flex items-center gap-1">
                    <span className="text-gray-500 font-medium">Fecha Registro:</span>
                    <span className="text-gray-700">{fechaFormateada}</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-gray-500 font-medium">Email:</span>
                    <span className="text-gray-700">{paciente.email}</span>
                </div>
                <div>

                </div>
                <div className="mt-3 pt-3 border-t border-gray-300">
                    <span className="text-gray-500 font-medium">Sintomas:</span>
                    <p className="text-gray-700 mt-1 max-h-15 overflow-y-auto">{paciente.sintomas}</p>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button
                    className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                    title="Editar Paciente"
                    onClick={() => { 
                        setEdicion(paciente);
                    }}
                >
                    <Pencil size={20} />
                </button>

                <button
                    title="Eliminar Paciente"
                    className="px-4 py-1.5 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                    onClick={() => { 
                        onEliminar(paciente._id);
                    }}
                >
                    <Trash size={20} />
                </button>
            </div>
        </div>
    )
}
