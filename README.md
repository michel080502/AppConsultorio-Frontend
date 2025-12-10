# Frontend de App Consultorio Veterinario

Este es el frontend del sistema **Administrador de Pacientes (APV)**.  
Construido con **React**, **Vite**, **React Router DOM**, **TailwindCSS**, y comunicación con el backend mediante **Axios**.

---

## Scripts disponibles

En el directorio del proyecto puedes ejecutar:

### `npm run dev`
Inicia la aplicación en modo desarrollo.  
Normalmente en: `http://localhost:5173`

### `npm run build`
Construye la versión de producción en la carpeta `dist/`.

### `npm run preview`
Sirve la versión construida para verificar el build final.

### `npm run lint`
Ejecuta ESLint para revisar errores de código.

---

## Dependencias principales

- **react** — Librería principal de UI  
- **react-router-dom** — Ruteo  
- **axios** — Llamadas HTTP  
- **tailwindcss** — Estilos  
- **@headlessui/react** y **@heroicons/react** — Componentes accesibles e íconos  
- **lucide-react** — Iconos adicionales

---

## TailwindCSS
El proyecto utiliza **TailwindCSS v4** con:

- Configuración integrada por Vite (`@tailwindcss/vite`)
- Componentes UI con **@tailwindplus/elements**

---

## Estructura del proyecto

```
/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── paginas/
│   ├── config/
│   ├── index.css
│   ├── App.jsx
│   └── main.jsx
├── context/
├── hooks/
├── public/
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## Conexión con el Backend

Este frontend se comunica con el backend mediante Axios.  
Normalmente se usa una variable de entorno:

```
VITE_BACKEND_URL=http://localhost:4000
```

## Instalación

```sh
npm install
npm run dev
```

---