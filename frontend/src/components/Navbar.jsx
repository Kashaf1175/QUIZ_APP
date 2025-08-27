import React, { useState } from 'react';
import { BookOpen, PlusCircle, List, Settings, LogOut, Menu, X, User, ChevronDown } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = user?.role === 'admin'
    ? [
        { path: '/dashboard', label: 'Dashboard', icon: BookOpen },
        { path: '/create-quiz', label: 'Create Quiz', icon: PlusCircle },
        { path: '/my-quizzes', label: 'My Quizzes', icon: List },
        { path: '/profile', label: 'Profile', icon: Settings },
      ]
    : [
        { path: '/dashboard', label: 'Dashboard', icon: BookOpen },
        { path: '/quizzes', label: 'All Quizzes', icon: List },
        { path: '/profile', label: 'Profile', icon: Settings },
      ];

  const handleNavigate = (path) => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setUserDropdownOpen(false);
    logout();
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-xl fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div 
              className="flex items-center cursor-pointer group transition-all duration-200 hover:scale-105" 
              onClick={() => handleNavigate('/dashboard')}
            >
              <div className="bg-opacity-20 rounded-full p-2 mr-3 group-hover:bg-opacity-30 transition-all duration-200">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  QuizPlatform
                </h1>
                <div className="text-xs text-blue-200 -mt-1">Learn • Create • Excel</div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className="flex items-center px-4 py-2 rounded-xl hover:bg-transparent hover:bg-opacity-20 transition-all duration-200 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                    <Icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium relative z-10">{item.label}</span>
                  </button>
                );
              })}
              
              {/* User Dropdown */}
              <div className="relative ml-6">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-xl transition-all duration-200 group"
                >
                  <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-1.5">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex flex-col items-start text-black">
                    <span className="font-medium text-sm">{user?.name}</span>
                    <span className="text-xs text-blue-200 capitalize">{user?.role}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 border-b border-gray-100">
                      <div className="font-medium text-gray-800">{user?.name}</div>
                      <div className="text-sm text-gray-600">{user?.email}</div>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => handleNavigate('/profile')}
                        className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Profile Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-transparent hover:bg-opacity-10 transition-all duration-200"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-500 border-opacity-30 bg-gradient-to-b from-transparent to-black to-opacity-10">
              {/* User Info */}
              <div className="flex items-center gap-3 px-3 py-3 mb-3 bg-white bg-opacity-10 rounded-xl mx-2">
                <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-2">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-sm text-blue-200 capitalize">{user?.role}</div>
                </div>
              </div>
              
              {/* Menu Items */}
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-transparent hover:bg-opacity-10 transition-all duration-200 mx-2 mb-1"
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              
              <div className="border-t border-blue-500 border-opacity-30 mt-3 pt-3 mx-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-red-500 hover:bg-opacity-20 transition-all duration-200 text-red-200"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Overlay for dropdown */}
      {userDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setUserDropdownOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;