import Dashboard from '@/pages/dashboard';
import Login from '@/pages/login';

function App() {
  const user = true;

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
