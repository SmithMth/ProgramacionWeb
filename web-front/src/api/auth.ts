// auth.ts

/**
 * Función para iniciar sesión.
 * @param {string} email El email del usuario.
 * @param {string} password La contraseña del usuario.
 * @returns {Promise<any>} Una promesa con la respuesta del servidor.
 */
export async function login(email: string, password: string): Promise<any> {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud de inicio de sesión');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        throw error;
    }
}
