export const Capacidad = ({ name = '', value = 0, setValue = (_value: number) => { } }) => {
    return (
        <>
            <h1 className="mb-2 text-sm sm:text-base">{name}</h1>
            <input
                type="number"
                id={name}
                name={name}
                min="1"
                required
                value={value}
                onChange={(e) => setValue((Number(e.target.value)))}
                className="w-full p-2 border border-blue-500 rounded text-sm"
            />
        </>
    )
}
