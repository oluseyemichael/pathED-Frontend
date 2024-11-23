import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowRight,
  ArrowLeft,
  LayoutDashboard, 
  Compass, 
  FolderKanban, 
  ClipboardList,
  Trophy,
  Users,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const NavItem = ({ to, icon: Icon, children, isActive }) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group
      ${isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-300 hover:bg-blue-500/10 hover:text-white'
      }`}
  >
    <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
    {children}
  </Link>
);

const NavSection = ({ title, children }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between px-4 py-2">
      <h2 className="text-xs font-semibold tracking-wider text-gray-400 uppercase">{title}</h2>
      <ChevronDown className="w-4 h-4 text-gray-400" />
    </div>
    {children}
  </div>
);

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-2 left-2 z-50 p-2 text-gray-900 hover:text-blue-500 transition-colors"
        aria-label="Toggle Menu"
      >
        {isOpen ? <IoIosArrowBack size={24} className='text-white' /> : <IoIosArrowForward size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-40 top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 transition-transform duration-200 ease-in-out transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 flex flex-col`}
      >
        {/* Logo Area */}
        <div className="flex items-center h-16 px-6 border-b border-gray-800">
          <div className="w-full h-8">
            <img src="src/assets/logo.svg" alt="PathED" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-6 py-4 overflow-y-auto">
          <NavSection title="Main Menu">
            <NavItem to="/dashboard" icon={LayoutDashboard} isActive={isActivePath('/dashboard')}>
              Dashboard
            </NavItem>
            <NavItem to="/dashboard" icon={Compass} isActive={isActivePath('/browse')}>
              Browse
            </NavItem>
            <NavItem to="/dashboard" icon={FolderKanban} isActive={isActivePath('/projects')}>
              Projects
            </NavItem>
            <NavItem to="/dashboard" icon={ClipboardList} isActive={isActivePath('/assessments')}>
              Assessments
            </NavItem>
          </NavSection>

          <NavSection title="Community">
            <NavItem to="/dashboard" icon={Trophy} isActive={isActivePath('/showcase')}>
              Showcase
            </NavItem>
            <NavItem to="/dashboard" icon={Users} isActive={isActivePath('/community')}>
              Community
            </NavItem>
          </NavSection>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/login';
            }}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-300 
              hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden transition-opacity"
        />
      )}
    </div>
  );
};

export default Sidebar;