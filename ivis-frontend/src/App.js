import './App.css';
import Navbar from './components/Navbar'; 
import Register from './pages/Register';
import Login from './pages/Login'
import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/dashboard';


function App() {
  return (
    <div className="App">
       <Navbar/>
          <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
    </div>
  );
}

export default App;
