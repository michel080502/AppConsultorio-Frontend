import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { Header } from "../components/Header"
import { Loader } from 'lucide-react';
export const AdminLayout = () => {
  const { auth, cargando } = useAuth();
  console.log(auth)
  //Ponemos el estado de cargando en lo que el hook comprueba si hay usuario autenticado
  if (cargando) return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col justify-center items-center gap-4">
      <Loader className="text-blue-600"
        size={60}
        style={{
          animation: 'spin 2s linear infinite'
        }} />
      <p className="text-xl text-slate-600 dark:text-white">Cargando...</p>
    </div>
  )
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Si no hay usuario autenticado se redirecciona al Login */}
      {auth?._id ?
        <>
          <Header />
          <main className="container mx-auto mt-6 md:mt-10 px-4 md:px-6 lg:px-8">
            <Outlet />
          </main>
        </>
        : <Navigate to="/" />}

    </div>
  )
}
