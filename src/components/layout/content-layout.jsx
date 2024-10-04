import { Navbar } from '@/components/layout/navbar';

export function ContentLayout({ title, children }) {
  return (
    <div className="bg-indigo-200">
      <Navbar title={title} />
      <div className="px-4 lg:px- pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
