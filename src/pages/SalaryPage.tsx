import { useState } from 'react';
import { DashboardLayout } from '../components/layout/Layout';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Target, MapPin, Award, Info, Lightbulb } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, RadialBarChart, RadialBar, AreaChart, Area, Cell } from 'recharts';
import { cn } from '../utils/cn';

const mockSalaryData = { current: 110000, market: 135000, percentile: 45, rangeMin: 100000, rangeMax: 160000, median: 130000, top10: 180000, bottom10: 85000 };
const regionalData = [{ city: 'San Francisco', salary: 165000, diff: '+22%' }, { city: 'New York', salary: 155000, diff: '+15%' }, { city: 'Seattle', salary: 150000, diff: '+11%' }, { city: 'Austin', salary: 130000, diff: '-4%' }, { city: 'Remote', salary: 140000, diff: '+4%' }];
const salaryByLevel = [{ level: 'Junior', median: 95000 }, { level: 'Mid', median: 135000 }, { level: 'Senior', median: 170000 }, { level: 'Staff', median: 210000 }];
const salaryTrend = [{ year: '2019', salary: 100000 }, { year: '2020', salary: 105000 }, { year: '2021', salary: 115000 }, { year: '2022', salary: 125000 }, { year: '2023', salary: 130000 }, { year: '2024', salary: 135000 }];
const skillImpacts = [{ skill: 'System Design', impact: '+$15k' }, { skill: 'Leadership', impact: '+$20k' }, { skill: 'Kubernetes', impact: '+$12k' }, { skill: 'AWS', impact: '+$10k' }];

