import Dashboard from '@/pages/dashboard';
import Login from '@/pages/login';

function App() {
  const user = false;

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
