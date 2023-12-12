// auth.ts
import axios from 'axios';

// auth.ts
export async function login(email: string, password: string): Promise<any> {
    try {
        const url = 'http://localhost:3000/api/auth/login';
        console.log('URL de inicio de sesión:', url);

        const response = await axios.post(url, {
            email,
            password,
        });

        return response.data;
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        throw error;
    }
}
