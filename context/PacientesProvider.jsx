import { createContext, useState, useEffect } from "react";
import clienteAxios from "../src/config/axios";
import useAuth from "../hooks/useAuth";
const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
    const { auth } = useAuth();
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({})
    const [editando, setEditando] = useState(false)
    const [cargando, setCargando] = useState(false);
    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('apv_token');
                if (!token) {
                    // Limpiar pacientes cuando no hay token (sesión cerrada)
                    setPacientes([]);
                    setCargando(false);
                    return;
                }
                setCargando(true);
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.get('/pacientes', config);
                setPacientes(data)
            } catch (error) {
                console.log(error);
                setPacientes([]);
            } finally {
                setCargando(false);
            }
        }
        obtenerPacientes();
    }, [auth])
    const guardarPaciente = async (paciente) => {
        try {
            const token = localStorage.getItem('apv_token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/pacientes', paciente, config)

            // Excluir campos innecesarios antes de actualizar el estado 
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
            // Actualizar el estado con el nuevo paciente
            setPacientes([pacienteAlmacenado, ...pacientes]);
            return data;
        } catch (error) {
            console.log(error.response.data.msg);
            return error.response.data.msg;
        }
    }
    const actualizarPaciente = async (datos, id) => {
        try {
            const token = localStorage.getItem('apv_token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/pacientes/${id}`, datos, config)
            // Actualizar el estado con el paciente actualizado
            const pacientesActualizado = pacientes.map(pacienteState =>
                pacienteState._id === data._id ? data : pacienteState
            )
            setPacientes(pacientesActualizado);
            return data;
        } catch (error) {
            console.log(error.response.data.msg);
            return error.response.data.msg;
        }
    }

    const eliminarPaciente = async (id) => {
        try {
            const token = localStorage.getItem('apv_token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
            const pacientesActualizado = pacientes.filter((pacientesState)=> pacientesState._id != id );
            setPacientes(pacientesActualizado)
            return data;
        } catch (error) {
            console.log(error.response.data.msg);
            return error.response.data.msg;
        }
    }
    const setEdicion = (pacienteEditar) => {
        setPaciente(pacienteEditar)
        setEditando(true)
    }

    return (<PacientesContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            actualizarPaciente,
            cargando,
            setEdicion,
            paciente,
            setPaciente,
            editando,
            setEditando,
            eliminarPaciente,
        }}
    >
        {children}
    </PacientesContext.Provider>)
}

export default PacientesContext