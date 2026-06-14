import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, Target, Briefcase, Calendar, ChevronRight, Sparkles, ArrowUpRight, CheckCircle, Building2, MapPin, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import { cn } from '../utils/cn';

const profileCompletionData = [{ name: 'Resume', value: 100, color: '#22c55e' }, { name: 'Skills', value: 75, color: '#3b82f6' }, { name: 'Projects', value: 50, color: '#f59e0b' }, { name: 'Certs', value: 25, color: '#ef4444' }];
const mockApplications = [
  { id: '1', title: 'Senior Software Engineer', company: 'TechCorp', location: 'San Francisco', status: 'applied', salary: '$150k - $180k', match: 92 },
  { id: '2', title: 'Full Stack Developer', company: 'StartupXYZ', location: 'Remote', status: 'interview', salary: '$120k - $150k', match: 88 },
  { id: '3', title: 'Tech Lead', company: 'ScaleUp Inc', location: 'New York', status: 'saved', salary: '$180k - $220k', match: 85 },
  { id: '4', title: 'Staff Engineer', company: 'EnterpriseCo', location: 'Austin', status: 'offer', salary: '$200k - $250k', match: 90 },
];

export function CandidateDashboard() {
  const { user } = useAuth();
  const statusColumns = [
    { id: 'saved', title: 'Saved', color: 'bg-secondary-500', apps: mockApplications.filter(a => a.status === 'saved') },
    { id: 'applied', title: 'Applied', color: 'bg-primary-500', apps: mockApplications.filter(a => a.status === 'applied') },
    { id: 'interview', title: 'Interview', color: 'bg-accent-500', apps: mockApplications.filter(a => a.status === 'interview') },
    { id: 'offer', title: 'Offer', color: 'bg-success-500', apps: mockApplications.filter(a => a.status === 'offer') },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Welcome back, {user?.name?.split(' ')[0] || 'there'}</h1>
            <p className="text-secondary-600 dark:text-secondary-400 mt-1">Here's your career progress</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Link to="/jobs" className="px-4 py-2 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg text-sm font-medium">Browse Jobs</Link>
            <Link to="/ai-coach" className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-sm font-medium flex items-center"><Sparkles className="w-4 h-4 mr-2" />AI Coach</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[{ title: 'Career Health', value: 78, suffix: '/100', change: +5, icon: TrendingUp, color: 'from-success-500 to-success-600' },
            { title: 'Profile Completion', value: 65, suffix: '%', change: +10, icon: Target, color: 'from-primary-500 to-primary-600' },
            { title: 'Active Applications', value: 4, change: null, icon: Briefcase, color: 'from-accent-500 to-accent-600' },
            { title: 'Interviews', value: 2, change: null, icon: Calendar, color: 'from-warning-500 to-warning-600' }]
            .map((stat, i) => (
              <div key={i} className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn('w-10 h-10 bg-gradient-to-br', stat.color, 'rounded-lg flex items-center justify-center')}><stat.icon className="w-5 h-5 text-white" /></div>
                  {stat.change !== null && <div className={cn('flex items-center text-sm font-medium', stat.change >= 0 ? 'text-success-600' : 'text-error-600')}><ArrowUpRight className="w-4 h-4 mr-1" />{Math.abs(stat.change)}</div>}
                </div>
                <div className="text-2xl font-bold text-secondary-900 dark:text-white">{stat.value}{stat.suffix && <span className="text-lg text-secondary-400">{stat.suffix}</span>}</div>
                <div className="text-sm text-secondary-500 mt-1">{stat.title}</div>
              </div>
            ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 overflow-hidden">
            <div className="p-4 border-b border-secondary-200 dark:border-secondary-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">Application Tracker</h2>
              <Link to="/jobs" className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center">Find more jobs<ChevronRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-4 overflow-x-auto">
              <div className="flex space-x-4 min-w-max">
                {statusColumns.map((col) => (
                  <div key={col.id} className="w-64 flex-shrink-0">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className={cn('w-2 h-2 rounded-full', col.color)} />
                      <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">{col.title}</span>
                      <span className="text-xs text-secondary-500 bg-secondary-100 dark:bg-secondary-800 px-2 py-0.5 rounded-full">{col.apps.length}</span>
                    </div>
                    <div className="space-y-2">
                      {col.apps.map((app) => (
                        <div key={app.id} className="bg-secondary-50 dark:bg-secondary-800 rounded-lg p-3 border border-secondary-200 dark:border-secondary-700">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-secondary-900 dark:text-white text-sm">{app.title}</h4>
                              <p className="text-xs text-secondary-500 flex items-center mt-0.5"><Building2 className="w-3 h-3 mr-1" />{app.company}</p>
                            </div>
                            <span className="text-xs font-medium text-primary-600 bg-primary-100 dark:bg-primary-900/50 px-2 py-0.5 rounded-full">{app.match}%</span>
                          </div>
                          <div className="flex items-center mt-2 text-xs text-secondary-400"><MapPin className="w-3 h-3 mr-1" />{app.location}<span className="mx-2">|</span><DollarSign className="w-3 h-3 mr-1" />{app.salary}</div>
                        </div>
                      ))}
                      {col.apps.length === 0 && <div className="h-20 border-2 border-dashed border-secondary-200 dark:border-secondary-700 rounded-lg flex items-center justify-center text-sm text-secondary-400">Drop here</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Profile Completion</h2>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <ResponsiveContainer><PieChart><Pie data={profileCompletionData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={2} dataKey="value">{profileCompletionData.map((entry, index) => (<Cell key={index} fill={entry.color} />))}</Pie></PieChart></ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center"><span className="text-2xl font-bold text-secondary-900 dark:text-white">65%</span></div>
                </div>
              </div>
              <div className="space-y-2">{profileCompletionData.map((item, i) => (<div key={i} className="flex items-center justify-between"><div className="flex items-center"><div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} /><span className="text-sm text-secondary-600 dark:text-secondary-400">{item.name}</span></div><span className="text-sm font-medium text-secondary-900 dark:text-white">{item.value}%</span></div>))}</div>
            </div>

            <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">AI Recommendations</h2>
                <Sparkles className="w-5 h-5 text-primary-500" />
              </div>
              <div className="space-y-3">
                {[
                  { type: 'job', title: 'Senior Software Engineer', company: 'TechCorp', match: 92 },
                  { type: 'skill', title: 'Learn Kubernetes', reason: 'High demand (+35% salary)' },
                  { type: 'path', title: 'Tech Lead in 2 years', confidence: 85 },
                ].map((rec, i) => (
                  <div key={i} className="p-3 bg-secondary-50 dark:bg-secondary-800/50 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-secondary-900 dark:text-white">{rec.title}</span>
                      {rec.match && <span className="text-xs font-medium text-success-600 bg-success-100 dark:bg-success-900/50 px-2 py-0.5 rounded-full">{rec.match}%</span>}
                      {rec.confidence && <span className="text-xs font-medium text-primary-600 bg-primary-100 dark:bg-primary-900/50 px-2 py-0.5 rounded-full">{rec.confidence}%</span>}
                    </div>
                    <p className="text-xs text-secondary-500">{rec.company || rec.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
