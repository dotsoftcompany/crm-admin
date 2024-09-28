import { ThemeProvider } from '@/provider/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';

import './App.css';
import DashboardLayout from './components/dashboard/layout';

function App() {
  return (
    <>
      <DashboardLayout />
    </>
  );
}

export default App;
