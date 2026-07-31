import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      id: 'invoice',
      label: 'Invoices',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      children: [
        { path: '/create_invoice', label: 'Create'},
        { path: '/read_invoice', label: 'View All'},
      ],
    },
 ];

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const isParentActive = (item) => {
    if (item.children) {
      return item.children.some(child => location.pathname === child.path);
    }
    return location.pathname === item.path;
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Sidebar Content Component (reused for both desktop and mobile)
  const SidebarContent = () => (
    <>
      {/* Logo Section - Compact */}
      <div className="p-4 border-b border-gray-300">
        <div className="flex items-center justify-center flex-col gap-3">
          <img 
            src="logo.png" 
            // alt="Logo" 
            className="w-[60%] h-50% object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<span class="text-lg font-bold text-gray-800">SM</span>';
            }}
          />
          <div className="min-w-0">
            <h1 className="text-xs font-semibold text-gray-700 truncate">
              BISNI INVOICES
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation Links - Compact */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {menuItems.map((item) => (
          <div key={item.id}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 group ${
                    isParentActive(item)
                      ? 'bg-blue-200 text-blue-700 border-l-3 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`transition-colors duration-200 ${
                      isParentActive(item) ? 'text-blue-700' : 'text-gray-600 group-hover:text-gray-900'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="text-[14px] font-medium">{item.label}</span>
                  </div>
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${
                      openDropdown === item.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu - Compact with smaller font for children */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openDropdown === item.id ? 'max-h-80 opacity-100 mt-0.5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="ml-6 space-y-0.5 border-l-2 border-gray-400 pl-3">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-2.5 py-1.5 rounded text-[10px] transition-all duration-200 ${
                            isActive
                              ? 'bg-blue-200 text-blue-700 font-medium'
                              : 'text-gray-600 hover:bg-gray-300 hover:text-gray-900'
                          }`
                        }
                      >
                        <span className='text-[12px]'>{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <NavLink
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-200 text-blue-700 border-l-3 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-300 hover:text-gray-900'
                  }`
                }
              >
                <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                  {item.icon}
                </span>
                <span className="text-[15px] font-medium">{item.label}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* Footer - Compact */}
      <div className="p-2.5 border-t border-gray-300">
        <div className="flex items-center gap-2 px-2 py-1 text-[10px] text-gray-600">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span>Website Developed By Muhammad Muzammil</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors duration-200"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar - Visible on large screens */}
      <div className="hidden lg:flex w-[20%] min-w-60 max-w-70 h-screen bg-gray-200 text-gray-800 flex-col shadow-2xl">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar - Slides in from left */}
      <div
        className={`lg:hidden fixed top-0 left-0 z-40 w-70 h-screen bg-gray-200 text-gray-800 flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default Navigation;
