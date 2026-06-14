import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';
import { Sun, Moon, Menu, X, LogOut, User, LayoutDashboard, Briefcase, Network, MessageSquare, DollarSign, Users, GraduationCap } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { user, signOut } = useAuth();
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isLandingPage = location.pathname === '/';

  const handleSignOut = async () => { await signOut(); navigate('/'); };
  const navLinks = !user ? [] : user.role === 'candidate' ? [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/career-paths', label: 'Career Paths', icon: Network },
    { path: '/ai-coach', label: 'AI Coach', icon: MessageSquare },
    { path: '/salary', label: 'Salary', icon: DollarSign },
  ] : user.role === 'employer' ? [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/candidates', label: 'Candidates', icon: Users },
  ] : [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/graduates', label: 'Graduates', icon: GraduationCap },
  ];

  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', isLandingPage ? 'bg-transparent' : 'bg-white/80 dark:bg-secondary-900/80 backdrop-blur-xl border-b border-secondary-200 dark:border-secondary-800')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Network className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-secondary-900 dark:text-white">CareerOS</span>
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/jobs" className={cn('text-sm font-medium transition-colors', isLandingPage ? 'text-white/80 hover:text-white' : 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400')}>Browse Jobs</Link>
                <Link to="/login" className={cn('text-sm font-medium transition-colors', isLandingPage ? 'text-white/80 hover:text-white' : 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400')}>Sign In</Link>
                <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all">Get Started</Link>
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} className={cn('flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors', location.pathname === link.path ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400' : 'text-secondary-600 hover:text-secondary-900 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800')}>
                    <link.icon className="w-4 h-4" /><span>{link.label}</span>
                  </Link>
                ))}
              </>
            )}
            <button onClick={toggle} className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors">
              {isDark ? <Sun className={cn('w-5 h-5', isLandingPage ? 'text-white' : 'text-secondary-400')} /> : <Moon className="w-5 h-5 text-secondary-600" />}
            </button>
            {user && (
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-sm font-medium">{user.name.charAt(0).toUpperCase()}</div>
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-secondary-900 rounded-xl shadow-xl border border-secondary-200 dark:border-secondary-800 overflow-hidden animate-scale-in">
                    <div className="p-4 border-b border-secondary-200 dark:border-secondary-800">
                      <p className="font-medium text-secondary-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-secondary-500">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <button onClick={handleSignOut} className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-error-600 hover:bg-error-50 dark:hover:bg-error-950/50 rounded-lg transition-colors">
                        <LogOut className="w-4 h-4" /><span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <button className="md:hidden p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6 text-secondary-600 dark:text-white" /> : <Menu className="w-6 h-6 text-secondary-600 dark:text-white" />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-slide-down">
            <div className="flex flex-col space-y-2">
              {!user ? (
                <>
                  <Link to="/jobs" className="px-4 py-2 text-sm font-medium text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Browse Jobs</Link>
                  <Link to="/login" className="px-4 py-2 text-sm font-medium text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                  <Link to="/register" className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                </>
              ) : (
                <>
                  {navLinks.map((link) => (
                    <Link key={link.path} to={link.path} className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-secondary-600 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      <link.icon className="w-4 h-4" /><span>{link.label}</span>
                    </Link>
                  ))}
                  <button onClick={handleSignOut} className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-error-600 hover:bg-error-50 dark:hover:bg-error-950/50 rounded-lg">
                    <LogOut className="w-4 h-4" /><span>Sign Out</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
