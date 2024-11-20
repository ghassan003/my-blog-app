import { Outlet } from 'react-router-dom';
import LeftSidebar from './SideNav';
import './Layout.css'; // Assuming you're using a CSS file for styling

const Layout = () => {
  return (
    <div className="layout-container">
      <LeftSidebar className="sidebar" />
      <div className="main-content">
        <Outlet />
         {/* This is where the routed components like BlogPostForm will be rendered */}
      </div>
    </div>
  );
};

export default Layout;
