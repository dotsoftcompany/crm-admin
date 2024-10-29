import { useMainContext } from '@/context/main-context';
import Dashboard from '@/pages/dashboard';
import ProgressBar from '@badrap/bar-of-progress';
import { useEffect } from 'react';

const progress = new ProgressBar({
  size: 3,
  color: '#0165fc',
  className: 'z-50',
  delay: 100,
});

function Loading() {
  const { loading } = useMainContext();

  if (loading) {
    progress.start();

    setTimeout(() => {
      progress.finish();
    }, 2000);
  }

  return <Dashboard />;
}

export default Loading;
