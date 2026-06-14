import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Network, Mail, Lock, Eye, EyeOff, ArrowRight, User, CheckCircle } from 'lucide-react';
import { cn } from '../utils/cn';

type UserRole = 'candidate' | 'employer' | 'university';
const roles = [{ id: 'candidate' as UserRole, title: 'Job Seeker', description: 'Find opportunities' }, { id: 'employer' as UserRole, title: 'Employer', description: 'Find talent' }, { id: 'university' as UserRole, title: 'University', description: 'Track outcomes' }];

export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>((searchParams.get('role') as UserRole) || 'candidate');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      const { error } = await signUp(email, password, name, role);
      if (error) setError(error.message);
      else navigate('/dashboard');
    } catch { setError('An error occurred'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-accent-600 via-primary-700 to-primary-800 items-center justify-center p-8">
        <div className="max-w-md text-center text-white">
          <div className="w-24 h-24 mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"><Network className="w-12 h-12" /></div>
          <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
          <p className="text-primary-100 text-lg mb-8">Join thousands of professionals navigating their careers with AI.</p>
          <div className="flex items-center justify-center space-x-8 text-sm text-primary-100">
            <div className="flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-accent-400" />Free to start</div>
            <div className="flex items-center"><CheckCircle className="w-5 h-5 mr-2 text-accent-400" />No credit card</div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-secondary-950 overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center"><Network className="w-6 h-6 text-white" /></div>
            <span className="text-xl font-bold text-secondary-900 dark:text-white">CareerOS</span>
          </Link>
          <h1 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">Create your account</h1>
          <p className="text-secondary-600 dark:text-secondary-400 mb-8">Join CareerOS today</p>
          {error && <div className="mb-6 p-4 bg-error-50 dark:bg-error-950/50 border border-error-200 dark:border-error-800 rounded-lg text-error-600 dark:text-error-400 text-sm">{error}</div>}
          <div className="mb-6">
            <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-3">I am a...</label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((r) => (
                <button key={r.id} type="button" onClick={() => setRole(r.id)} className={cn('p-4 rounded-xl border-2 text-center transition-all', role === r.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/50' : 'border-secondary-200 dark:border-secondary-700 hover:border-secondary-300 dark:hover:border-secondary-600')}>
                  <div className={cn('font-medium text-sm mb-1', role === r.id ? 'text-primary-700 dark:text-primary-400' : 'text-secondary-900 dark:text-white')}>{r.title}</div>
                  <div className="text-xs text-secondary-500">{r.description}</div>
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="John Doe" required />
              </div>
            </div>
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
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="Create a password" required minLength={6} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white dark:bg-secondary-900 border border-secondary-300 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="Confirm your password" required />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-50 flex items-center justify-center">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Create Account</span><ArrowRight className="w-5 h-5 ml-2" /></>}
            </button>
          </form>
          <p className="mt-8 text-center text-secondary-600 dark:text-secondary-400">Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
