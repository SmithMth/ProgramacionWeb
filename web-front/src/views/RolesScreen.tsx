import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RolesScreen = () => {
    const [userRoles, setUserRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const roles = await getRoles();
                setUserRoles(roles);
                if (roles.length > 0) {
                    setSelectedRole(roles[0]);
                }
            } catch (error) {
                console.error('Error al obtener roles:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleRoleSelection = () => {
        // Puedes realizar cualquier lógica adicional aquí antes de navegar a la pantalla de inicio de sesión
        navigate('/login');
    };

    return (
        <div className="p-6 sm:p-10 bg-white rounded-lg shadow-xl">
            <h2 className="text-center text-xl sm:text-2xl mb-4 sm:mb-6">Seleccionar Rol</h2>

            <label htmlFor="role" className="text-sm font-medium text-gray-600 mb-2">
                Seleccionar Rol
            </label>
            <select
                id="role"
                name="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full p-2 mb-3 border border-gray-300 rounded"
            >
                {userRoles.map((role) => (
                    <option key={role} value={role}>
                        {role}
                    </option>
                ))}
            </select>

            <button
                onClick={handleRoleSelection}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-full"
            >
                Continuar
            </button>
        </div>
    );
};

export default RolesScreen;
