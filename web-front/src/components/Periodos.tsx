import { useEffect, useState } from 'react'
import { PeriodData, PeriodDefault } from '../interfaces/Period.interface'
import { obtenerPeriodos } from '../api/reservas'

export const Periodos = ({ periodo = PeriodDefault, setPeriodo = (_value: PeriodData) => { } }) => {
    const [periodos, setPeriodos] = useState<PeriodData[]>([])

    const fetchPeriodos = async () => {
        try {
            const values = await obtenerPeriodos()
            console.log(values)
            setPeriodos(values)
        } catch (error) {
            console.error('Error al recuperar los periodos.')
        }
    }

    useEffect(() => {
        fetchPeriodos();
    }, []);

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-around space-y-4 sm:space-y-0 sm:space-x-4">
            <label htmlFor="periodos" className="block font-bold mb-2">Periodo</label>
            <div>
                <h1 className="mb-2 text-sm sm:text-base">Inicio</h1>
                <select
                    name="periodos"
                    id="periodos"
                    value={periodo.startTimeString}
                    onChange={(e) => {
                        const startTimeString = periodos.find(p => p.startTimeString == e.target.value)
                        console.log(startTimeString?.startTimeString)
                        setPeriodo({ ...periodo, startTimeString: startTimeString?.startTimeString || PeriodDefault.startTimeString })
                    }}
                    className="block w-full p-2 border border-blue-500 rounded mb-4"
                >
                    <option value="">00:00</option>
                    {periodos.map((p) => (
                        <option key={p.id} value={p.startTimeString}>
                            {p.startTimeString}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h1 className="mb-2 text-sm sm:text-base">Fin</h1>
                <select
                    name="periodos"
                    id="periodos"
                    value={periodo.endTimeString}
                    onChange={(e) => {
                        const endTimeString = periodos.find(p => p.endTimeString == e.target.value)

                        setPeriodo({ ...periodo, endTimeString: endTimeString?.endTimeString || PeriodDefault.endTimeString })
                    }}
                    className="block w-full p-2 border border-blue-500 rounded mb-4"
                >
                    <option value="">00:00</option>
                    {periodos.map((p) => (
                        <option key={p.id} value={p.endTimeString}>
                            {p.endTimeString}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
