export const FieldText = ({ type='text',nombre = '', value = '', setValue = (_value: any) => {} }) => {
    return (
        <>
            <label htmlFor={nombre} className="block font-bold mb-2">{nombre}:</label>
            <input
                type={type}
                id={nombre}
                name={nombre}
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className= {type=='text'|| type=='number' ? "w-full p-2 border border-blue-500 rounded text-sm":"form-checkbox h-5 w-5 text-blue-600"}
                />
        </>
    );
};
