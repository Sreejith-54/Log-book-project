import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';

export default function MainLayout() {
  return (
    <div className="app-container">
      <main className="content" style={{minWidth:'100vw'}}>
        <Navbar links={[
          { name: 'Dashboard', link: '/Faculty' },
          { name: 'Attendance List', link: '/Faculty/attendance' },
        ]} />
        <Outlet />
      </main>
    </div>
  );
}