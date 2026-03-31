import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./pages/Homepage'));
const EquipmentList = lazy(() => import('./pages/EquipmentList'));
const MaintenancePlan = lazy(() => import('./pages/MaintenancePlan'));
const Report = lazy(() => import('./pages/Reports'));
const BreakdownHistory = lazy(() => import('./pages/BreakdownHis'));
const SpareParts = lazy(() => import('./pages/SparePart'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const Support = lazy(() => import('./pages/Support'));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 text-gray-700 dark:text-zinc-200">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Equipments-List" element={<EquipmentList />} />
          <Route path="/Maintenance-Plan" element={<MaintenancePlan />} />
          <Route path="/Reports" element={<Report />} />
          <Route path="/Breakdown-History" element={<BreakdownHistory />} />
          <Route path="/Spare-Parts" element={<SpareParts />} />
          <Route path="/User-Management" element={<UserManagement />} />
          <Route path="/Support" element={<Support />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;