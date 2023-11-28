export const Habilitado = ({value=false, setValue=(_value: boolean)=>{}}) => {
  return (
    <div className="sm:w-1/2">
    <label htmlFor="activo" className="block font-bold mb-2 text-sm sm:text-base">Habilitado:</label>
    <div className="flex items-center justify-center">
        <input
            type="checkbox"
            id="activo"
            name="activo"
            checked={value}
            onChange={() => setValue(!value)} className="form-checkbox h-5 w-5 text-blue-600" // Ajuste de color y tamaño
        />
    </div>
</div>
  )
}
