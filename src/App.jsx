import { Toaster } from '@/components/ui/toaster';

import { useMainContext } from '@/context/main-context';
import Dashboard from '@/pages/dashboard';
import Login from '@/pages/login';

function App() {
  const { user } = useMainContext();

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Toaster />
      <Dashboard />
    </>
  );
}

export default App;
