const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error 
      ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-white' 
      : 'bg-green-200 text-green-800 dark:bg-green-400 dark:text-white'}  px-4 py-2 rounded-md mb-4 text-center font-semibold`}>
        {alerta.mensaje}
    </div>
  )
}

export default Alerta