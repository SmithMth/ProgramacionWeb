import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleData } from '../interfaces/Role.interface';

const RolesScreen = () => {
    const [userRoles, setUserRoles] = useState<RoleData[]>([]);
    const [selectedRole, setSelectedRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoles = () => {
            try {
                // Obtén los roles del localStorage
                const storedRoles = localStorage.getItem('roles');
                
                if (storedRoles !== null) {
                    // Si storedRoles no es nulo, conviértelo a un array y establece el estado
                    const parsedRoles = JSON.parse(storedRoles);
                    setUserRoles(parsedRoles);

                    if (parsedRoles.length > 0) {
                        setSelectedRole(parsedRoles[0].name);
                    }
                }
            } catch (error) {
                console.error('Error al obtener roles:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleRoleSelection = () => {
        // Realiza la navegación según el rol seleccionado
        switch (selectedRole) {
            case 'Admin':
                navigate('/home');
                break;
            case 'Teacher':
                navigate('/homeTeacher');
                break;
            case 'Student':
                navigate('/homeStudent');
                break;
            default:
                // Puedes manejar un caso predeterminado o lanzar un error si es necesario
                break;
        }
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
                    <option key={role.id} value={role.name}>
                        {role.name}
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
