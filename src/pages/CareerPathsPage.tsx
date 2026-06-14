import { useState } from 'react';
import { DashboardLayout } from '../components/layout/Layout';
import { Search, Filter, Clock, DollarSign, BookOpen, TrendingUp, Target, Zap, GitBranch, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

const mockPaths = [
  { id: '1', role_title: 'Software Engineer', role_category: 'Engineering', description: 'Design and develop software applications.', next_roles: [{ role: 'Senior Software Engineer', years: 3, probability: 0.7 }, { role: 'Full Stack Developer', years: 2, probability: 0.6 }], alternative_paths: [{ role: 'DevOps Engineer', years: 2 }, { role: 'Product Manager', years: 3 }, { role: 'AI Engineer', years: 2 }], required_skills: ['JavaScript', 'Python', 'SQL', 'Git'], recommended_skills: ['AWS', 'Docker', 'React'], salary_range_start: 75000, salary_range_end: 150000, experience_required_min: 0, education_required: "Bachelor's Degree", growth_potential: 'High', market_demand: 'Very High', },
  { id: '2', role_title: 'Data Scientist', role_category: 'Data', description: 'Analyze data and build ML models.', next_roles: [{ role: 'Senior Data Scientist', years: 3, probability: 0.7 }], alternative_paths: [{ role: 'ML Engineer', years: 2 }], required_skills: ['Python', 'Statistics', 'Machine Learning'], recommended_skills: ['Deep Learning', 'MLOps'], salary_range_start: 90000, salary_range_end: 160000, experience_required_min: 0, education_required: "Master's Degree", growth_potential: 'Very High', market_demand: 'Very High', },
  { id: '3', role_title: 'Product Manager', role_category: 'Product', description: 'Define product vision and deliver features.', next_roles: [{ role: 'Senior Product Manager', years: 3, probability: 0.6 }], alternative_paths: [{ role: 'Director of Product', years: 6 }], required_skills: ['Product Strategy', 'User Research', 'Analytics'], recommended_skills: ['A/B Testing', 'Growth Strategy'], salary_range_start: 100000, salary_range_end: 180000, experience_required_min: 2, education_required: "Bachelor's or MBA", growth_potential: 'High', market_demand: 'High', },
];

export function CareerPathsPage() {
  const [selectedPath, setSelectedPath] = useState(mockPaths[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const categories = ['all', ...new Set(mockPaths.map(p => p.role_category))];
  const filteredPaths = mockPaths.filter(p => {
    const matchesSearch = p.role_title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || p.role_category.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Career Path Navigator</h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-1">Explore career trajectories and plan your journey</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input type="text" placeholder="Search roles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 rounded-lg focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="flex space-x-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={cn('px-4 py-2 text-sm font-medium rounded-lg transition-colors', activeFilter === cat ? 'bg-primary-500 text-white' : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300')}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            {filteredPaths.map((path) => (
              <button key={path.id} onClick={() => setSelectedPath(path)} className={cn('w-full p-4 rounded-xl text-left transition-all', selectedPath?.id === path.id ? 'bg-primary-50 dark:bg-primary-950/50 border-2 border-primary-500' : 'bg-white dark:bg-secondary-900 border border-secondary-200 dark:border-secondary-700 hover:border-primary-300')}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-secondary-900 dark:text-white">{path.role_title}</h3>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full', path.market_demand === 'Very High' ? 'bg-success-100 text-success-700 dark:bg-success-900/50 dark:text-success-400' : 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-400')}>{path.market_demand}</span>
                </div>
                <p className="text-sm text-secondary-500 mb-3 line-clamp-2">{path.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-600 dark:text-secondary-400">${Math.round(path.salary_range_start / 1000)}k - ${Math.round(path.salary_range_end / 1000)}k</span>
                  <span className="text-secondary-500">{path.role_category}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="lg:col-span-2 bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 overflow-hidden">
            {selectedPath && (
              <>
                <div className="p-6 border-b border-secondary-200 dark:border-secondary-800">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-secondary-900 dark:text-white">{selectedPath.role_title}</h2>
                      <p className="text-secondary-600 dark:text-secondary-400 mt-1">{selectedPath.description}</p>
                    </div>
                    <div className="text-right"><span className="text-lg font-bold text-secondary-900 dark:text-white">${Math.round(selectedPath.salary_range_start / 1000)}k - ${Math.round(selectedPath.salary_range_end / 1000)}k</span><div className="text-sm text-secondary-500">Annual Salary</div></div>
                  </div>
                  <div className="flex items-center space-x-6 mt-4">
                    <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400"><Clock className="w-4 h-4 mr-1" />{selectedPath.experience_required_min}+ years</div>
                    <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400"><BookOpen className="w-4 h-4 mr-1" />{selectedPath.education_required}</div>
                    <div className="flex items-center text-sm text-secondary-600 dark:text-secondary-400"><TrendingUp className="w-4 h-4 mr-1" />{selectedPath.growth_potential}</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-6 uppercase tracking-wide">Career Trajectory</h3>
                  <div className="flex flex-col items-center">
                    <div className="w-40 bg-gradient-to-br from-primary-500 to-accent-500 text-white rounded-xl p-4 text-center shadow-lg">
                      <div className="text-xs uppercase tracking-wide mb-1 opacity-80">Current</div>
                      <div className="font-semibold">{selectedPath.role_title}</div>
                    </div>
                    <div className="w-px h-12 bg-gradient-to-b from-primary-500 to-primary-200 dark:to-primary-800" />
                    <div className="w-full">
                      <div className="text-center mb-3 text-xs font-medium text-secondary-500">Next Steps</div>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedPath.next_roles.map((next, idx) => (
                          <div key={idx} className="bg-secondary-50 dark:bg-secondary-800 rounded-xl p-4 border border-secondary-200 dark:border-secondary-700">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-secondary-900 dark:text-white text-sm">{next.role}</span>
                              <span className="text-xs text-success-600 bg-success-100 dark:bg-success-900/50 px-2 py-0.5 rounded-full">{Math.round((next.probability || 0) * 100)}%</span>
                            </div>
                            <div className="flex items-center text-xs text-secondary-500"><Clock className="w-3 h-3 mr-1" />~{next.years} years</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {selectedPath.alternative_paths.length > 0 && (
                      <>
                        <div className="w-px h-8 bg-secondary-200 dark:bg-secondary-700" />
                        <div className="w-full">
                          <div className="flex items-center mb-3"><GitBranch className="w-4 h-4 text-secondary-400 mr-2" /><span className="text-xs font-medium text-secondary-500">Alternative Paths</span></div>
                          <div className="grid grid-cols-3 gap-3">
                            {selectedPath.alternative_paths.map((alt, idx) => (
                              <div key={idx} className="bg-white dark:bg-secondary-900 rounded-lg p-3 border border-secondary-200 dark:border-secondary-700">
                                <div className="font-medium text-secondary-900 dark:text-white text-sm mb-1">{alt.role}</div>
                                <div className="text-xs text-secondary-500">~{alt.years} years</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-3 flex items-center"><Target className="w-4 h-4 mr-2 text-primary-500" />Required Skills</h4>
                      <div className="flex flex-wrap gap-2">{selectedPath.required_skills.map((s, i) => (<span key={i} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-sm rounded-full">{s}</span>))}</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-3 flex items-center"><Zap className="w-4 h-4 mr-2 text-accent-500" />Recommended</h4>
                      <div className="flex flex-wrap gap-2">{selectedPath.recommended_skills.map((s, i) => (<span key={i} className="px-3 py-1 bg-accent-100 dark:bg-accent-900/50 text-accent-700 dark:text-accent-300 text-sm rounded-full">{s}</span>))}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
