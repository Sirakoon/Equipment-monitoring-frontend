import { useState, lazy } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './App.css'



const Home = lazy(() => import('./Components/Homepage'))
const Equipment = lazy(() => import('./Components/EquipmentList'))

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Equipments-List" element={<Equipment />} />
      </Routes>
    </Router>

  );
}

export default App
