import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Network, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) setError(error.message);
      else navigate('/dashboard');
    } catch { setError('An error occurred'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-secondary-950">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center"><Network className="w-6 h-6 text-white" /></div>
            <span className="text-xl font-bold text-secondary-900 dark:text-white">CareerOS</span>
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Welcome back</h1>
          <p className="text-secondary-600 dark:text-secondary-400 mb-8">Sign in to continue your career journey</p>
          {error && <div className="mb-6 p-4 bg-error-50 dark:bg-error-950/50 border border-error-200 dark:border-error-800 rounded-lg text-error-600 dark:text-error-400 text-sm">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="Enter your password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-50 flex items-center justify-center">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Sign In</span><ArrowRight className="w-5 h-5 ml-2" /></>}
            </button>
          </form>
          <p className="mt-8 text-center text-secondary-600 dark:text-secondary-400">Don't have an account? <Link to="/register" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">Create one</Link></p>
        </div>
      </div>
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 items-center justify-center p-8">
        <div className="max-w-md text-center text-white">
          <div className="w-32 h-32 mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center"><Network className="w-16 h-16" /></div>
          <h2 className="text-3xl font-bold mb-4">Navigate Your Career</h2>
          <p className="text-primary-100 text-lg">CareerOS helps you visualize career paths and make data-driven decisions about your future.</p>
        </div>
      </div>
    </div>
  );
}
