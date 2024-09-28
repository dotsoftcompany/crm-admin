import { ThemeProvider } from '@/provider/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';

import './App.css';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Tailwind css working!
        </h1>
        <div className="flex gap-2 mt-2">
          <Button>Button</Button>
          <Input placeholder="Search" />
          <ThemeToggle />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
