import { useEffect, useState } from 'react';
import logoBlack from '../assets/logoBlack.png'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/user/userSlice';
import type { RootState } from '../redux/store';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-amber-400 shadow-lg fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <img 
              src={logoBlack} 
              alt="Logo" 
              className="w-16 h-16 object-contain"
            />
            <span className="text-2xl font-bold text-gray-900 hidden sm:block">
              Robotix Club NITRR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-900 hover:text-gray-700 font-semibold transition-colors px-3 py-2 rounded-md"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-900 hover:text-gray-700 font-semibold transition-colors px-3 py-2 rounded-md"
            >
              About Us
            </Link>
            <Link 
              to="/post" 
              className="text-gray-900 hover:text-gray-700 font-semibold transition-colors px-3 py-2 rounded-md"
            >
              Blog
            </Link>
            
            {!token ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/log-in" 
                  className="text-gray-900 border-2 border-gray-900 px-4 py-2 rounded-lg 
                    hover:bg-gray-900 hover:text-amber-400 transition-all font-semibold"
                >
                  Login
                </Link>
                <Link 
                  to="/sign-up" 
                  className="bg-gray-900 text-amber-400 px-4 py-2 rounded-lg 
                    hover:bg-gray-800 transition-colors font-semibold shadow-md"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="bg-gray-900 text-amber-400 px-4 py-2 rounded-lg 
                    hover:bg-gray-800 transition-colors font-semibold shadow-md"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-900 border-2 border-gray-900 px-4 py-2 rounded-lg 
                    hover:bg-gray-900 hover:text-amber-400 transition-all font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-900 hover:bg-amber-500 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 bg-amber-300 rounded-b-lg shadow-lg"
            >
              <div className="flex flex-col space-y-3 px-4">
                <Link 
                  to="/" 
                  className="text-gray-900 hover:bg-amber-400 px-3 py-2 rounded-md font-semibold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-900 hover:bg-amber-400 px-3 py-2 rounded-md font-semibold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/post" 
                  className="text-gray-900 hover:bg-amber-400 px-3 py-2 rounded-md font-semibold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                
                {!token ? (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-amber-400">
                    <Link 
                      to="/log-in" 
                      className="text-gray-900 border-2 border-gray-900 px-4 py-2 rounded-lg 
                        hover:bg-gray-900 hover:text-amber-400 transition-all font-semibold text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/sign-up" 
                      className="bg-gray-900 text-amber-400 px-4 py-2 rounded-lg 
                        hover:bg-gray-800 transition-colors font-semibold text-center shadow-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 pt-2 border-t border-amber-400">
                    <Link 
                      to="/dashboard" 
                      className="bg-gray-900 text-amber-400 px-4 py-2 rounded-lg 
                        hover:bg-gray-800 transition-colors font-semibold text-center shadow-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-gray-900 border-2 border-gray-900 px-4 py-2 rounded-lg 
                        hover:bg-gray-900 hover:text-amber-400 transition-all font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;