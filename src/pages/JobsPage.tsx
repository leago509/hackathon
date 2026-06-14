import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { DashboardLayout } from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { Search, MapPin, Briefcase, DollarSign, Building2, Clock, Filter, Heart, ExternalLink, CheckCircle, Sparkles, Users } from 'lucide-react';
import { cn } from '../utils/cn';

const mockJobs = [
  { id: '1', title: 'Senior Software Engineer', company: 'TechCorp', description: 'Build scalable web applications.', skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'PostgreSQL'], location: 'San Francisco, CA', job_type: 'Full-time', salary_min: 150000, salary_max: 180000, benefits: ['Health', '401k', 'Remote'], is_remote: false, match: 92 },
  { id: '2', title: 'Full Stack Developer', company: 'StartupXYZ', description: 'Build and maintain our platform.', skills: ['TypeScript', 'React', 'Node.js', 'MongoDB', 'GraphQL'], location: 'Remote', job_type: 'Full-time', salary_min: 120000, salary_max: 150000, benefits: ['Remote', 'Equity'], is_remote: true, match: 88 },
  { id: '3', title: 'DevOps Engineer', company: 'CloudFirst', description: 'Build cloud infrastructure.', skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform'], location: 'Seattle, WA', job_type: 'Full-time', salary_min: 140000, salary_max: 170000, benefits: ['Health', 'Stock'], is_remote: false, match: 85 },
  { id: '4', title: 'Data Scientist', company: 'DataDriven', description: 'Analyze data and build models.', skills: ['Python', 'TensorFlow', 'SQL', 'Statistics'], location: 'New York, NY', job_type: 'Full-time', salary_min: 130000, salary_max: 160000, benefits: ['Bonus', 'Education'], is_remote: false, match: 82 },
];

export function JobsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(mockJobs[0]);
  const filteredJobs = mockJobs.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
  const LayoutComponent = user ? DashboardLayout : Layout;

  return (
    <LayoutComponent>
      <div className={cn('pt-8', user && 'pt-0')}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Find Your Next Role</h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-1">{filteredJobs.length} jobs available</p>
        </div>
        <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input type="text" placeholder="Search jobs, skills..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {filteredJobs.map((job) => (
              <div key={job.id} onClick={() => setSelectedJob(job)} className={cn('p-5 rounded-xl cursor-pointer transition-all', selectedJob?.id === job.id ? 'bg-primary-50 dark:bg-primary-950/50 border-2 border-primary-500' : 'bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 hover:border-primary-300')}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white font-bold mr-4">{job.company.charAt(0)}</div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-white">{job.title}</h3>
                      <p className="text-sm text-secondary-600 dark:text-secondary-400">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-medium text-success-600 bg-success-100 dark:bg-success-900/50 px-2 py-1 rounded-full mb-1">{job.match}% match</span>
                    {job.is_remote && <span className="text-xs text-accent-600 bg-accent-100 dark:bg-accent-900/50 px-2 py-0.5 rounded-full">Remote</span>}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-secondary-500">
                  <div className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{job.location}</div>
                  <div className="flex items-center"><DollarSign className="w-4 h-4 mr-1" />${Math.round(job.salary_min / 1000)}k - ${Math.round(job.salary_max / 1000)}k</div>
                  <div className="flex items-center"><Clock className="w-4 h-4 mr-1" />{job.job_type}</div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">{job.skills.slice(0, 4).map((s, i) => (<span key={i} className="px-2 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 text-xs rounded-full">{s}</span>))}</div>
              </div>
            ))}
          </div>
          <div className="hidden lg:block">
            {selectedJob && (
              <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6 sticky top-24">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl mr-4">{selectedJob.company.charAt(0)}</div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary-900 dark:text-white">{selectedJob.title}</h2>
                    <p className="text-secondary-600 dark:text-secondary-400">{selectedJob.company}</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 rounded-xl mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-secondary-600 dark:text-secondary-400">Salary Range</span>
                      <p className="text-2xl font-bold text-secondary-900 dark:text-white">${Math.round(selectedJob.salary_min / 1000)}k - ${Math.round(selectedJob.salary_max / 1000)}k</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-secondary-600 dark:text-secondary-400">AI Match</span>
                      <p className="text-2xl font-bold text-success-600 dark:text-success-400">{selectedJob.match}%</p>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium rounded-lg hover:shadow-lg transition-all flex items-center justify-center mb-4"><Sparkles className="w-5 h-5 mr-2" />Quick Apply</button>
                <div className="mb-4"><h3 className="font-semibold text-secondary-900 dark:text-white mb-2">About this role</h3><p className="text-secondary-600 dark:text-secondary-400 text-sm">{selectedJob.description}</p></div>
                <div className="mb-4"><h3 className="font-semibold text-secondary-900 dark:text-white mb-2">Required Skills</h3><div className="flex flex-wrap gap-2">{selectedJob.skills.map((s, i) => (<span key={i} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm rounded-full">{s}</span>))}</div></div>
                <div><h3 className="font-semibold text-secondary-900 dark:text-white mb-2">Benefits</h3><div className="flex flex-wrap gap-2">{selectedJob.benefits.map((b, i) => (<span key={i} className="px-3 py-1 bg-success-100 dark:bg-success-900/50 text-success-700 dark:text-success-300 text-sm rounded-full">{b}</span>))}</div></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
}
