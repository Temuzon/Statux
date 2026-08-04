import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Routine from './pages/Routine/Routine';
import Anatomy from './pages/Anatomy/Anatomy';
import Progress from './pages/Progress/Progress';
import Tools from './pages/Tools/Tools';
import Tracker from './pages/Tracker/Tracker';
import Settings from './pages/Settings/Settings';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/routine" element={<Routine />} />
      <Route path="/anatomy" element={<Anatomy />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/tools" element={<Tools />} />
      <Route path="/tracker" element={<Tracker />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
