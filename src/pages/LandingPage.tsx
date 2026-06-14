import { Link } from 'react-router-dom';
import { ArrowRight, Network, Brain, TrendingUp, Users, Building2, GraduationCap, Sparkles, Target, LineChart, Shield, Star, CheckCircle, Zap } from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { cn } from '../utils/cn';

const features = [
  { icon: Network, title: 'Career Path Navigator', description: 'Visualize your career trajectory with AI-powered recommendations.' },
  { icon: Brain, title: 'AI Career Coach', description: 'Personalized career advice, resume feedback, and interview prep 24/7.' },
  { icon: TrendingUp, title: 'Fair Pay Engine', description: 'Know your worth with real-time salary insights.' },
  { icon: Target, title: 'Smart Job Matching', description: 'AI-powered recommendations matching your skills and goals.' },
  { icon: LineChart, title: 'Analytics Dashboard', description: 'Track your career health and application progress.' },
  { icon: Shield, title: 'Explainable AI', description: 'Every recommendation with transparent reasoning.' },
];

const stats = [{ value: '50K+', label: 'Career Paths' }, { value: '10M+', label: 'Jobs Analyzed' }, { value: '100K+', label: 'Active Users' }, { value: '95%', label: 'Satisfaction' }];

const testimonials = [
  { name: 'Sarah Chen', role: 'Software Engineer at Google', content: 'CareerOS helped me map my path from junior to tech lead. The AI coach gave me exactly the roadmap I needed.', avatar: 'SC' },
  { name: 'Marcus Johnson', role: 'Product Manager at Stripe', content: 'The fair pay engine showed I was underpaid by 30%. I negotiated and got the raise I deserved.', avatar: 'MJ' },
  { name: 'Emily Davis', role: 'UX Designer at Airbnb', content: 'The career visualization opened my eyes to paths I never considered. Successfully pivoted to design.', avatar: 'ED' },
];

const pricingPlans = [
  { name: 'Free', price: '$0', period: 'forever', features: ['Basic career paths', 'Limited AI coaching', 'Job search'], cta: 'Get Started', highlighted: false },
  { name: 'Pro', price: '$19', period: '/month', features: ['Unlimited AI coaching', 'Full salary analytics', 'Advanced paths', 'Priority matching'], cta: 'Start Free Trial', highlighted: true },
  { name: 'Enterprise', price: 'Custom', period: '', features: ['Team analytics', 'Custom integrations', 'Dedicated support'], cta: 'Contact Sales', highlighted: false },
];

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary-950 via-primary-950 to-secondary-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2 text-accent-400" />Introducing CareerOS 2.0
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Navigate Your Career<br />
              <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-success-400 bg-clip-text text-transparent">with Intelligence</span>
            </h1>
            <p className="text-xl text-secondary-300 max-w-2xl mx-auto mb-10">
              CareerOS uses AI to help you understand your career options, build skills strategically, and make data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary-500/30 transition-all flex items-center">
                Start Your Career Journey<ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/career-paths" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20">Explore Career Paths</Link>
            </div>
          </div>
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-secondary-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white dark:bg-secondary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-400">A complete toolkit for career growth</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-secondary-50 dark:bg-secondary-900 hover:bg-primary-50 dark:hover:bg-primary-950/50 border border-transparent hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-24 bg-secondary-50 dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">Solutions for Everyone</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: 'For Candidates', description: 'Build your career with AI guidance.', features: ['Career planning', 'AI coaching', 'Smart matching'], gradient: 'from-primary-500 to-primary-600' },
              { icon: Building2, title: 'For Employers', description: 'Find the right talent efficiently.', features: ['Smart matching', 'Applicant tracking', 'Analytics'], gradient: 'from-accent-500 to-accent-600' },
              { icon: GraduationCap, title: 'For Universities', description: 'Track graduate outcomes.', features: ['Outcome tracking', 'Career readiness', 'Analytics'], gradient: 'from-success-500 to-success-600' },
            ].map((solution, idx) => (
              <div key={idx} className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-lg">
                <div className={cn('w-14 h-14 bg-gradient-to-br', solution.gradient, 'rounded-2xl flex items-center justify-center mb-6')}>
                  <solution.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-3">{solution.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-6">{solution.description}</p>
                <ul className="space-y-3 mb-8">
                  {solution.features.map((f, i) => (
                    <li key={i} className="flex items-center text-secondary-700 dark:text-secondary-300"><CheckCircle className="w-5 h-5 text-success-500 mr-3" />{f}</li>
                  ))}
                </ul>
                <button className={cn('w-full py-3 bg-gradient-to-r', solution.gradient, 'text-white font-medium rounded-lg hover:shadow-lg transition-shadow')}>Learn More</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-secondary-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">Loved by Professionals</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-secondary-50 dark:bg-secondary-900 rounded-2xl p-6 border border-secondary-200 dark:border-secondary-800">
                <div className="flex items-center mb-4">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 text-warning-400 fill-current" />))}</div>
                <p className="text-secondary-700 dark:text-secondary-300 mb-6">"{t.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-medium mr-3">{t.avatar}</div>
                  <div><div className="font-medium text-secondary-900 dark:text-white">{t.name}</div><div className="text-sm text-secondary-500">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-secondary-50 dark:bg-secondary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className={cn('rounded-2xl p-8', plan.highlighted ? 'bg-gradient-to-b from-primary-600 to-primary-700 text-white shadow-xl scale-105' : 'bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white border border-secondary-200 dark:border-secondary-700')}>
                {plan.highlighted && <div className="text-accent-400 text-sm font-medium mb-4 flex items-center justify-center"><Zap className="w-4 h-4 mr-2" />Most Popular</div>}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6"><span className="text-4xl font-bold">{plan.price}</span><span className={plan.highlighted ? 'text-primary-200' : 'text-secondary-500'}>{plan.period}</span></div>
                <ul className="space-y-3 mb-8">{plan.features.map((f, i) => (<li key={i} className="flex items-center"><CheckCircle className={cn('w-5 h-5 mr-3', plan.highlighted ? 'text-accent-400' : 'text-success-500')} /><span className={plan.highlighted ? 'text-primary-100' : 'text-secondary-600 dark:text-secondary-400'}>{f}</span></li>))}</ul>
                <button className={cn('w-full py-3 rounded-lg font-medium transition-colors', plan.highlighted ? 'bg-white text-primary-600 hover:bg-primary-50' : 'bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-white hover:bg-secondary-200 dark:hover:bg-secondary-600')}>{plan.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Take Control of Your Career?</h2>
          <p className="text-xl text-primary-100 mb-10">Join 100,000+ professionals using CareerOS.</p>
          <Link to="/register" className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:shadow-2xl transition-all">Start Free Today<ArrowRight className="w-5 h-5 ml-2" /></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