export function SalaryPage() {
  const [selectedRole] = useState('Senior Software Engineer');
  const salaryGap = mockSalaryData.market - mockSalaryData.current;
  const isUnderpaid = salaryGap > 0;
  const percentileData = [{ name: 'percentile', value: mockSalaryData.percentile, fill: mockSalaryData.percentile < 50 ? '#f59e0b' : '#22c55e' }];

  const negotiationTips = [
    { title: 'Timing is Everything', description: 'Best times: after a major achievement or during reviews.' },
    { title: 'Anchor High', description: 'Start 10-15% above your target for better outcomes.' },
    { title: 'Total Compensation', description: 'Consider equity, bonuses, and benefits too.' },
    { title: 'Practice Your Pitch', description: 'Rehearse key points and specific achievements.' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">Fair Pay Engine</h1>
          <p className="text-secondary-600 dark:text-secondary-400 mt-1">Know your worth with real market data</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-secondary-900 dark:text-white">Salary Analysis</h2>
              <span className="text-sm text-secondary-500">Based on 1,234 data points</span>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 bg-secondary-50 dark:bg-secondary-800 rounded-xl">
                <p className="text-sm text-secondary-500 mb-2">Your Current Salary</p>
                <p className="text-4xl font-bold text-secondary-900 dark:text-white">${Math.round(mockSalaryData.current / 1000)}k</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 rounded-xl">
                <p className="text-sm text-secondary-500 mb-2">Market Rate</p>
                <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">${Math.round(mockSalaryData.market / 1000)}k</p>
              </div>
            </div>
            <div className={cn('flex items-center p-4 rounded-xl mb-6', isUnderpaid ? 'bg-warning-50 dark:bg-warning-950/50 border border-warning-200 dark:border-warning-800' : 'bg-success-50 dark:bg-success-950/50 border border-success-200 dark:border-success-800')}>
              {isUnderpaid ? (
                <>
                  <AlertCircle className="w-6 h-6 text-warning-600 dark:text-warning-400 mr-3" />
                  <div>
                    <p className="font-semibold text-warning-800 dark:text-warning-200">You may be underpaid by ${Math.round(salaryGap / 1000)}k ({Math.round((salaryGap / mockSalaryData.market) * 100)}%)</p>
                    <p className="text-sm text-warning-600 dark:text-warning-400">Your salary falls in the {mockSalaryData.percentile}th percentile for your role.</p>
                  </div>
                </>
              ) : <><CheckCircle className="w-6 h-6 text-success-600 dark:text-success-400 mr-3" /><div><p className="font-semibold text-success-800 dark:text-success-200">You're paid competitively!</p><p className="text-sm text-success-600 dark:text-success-400">Your salary exceeds the market median.</p></div></>}
            </div>
            <h3 className="text-sm font-semibold text-secondary-700 dark:text-secondary-300 mb-4">Salary by Experience Level</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salaryByLevel} layout="vertical">
                  <XAxis type="number" tickFormatter={(v) => `$${v / 1000}k`} stroke="#94a3b8" fontSize={12} />
                  <YAxis type="category" dataKey="level" stroke="#94a3b8" fontSize={12} width={60} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} formatter={(v: number) => [`$${(v / 1000).toFixed(0)}k`]} />
                  <Bar dataKey="median" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 text-center">Your Percentile</h3>
              <div className="relative h-40 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" startAngle={180} endAngle={0} data={percentileData}>
                    <RadialBar background={{ fill: '#e2e8f0' }} dataKey="value" cornerRadius={10} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-secondary-900 dark:text-white">{mockSalaryData.percentile}th</span>
                  <span className="text-sm text-secondary-500">percentile</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
              <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4">Key Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center"><Target className="w-4 h-4 text-primary-500 mr-2" /><span className="text-secondary-600 dark:text-secondary-400 text-sm">Median</span></div>
                  <span className="font-medium text-secondary-900 dark:text-white">${Math.round(mockSalaryData.median / 1000)}k</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center"><TrendingUp className="w-4 h-4 text-success-500 mr-2" /><span className="text-secondary-600 dark:text-secondary-400 text-sm">Top 10%</span></div>
                  <span className="font-medium text-secondary-900 dark:text-white">${Math.round(mockSalaryData.top10 / 1000)}k</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center"><TrendingDown className="w-4 h-4 text-warning-500 mr-2" /><span className="text-secondary-600 dark:text-secondary-400 text-sm">Bottom 10%</span></div>
                  <span className="font-medium text-secondary-900 dark:text-white">${Math.round(mockSalaryData.bottom10 / 1000)}k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center"><MapPin className="w-5 h-5 text-primary-500 mr-2" />Regional Comparison</h3>
            <div className="space-y-3">{regionalData.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                <span className="text-secondary-700 dark:text-secondary-300 text-sm">{r.city}</span>
                <div className="flex items-center"><span className="font-medium text-secondary-900 dark:text-white mr-2">${Math.round(r.salary / 1000)}k</span><span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', r.diff.startsWith('+') ? 'text-success-600 bg-success-100 dark:bg-success-900/50' : 'text-error-600 bg-error-100 dark:bg-error-900/50')}>{r.diff}</span></div>
              </div>
            ))}</div>
          </div>
          <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center"><TrendingUp className="w-5 h-5 text-success-500 mr-2" />Salary Trend (5 Years)</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salaryTrend}>
                  <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0} /></linearGradient></defs>
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} formatter={(v: number) => [`$${(v / 1000).toFixed(0)}k`]} />
                  <Area type="monotone" dataKey="salary" stroke="#22c55e" strokeWidth={2} fill="url(#sg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-6">
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-4 flex items-center"><Award className="w-5 h-5 text-warning-500 mr-2" />Skills That Boost Salary</h3>
            <div className="space-y-3">{skillImpacts.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-secondary-700 dark:text-secondary-300 text-sm">{s.skill}</span>
                <span className="font-medium text-success-600">{s.impact}</span>
              </div>
            ))}</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl p-6 text-white">
          <div className="flex items-center mb-4"><Lightbulb className="w-6 h-6 mr-3" /><h2 className="text-xl font-semibold">AI Negotiation Advice</h2></div>
          <p className="text-white/90 mb-6">Based on your salary gap of ${Math.round(salaryGap / 1000)}k, here are personalized strategies.</p>
          <div className="grid md:grid-cols-4 gap-4">{negotiationTips.map((tip, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <h3 className="font-semibold mb-2">{tip.title}</h3>
              <p className="text-sm text-white/80">{tip.description}</p>
            </div>
          ))}</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
