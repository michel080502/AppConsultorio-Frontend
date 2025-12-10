import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthLayout } from "./layout/AuthLayout.jsx"
import Login from "./paginas/Login.jsx"
import ConfirmarCuenta from "./paginas/ConfirmarCuenta.jsx"
import OlvidePassword from "./paginas/OlvidePassword.jsx"
import Registrar from "./paginas/Registrar.jsx"
import { NuevoPassword } from "./paginas/NuevoPassword.jsx"
import { AuthProvider } from "../context/AuthProvider.jsx"
import { PacientesProvider } from "../context/PacientesProvider.jsx"
import { AdminLayout } from "./layout/AdminLayout.jsx"
import { AdministrarPacientes } from "./paginas/AdministrarPacientes.jsx"
import { EditarPerfil } from "./paginas/EditarPerfil.jsx"
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            {/* Vista sin autenticar */}
            {/* AuthLayout es el padre de todas las vistas  */}
            <Route path="/" element={<AuthLayout />}>
              {/* Login es la pagina principal que se muestra por defecto  */}
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />'
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            {/* Vistas Protegidas para autenticados*/}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
