import { Toaster } from '@/components/ui/toaster';

import { useMainContext } from '@/context/main-context';
import Dashboard from '@/pages/dashboard';
import Login from '@/pages/login';
import Loading from '@/components/loading';

function App() {
  const { user, loading } = useMainContext();

  // if (loading) {
  //   return <Loading />;
  // }

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
