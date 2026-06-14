import { useState } from 'react';
import { DashboardLayout } from '../components/layout/Layout';
import { GraduationCap, TrendingUp, Building, DollarSign, Users, Briefcase, Target, Calendar, ChevronRight, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { cn } from '../utils/cn';

const employmentStats = { employmentRate: 92, avgSalary: 85000, jobPlacementTime: 42, graduateCount: 2450 };
const employmentTrend = [{ year: '2019', rate: 88, salary: 72000 }, { year: '2020', rate: 82, salary: 74000 }, { year: '2021', rate: 89, salary: 78000 }, { year: '2022', rate: 91, salary: 82000 }, { year: '2023', rate: 92, salary: 85000 }];
const industryDistribution = [{ industry: 'Technology', percentage: 35, color: '#3b82f6' }, { industry: 'Finance', percentage: 18, color: '#22c55e' }, { industry: 'Consulting', percentage: 15, color: '#f59e0b' }, { industry: 'Healthcare', percentage: 12, color: '#ef4444' }, { industry: 'Other', percentage: 20, color: '#94a3b8' }];
const topEmployers = [{ company: 'Google', hires: 45 }, { company: 'Amazon', hires: 38 }, { company: 'Microsoft', hires: 32 }, { company: 'Meta', hires: 28 }, { company: 'Apple', hires: 22 }];
const skillsDemand = [{ skill: 'Machine Learning', growth: 45 }, { skill: 'Cloud Computing', growth: 38 }, { skill: 'Data Analysis', growth: 32 }, { skill: 'Full Stack', growth: 28 }];
const programOutcomes = [{ program: 'Computer Science', employment: 96, avgSalary: 95000, graduates: 450 }, { program: 'Business Admin', employment: 91, avgSalary: 72000, graduates: 380 }, { program: 'Engineering', employment: 94, avgSalary: 88000, graduates: 320 }, { program: 'Data Science', employment: 98, avgSalary: 92000, graduates: 150 }];
const careerReadiness = { overall: 78, technical: 82, softSkills: 75, industry: 80, networking: 72 };

export function UniversityDashboard() {
  const [selectedYear] = useState(2023);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">University Dashboard</h1>
            <p className="text-secondary-600 dark:text-secondary-400 mt-1">Track graduate outcomes and career readiness</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[{ title: 'Employment Rate', value: `${employmentStats.employmentRate}%`, icon: GraduationCap, change: '+4%' },
            { title: 'Avg Starting Salary', value: `$${Math.round(employmentStats.avgSalary / 1000)}k`, icon: DollarSign, change: '+$3k' },
            { title: 'Days to Placement', value: employmentStats.jobPlacementTime, icon: Calendar, change: '-5' },
            { title: 'Total Graduates', value: employmentStats.graduateCount.toLocaleString(), icon: Users, change: '' }]
            .map((s, i) => (
              <div key={i} className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-5">
                <div className="flex items-center justify-between mb-3">
                  <s.icon className="w-5 h-5 text-primary-500" />
                  {s.change && <span className="text-xs text-success-600 bg-success-100 dark:bg-success-900/50 px-2 py-0.5 rounded-full flex items-center"><ArrowUpRight className="w-3 h-3 mr-1" />{s.change}</span>}
                </div>
                <div className="text-2xl font-bold text-secondary-900 dark:text-white">{s.value}</div>
                <div className="text-sm text-secondary-500">{s.title}</div>
              </div>
            ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-6">Employment Trends (5 Years)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={employmentTrend}>
                  <defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient></defs>
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#94a3b8" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Area yAxisId="left" type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} fill="url(#eg)" name="Employment %" />
                  <Line yAxisId="right" type="monotone" dataKey="salary" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e' }} name="Avg Salary" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
            <h2 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Career Readiness Score</h2>
            <div className="text-center mb-6"><div className="text-5xl font-bold text-primary-600 dark:text-primary-400">{careerReadiness.overall}</div><div className="text-sm text-secondary-500">out of 100</div></div>
            <div className="space-y-4">
              {[{ name: 'Technical Skills', score: careerReadiness.technical, color: 'bg-primary-500' },
                { name: 'Soft Skills', score: careerReadiness.softSkills, color: 'bg-accent-500' },
                { name: 'Industry Knowledge', score: careerReadiness.industry, color: 'bg-success-500' },
                { name: 'Networking', score: careerReadiness.networking, color: 'bg-warning-500' }]
                .map((m, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1"><span className="text-sm text-secondary-600 dark:text-secondary-400">{m.name}</span><span className="text-sm font-medium text-secondary-900 dark:text-white">{m.score}</span></div>
                    <div className="h-2 bg-secondary-100 dark:bg-secondary-800 rounded-full overflow-hidden"><div className={cn('h-full rounded-full', m.color)} style={{ width: `${m.score}%` }} /></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center"><Building className="w-5 h-5 text-primary-500 mr-2" />Industry Distribution</h3>
            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart><Pie data={industryDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="percentage">{industryDistribution.map((e, i) => (<Cell key={i} fill={e.color} />))}</Pie></PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">{industryDistribution.map((s, i) => (<div key={i} className="flex items-center justify-between"><div className="flex items-center"><div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: s.color }} /><span className="text-sm text-secondary-600 dark:text-secondary-400">{s.industry}</span></div><span className="text-sm font-medium text-secondary-900 dark:text-white">{s.percentage}%</span></div>))}</div>
          </div>
          <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Top Employers</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topEmployers} layout="vertical">
                  <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                  <YAxis type="category" dataKey="company" stroke="#94a3b8" fontSize={11} width={70} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Bar dataKey="hires" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center"><Target className="w-5 h-5 text-accent-500 mr-2" />Skills in Demand</h3>
            <div className="space-y-4">{skillsDemand.map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1"><span className="text-sm text-secondary-600 dark:text-secondary-400">{s.skill}</span><span className="text-sm font-medium text-success-600 flex items-center"><ArrowUpRight className="w-3 h-3 mr-1" />{s.growth}%</span></div>
                <div className="h-2 bg-secondary-100 dark:bg-secondary-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" style={{ width: `${s.growth}%` }} /></div>
              </div>
            ))}</div>
          </div>
        </div>
        <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 overflow-hidden">
          <div className="p-6 border-b border-secondary-200 dark:border-secondary-800"><h2 className="text-lg font-semibold text-secondary-900 dark:text-white">Program Outcomes</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-50 dark:bg-secondary-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Graduates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Employment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase">Avg Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                {programOutcomes.map((p, i) => (
                  <tr key={i} className="hover:bg-secondary-50 dark:hover:bg-secondary-800/50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-secondary-900 dark:text-white">{p.program}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-secondary-600 dark:text-secondary-400">{p.graduates}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-secondary-100 dark:bg-secondary-800 rounded-full mr-2 overflow-hidden">
                          <div className={cn('h-full rounded-full', p.employment >= 90 ? 'bg-success-500' : 'bg-primary-500')} style={{ width: `${p.employment}%` }} />
                        </div>
                        <span className="text-sm font-medium text-secondary-900 dark:text-white">{p.employment}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-secondary-900 dark:text-white font-medium">${Math.round(p.avgSalary / 1000)}k</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
