import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-950">
      <Navbar />
      <main><Outlet /></main>
      <Footer />
    </div>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950">
      <Navbar />
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
