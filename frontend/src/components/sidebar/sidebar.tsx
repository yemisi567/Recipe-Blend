import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../utils/routes";
import LogoImage from "../../components/icons/logo.png";

interface SideBarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SideBarProps) => {
  const linkClass = ({ isActive }: { isActive: boolean }) => `
    block px-7 rounded-r8 py-[15px] mx-24 rounded transition-colors duration-200 relative
    ${
      isActive ? "text-white bg-primary" : "text-app-text hover:text-app-text"
    }
    before:transition-opacity before:duration-200 hover:before:opacity-100 hover:bg-primary hover:bg-opacity-20 hover:text-gray
  `;

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  return (
    <div>
      <aside
        className={`absolute lg:fixed top-0 left-0 h-dvh bg-white transition-transform transform lg:translate-x-0 border-r border-r-strokedark shadow-[0 1px 5px #00000008] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:w-[240px] z-50 flex flex-col justify-between pb-8`}
      >
        <div className="mb-48 pt-6 pl-6">
          <img src={LogoImage} alt="" width={100} height={100} />
        </div>
        <ul className="flex-grow">
          {routes.map(({ path, Icon, title }) => (
            <li key={path} className="pb-8">
              <NavLink to={path} onClick={toggleSidebar} className={linkClass}>
                {({ isActive }) => (
                  <div className="flex gap-[12px] items-center relative z-10 ">
                    <Icon fill={isActive ? "#FFFFFF" : "#202224"} />
                    <p className="text-sm font-[450]">{title}</p>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      {/* Overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
