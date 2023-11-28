
export const Swich = ({ name = '', value = false, setValue = (_value: boolean) => { } }) => {
    return (
        <div className="flex justify-between pb-5">
            <h1 className="m-2 text-xl sm:text-2xl font-bold">{name}</h1>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="Swich"
                    checked={value}
                    onChange={() => setValue(!value)}
                    className="hidden"
                />
                <label htmlFor="Swich" className="flex items-center cursor-pointer">
                    <div className={`w-14 h-8 ${value ? 'bg-green-500' : 'bg-gray-400'} rounded-full p-1 duration-300 ease-in-out`}>
                        <div className={`w-6 h-6 ${value ? 'bg-white' : 'bg-gray-300'} rounded-full shadow-md transform ${value ? 'translate-x-full' : 'translate-x-0'} transition-transform duration-300 ease-in-out`}></div>
                    </div>
                </label>
            </div>
        </div>
    )
}
