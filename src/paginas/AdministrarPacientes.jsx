import { useState } from "react"
import { FormularioModal } from "../components/FormularioModal"
import { Plus, Loader } from 'lucide-react';
import usePacientes from "../../hooks/usePacientes";
import { Paciente } from "../components/Paciente";
import { ConfirmaEliminar } from "../components/ConfirmaEliminar";
export const AdministrarPacientes = () => {
  const { pacientes, cargando } = usePacientes();
  const [openModal, setOpenModal] = useState(false);
  const [openModalEliminar, setOpenModalElimiar] = useState(false);
  //Usando metodo Lifting State Up
  const [idPaciente, setIdPaciente] = useState('');
  const handleEliminarClick = (id) => {
    setIdPaciente(id);
    setOpenModalElimiar(true);
  };
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Pacientes</h1>
            <p className="text-gray-200">Gestiona la información de tus pacientes</p>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus size={20} />
            Agregar Paciente
          </button>
        </div>
      </div>
      {cargando ? (
        <div className="flex justify-center items-center mt-20">
          <Loader className="animate-spin text-blue-600" size={60} />
        </div>
      ) : pacientes.length > 0 ?
        (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pb-5">
          {pacientes.map(paciente => (
            <Paciente key={paciente._id} paciente={paciente} onEliminar= {handleEliminarClick} />
          ))}
        </div>) : (
          <h2 className="text-center text-gray-300 font-medium mt-20 text-xl">No hay pacientes registrados</h2>
        )}

      <FormularioModal
        open={openModal}
        setOpen={setOpenModal} />

      <ConfirmaEliminar
        open={openModalEliminar}
        setOpen={setOpenModalElimiar}
        idPaciente={idPaciente}
        setIdPaciente={setIdPaciente}
      />
    </>
  )
}
