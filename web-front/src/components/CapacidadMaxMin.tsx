import { Capacidad } from "./Capacidad"

export const CapacidadMaxMin = ({ value={ min: 0, max: 999 }, set = (_min: number, _max: number) => { } }) => {
    const setMax=(val: number)=>{
        set(value.min, val)
    }

    const setMin=(val: number)=>{
        set(val,value.max)
    }
    return (
        <div className="flex flex-col sm:flex-row justify-around space-y-4 sm:space-y-0 sm:space-x-4">
            <label htmlFor="capacidad" className="font-bold mb-2 text-sm sm:text-base">Capacidad:</label>
            <Capacidad name="Minimo" value={value.min} setValue={setMin}></Capacidad>
            <Capacidad name="Maximo" value={value.max} setValue={setMax}></Capacidad>
        </div>
    )
}
