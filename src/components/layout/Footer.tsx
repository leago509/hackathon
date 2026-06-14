import { Link } from 'react-router-dom';
import { Network, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                <Network className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">CareerOS</span>
            </Link>
            <p className="text-secondary-400 text-sm leading-relaxed mb-6">Navigate your career with AI-powered guidance.</p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-secondary-800 rounded-lg hover:bg-secondary-700 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-secondary-800 rounded-lg hover:bg-secondary-700 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-secondary-800 rounded-lg hover:bg-secondary-700 transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-secondary-800 rounded-lg hover:bg-secondary-700 transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link to="/career-paths" className="text-secondary-400 hover:text-white transition-colors text-sm">Career Navigator</Link></li>
              <li><Link to="/ai-coach" className="text-secondary-400 hover:text-white transition-colors text-sm">AI Career Coach</Link></li>
              <li><Link to="/jobs" className="text-secondary-400 hover:text-white transition-colors text-sm">Job Board</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Solutions</h4>
            <ul className="space-y-3">
              <li><Link to="/register?role=employer" className="text-secondary-400 hover:text-white transition-colors text-sm">For Employers</Link></li>
              <li><Link to="/register?role=university" className="text-secondary-400 hover:text-white transition-colors text-sm">For Universities</Link></li>
              <li><Link to="/register?role=candidate" className="text-secondary-400 hover:text-white transition-colors text-sm">For Candidates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-secondary-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/blog" className="text-secondary-400 hover:text-white transition-colors text-sm">Blog</Link></li>
              <li><Link to="/privacy" className="text-secondary-400 hover:text-white transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-secondary-800">
          <p className="text-secondary-500 text-sm text-center">© {new Date().getFullYear()} CareerOS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
