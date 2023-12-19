import { Link } from 'react-router-dom';

function HomeTeacher() {
  return (
    <div className="p-10 flex flex-col items-center h-screen bg-gray-100 rounded-lg w-10/12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">PLATAFORMA UMSS - Profesor</h1>
        <p className="text-lg text-gray-600">Explora y disfruta de todas las funcionalidades.</p>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 max-w-full">
        <Link to="/reservas" className="flex-1 bg-purple-500 text-white px-6 py-3 rounded-full flex items-center text-center justify-center">Reservas</Link>
        <Link to="/misReservas" className="flex-1 bg-yellow-500 text-white px-6 py-3 rounded-full flex items-center text-center justify-center">Mis Reservas</Link>
      </div>
    </div>
  );
}

export default HomeTeacher;
