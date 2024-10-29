import { useMainContext } from '@/context/main-context';
import ProgressBar from '@badrap/bar-of-progress';

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
  return null;
}

export default Loading;
