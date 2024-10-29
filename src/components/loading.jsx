import { useEffect } from 'react';
import ProgressBar from '@badrap/bar-of-progress';
import Dashboard from '@/pages/dashboard';

const progress = new ProgressBar({
  size: 3,
  color: '#0165fc',
  className: 'z-50',
  delay: 100,
});

function Loading() {
  useEffect(() => {
    progress.start();
    const timer = setTimeout(() => {
      progress.finish();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <Dashboard />;
}

export default Loading;
