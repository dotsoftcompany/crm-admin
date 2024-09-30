import Dashboard from '@/pages/dashboard';
import Login from '@/pages/login';
import { useMainContext } from './context/main-context';

function App() {
  const { user } = useMainContext();

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
