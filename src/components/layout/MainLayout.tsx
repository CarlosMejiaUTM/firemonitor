import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="flex bg-gray-50 min-h-screen relative">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 pt-6 pr-6 pb-20 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
