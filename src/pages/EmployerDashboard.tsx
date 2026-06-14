import { useState } from 'react';
import { DashboardLayout } from '../components/layout/Layout';
import { Users, Briefcase, TrendingUp, Clock, ChevronRight, MapPin, DollarSign, Building2, Award, Target, Star, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { cn } from '../utils/cn';

const mockCandidates = [
  { id: '1', name: 'Alex Rivera', title: 'Software Engineer', location: 'San Francisco', experience_years: 5, skills: ['JavaScript', 'React', 'Node.js', 'AWS'], match_score: 94, company: 'TechStartup', strengths: ['Strong React expertise', 'Cloud experience'], gaps: ['Limited Kubernetes'], potential: 'high' },
  { id: '2', name: 'Jordan Kim', title: 'Full Stack Developer', location: 'Remote', experience_years: 4, skills: ['TypeScript', 'React', 'Python', 'Docker'], match_score: 91, company: 'ScaleUp', strengths: ['Full stack', 'Fast learner'], gaps: ['No team lead'], potential: 'high' },
  { id: '3', name: 'Sarah Chen', title: 'Senior Software Engineer', location: 'Seattle', experience_years: 6, skills: ['Java', 'Spring', 'React', 'AWS'], match_score: 88, company: 'EnterpriseCorp', strengths: ['System design', 'Mentoring'], gaps: ['React upskilling'], potential: 'medium' },
];

const hiringFunnel = [{ stage: 'Applied', count: 245 }, { stage: 'Screened', count: 120 }, { stage: 'Interview', count: 45 }, { stage: 'Offer', count: 12 }, { stage: 'Hired', count: 8 }];
const timeToHire = [{ month: 'Jan', days: 28 }, { month: 'Feb', days: 25 }, { month: 'Mar', days: 22 }, { month: 'Apr', days: 24 }, { month: 'May', days: 20 }, { month: 'Jun', days: 18 }];
const sourceData = [{ name: 'CareerOS', value: 40, color: '#3b82f6' }, { name: 'LinkedIn', value: 25, color: '#0077b5' }, { name: 'Referrals', value: 20, color: '#22c55e' }, { name: 'Other', value: 15, color: '#94a3b8' }];

export function EmployerDashboard() {
  const [selectedCandidate, setSelectedCandidate] = useState(mockCandidates[0]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Hiring Dashboard</h1>
            <p className="text-secondary-600 dark:text-secondary-400 mt-1">Find and manage your top talent matches</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button className="px-4 py-2 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg text-sm font-medium">Post New Job</button>
            <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg text-sm font-medium flex items-center"><Sparkles className="w-4 h-4 mr-2" />AI Talent Search</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[{ title: 'Open Positions', value: 4, icon: Briefcase, change: '+2' }, { title: 'Applications', value: 120, icon: Users, change: '+45' }, { title: 'Days to Hire', value: 18, icon: Clock, change: '-5' }, { title: 'Accept Rate', value: '92%', icon: TrendingUp, change: '' }].map((s, i) => (
            <div key={i} className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-5">
              <div className="flex items-center justify-between mb-3">
                <s.icon className="w-5 h-5 text-primary-500" />
                {s.change && <span className="text-xs text-success-600 bg-success-100 dark:bg-success-900/50 px-2 py-0.5 rounded-full">{s.change}</span>}
              </div>
              <div className="text-2xl font-bold text-secondary-900 dark:text-white">{s.value}</div>
              <div className="text-sm text-secondary-500">{s.title}</div>
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 overflow-hidden">
            <div className="p-4 border-b border-secondary-200 dark:border-secondary-800 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white flex items-center"><Target className="w-5 h-5 text-primary-500 mr-2" />Smart Talent Matches</h2>
            </div>
            <div className="grid lg:grid-cols-2 divide-x divide-secondary-200 dark:divide-secondary-700">
              <div className="max-h-[400px] overflow-y-auto divide-y divide-secondary-200 dark:divide-secondary-700">
                {mockCandidates.map((c) => (
                  <div key={c.id} onClick={() => setSelectedCandidate(c)} className={cn('p-4 cursor-pointer transition-colors', selectedCandidate?.id === c.id ? 'bg-primary-50 dark:bg-primary-950/50' : 'hover:bg-secondary-50 dark:hover:bg-secondary-800/50')}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-medium mr-3">{c.name.split(' ').map(n => n[0]).join('')}</div>
                        <div>
                          <h3 className="font-medium text-secondary-900 dark:text-white">{c.name}</h3>
                          <p className="text-sm text-secondary-500">{c.title}</p>
                        </div>
                      </div>
                      <div className="text-right"><div className={cn('text-lg font-bold', c.match_score >= 90 ? 'text-success-600' : 'text-primary-600')}>{c.match_score}%</div><div className="text-xs text-secondary-500">match</div></div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">{c.skills.slice(0, 3).map((s, i) => (<span key={i} className="px-2 py-0.5 bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 text-xs rounded-full">{s}</span>))}</div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-secondary-50 dark:bg-secondary-800/50">
                {selectedCandidate && (
                  <div>
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">{selectedCandidate.name.split(' ').map(n => n[0]).join('')}</div>
                      <h3 className="text-xl font-bold text-secondary-900 dark:text-white">{selectedCandidate.name}</h3>
                      <p className="text-secondary-600 dark:text-secondary-400">{selectedCandidate.title}</p>
                      <div className="mt-2 inline-flex items-center px-4 py-2 bg-success-100 dark:bg-success-900/50 rounded-full">
                        <span className="text-2xl font-bold text-success-600 mr-2">{selectedCandidate.match_score}%</span>
                        <span className="text-sm text-success-600">Match Score</span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-secondary-900 rounded-xl p-4 mb-4">
                      <h4 className="font-semibold text-secondary-900 dark:text-white mb-3 flex items-center"><Award className="w-4 h-4 text-success-500 mr-2" />Why This Match</h4>
                      <ul className="space-y-2">{selectedCandidate.strengths.map((s, i) => (<li key={i} className="flex items-start text-sm text-secondary-600 dark:text-secondary-400"><CheckCircle className="w-4 h-4 text-success-500 mr-2 mt-0.5" />{s}</li>))}</ul>
                    </div>
                    {selectedCandidate.gaps.length > 0 && (
                      <div className="bg-white dark:bg-secondary-900 rounded-xl p-4 mb-4">
                        <h4 className="font-semibold text-secondary-900 dark:text-white mb-3 flex items-center"><AlertCircle className="w-4 h-4 text-warning-500 mr-2" />Potential Gaps</h4>
                        <ul className="space-y-2">{selectedCandidate.gaps.map((g, i) => (<li key={i} className="flex items-start text-sm text-secondary-600 dark:text-secondary-400"><div className="w-4 h-4 rounded-full bg-warning-100 dark:bg-warning-900/50 flex items-center justify-center mr-2 mt-0.5"><span className="text-xs text-warning-600">!</span></div>{g}</li>))}</ul>
                      </div>
                    )}
                    <button className="w-full py-2.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-medium rounded-lg hover:shadow-lg transition-all">Invite to Interview</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Hiring Funnel</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hiringFunnel} layout="vertical">
                    <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                    <YAxis type="category" dataKey="stage" stroke="#94a3b8" fontSize={11} width={60} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Time to Hire (Days)</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeToHire}>
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                    <Line type="monotone" dataKey="days" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Candidate Sources</h3>
              <div className="flex items-center justify-center mb-4">
                <ResponsiveContainer width="100%" height={120}>
                  <PieChart><Pie data={sourceData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">{sourceData.map((e, i) => (<Cell key={i} fill={e.color} />))}</Pie></PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">{sourceData.map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center"><div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: s.color }} /><span className="text-sm text-secondary-600 dark:text-secondary-400">{s.name}</span></div>
                  <span className="text-sm font-medium text-secondary-900 dark:text-white">{s.value}%</span>
                </div>
              ))}</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
