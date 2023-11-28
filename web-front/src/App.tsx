import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './views/LoginForm';
import RegisterEnvironment from './views/RegisterEnvironment';
import ViewEnvironment from './views/ViewEnvironment';
import EditEnvironment from './views/EditEnvironment';
import Home from './views/Home';
import ReservarEnvironment from './views/ReservarEnvironment';
import Reserva from './views/Reserva';

function App() {

  return (
<div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-300 p-10 ">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/reservas" element={<ReservarEnvironment />} />
          <Route path="/register" element={<RegisterEnvironment />} />
          <Route path="/viewEnvironment" element={<ViewEnvironment />} />
          <Route path="/editEnvironment/:data" element={<EditEnvironment />} />
          <Route path="/reservarEnvironment/:data" element={<Reserva/>} />

          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
