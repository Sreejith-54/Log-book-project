import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';

export default function MainLayout() {
  const user = localStorage.getItem("user");
  return (
    <div className="app-container">
      <main className="content" style={{minWidth:'100vw'}}>
        {user !== 'cr' && 
          <Navbar links={[
          { name: 'Dashboard', link: '/Faculty' },
          { name: 'Attendance List', link: '/Faculty/attendance' },
        ]} />
        }
        {user === 'cr' && <Navbar/>}
        <Outlet />
      </main>
    </div>
  );
}