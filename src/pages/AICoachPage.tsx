import { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { Send, Sparkles, User, Bot, Lightbulb, FileText, MessageSquare, TrendingUp, Target, Briefcase, Copy, Check } from 'lucide-react';
import { cn } from '../utils/cn';

interface Message { id: string; role: 'user' | 'assistant'; content: string; timestamp: Date; confidence?: number; }

const suggestedPrompts = [
  { icon: FileText, text: 'Review my resume for a senior role', category: 'Resume' },
  { icon: MessageSquare, text: 'Help me prepare for interview questions', category: 'Interview' },
  { icon: TrendingUp, text: 'What skills should I learn next?', category: 'Skills' },
  { icon: Target, text: 'How do I negotiate a salary raise?', category: 'Salary' },
];

export function AICoachPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } };
  const handleSuggestedPrompt = (prompt: string) => { setInput(prompt); };
  const handleCopy = (id: string, content: string) => { navigator.clipboard.writeText(content); setCopiedId(id); setTimeout(() => setCopiedId(null), 2000); };

  const generateAIResponse = (userInput: string): Message => {
    const lower = userInput.toLowerCase();
    let content = '';
    let confidence = 85;

    if (lower.includes('resume')) {
      content = `Based on my analysis of successful resumes:

**Structure & Content:**
1. **Professional Summary** - Lead with a strong value proposition
2. **Key Achievements** - Use the STAR method
3. **Skills Section** - Add metrics to your bullets

**Quick Wins:**
- Add metrics to bullets (e.g., "Improved performance by 40%")
- Include relevant keywords from job postings
- Keep it to 2 pages for senior roles

**Confidence Level:** 92% based on 10,000+ successful applications`;
      confidence = 92;
    } else if (lower.includes('interview')) {
      content = `Here are effective interview preparation strategies:

**Common Questions to Prepare:**
1. "Tell me about yourself" - Prepare a 2-minute pitch
2. "What's your greatest strength?" - Tie to job requirements
3. "Describe a challenge you overcame" - Use STAR format

**Tips for Technical Roles:**
- Practice coding problems
- Review system design fundamentals
- Prepare 2-3 projects to discuss in depth

**Confidence Level:** 88% based on hiring manager feedback`;
    } else if (lower.includes('skill') || lower.includes('learn')) {
      content = `Based on your profile, here are recommended skills:

**High Priority:**
1. **System Design** - Essential for senior roles (+$15k salary)
2. **Cloud Architecture** - 85% of senior roles require this
3. **Leadership/Communication** - Critical for management

**Market Data:**
- System Design has 40% higher demand in 2024
- Cloud certifications show 25% salary premium

**Confidence Level:** 91%`;
    } else if (lower.includes('salary') || lower.includes('negotiate')) {
      content = `Here's your salary negotiation strategy:

**Market Data:**
- Current Market Rate: $125,000 - $165,000

**Negotiation Framework:**
1. **Research** - Gather 3-5 comparable offers
2. **Timing** - Best after achievements
3. **Anchoring** - Start 10% above target
4. **Value Proposition** - Document achievements with metrics

**Key Tips:**
- Never accept first offer immediately
- Consider total package (equity, bonuses, benefits)

**Confidence Level:** 87%`;
    } else {
      content = `I understand you're asking about "${userInput}". Let me help you with that.

Based on career best practices:

1. **Context Matters** - The best approach depends on your specific situation.
2. **Action Items** - Start with small, measurable steps.
3. **Resources** - Share more context for specific guidance.

**How can I help you further?**
- Resume review
- Interview preparation
- Career path planning
- Salary negotiation`;
    }

    return { id: Date.now().toString(), role: 'assistant', content, timestamp: new Date(), confidence };
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900 dark:text-white">AI Career Coach</h1>
              <p className="text-secondary-600 dark:text-secondary-400 text-sm">Your personal career advisor, available 24/7</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex gap-6 min-h-0">
          <div className="flex-1 flex flex-col bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6"><Bot className="w-10 h-10 text-white" /></div>
                  <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">Hello, {user?.name?.split(' ')[0] || 'there'}!</h2>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-8 max-w-md">I'm your AI Career Coach. I can help with resume reviews, interview prep, skill recommendations, and salary negotiation.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                    {suggestedPrompts.map((prompt, idx) => (
                      <button key={idx} onClick={() => handleSuggestedPrompt(prompt.text)} className="flex items-center p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors text-left">
                        <prompt.icon className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-secondary-700 dark:text-secondary-300">{prompt.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={cn('max-w-[80%] rounded-2xl p-4', msg.role === 'user' ? 'bg-primary-500 text-white' : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-900 dark:text-white')}>
                      <div className="flex items-center space-x-2 mb-2">{msg.role === 'assistant' ? <Bot className="w-4 h-4 text-primary-500" /> : <User className="w-4 h-4" />}<span className="text-xs opacity-70">{msg.role === 'assistant' ? 'Career Coach' : 'You'}</span></div>
                      <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">{msg.content}</div>
                      {msg.role === 'assistant' && msg.confidence && (
                        <div className="mt-3 pt-3 border-t border-secondary-200 dark:border-secondary-700 flex items-center justify-between">
                          <span className="text-xs text-secondary-500">Confidence: {msg.confidence}%</span>
                          <button onClick={() => handleCopy(msg.id, msg.content)} className="p-1 hover:bg-secondary-200 dark:hover:bg-secondary-700 rounded transition-colors">{copiedId === msg.id ? <Check className="w-4 h-4 text-success-500" /> : <Copy className="w-4 h-4 text-secondary-500" />}</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary-100 dark:bg-secondary-800 rounded-2xl p-4">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-primary-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-secondary-200 dark:border-secondary-800">
              <div className="flex items-end space-x-3">
                <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me anything about your career..." rows={1} className="flex-1 px-4 py-3 bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-xl resize-none focus:ring-2 focus:ring-primary-500" style={{ minHeight: '48px', maxHeight: '120px' }} />
                <button onClick={handleSend} disabled={!input.trim() || isTyping} className="p-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-50"><Send className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block w-72 space-y-4">
            <div className="bg-white dark:bg-secondary-900 rounded-xl border border-secondary-200 dark:border-secondary-800 p-4">
              <h3 className="font-semibold text-secondary-900 dark:text-white mb-4 flex items-center"><Lightbulb className="w-5 h-5 text-warning-500 mr-2" />What I Can Help With</h3>
              <div className="space-y-3">
                {[{ icon: FileText, title: 'Resume Enhancement' }, { icon: MessageSquare, title: 'Interview Prep' }, { icon: Target, title: 'Skill Development' }, { icon: TrendingUp, title: 'Salary Negotiation' }].map((cap, idx) => (
                  <div key={idx} className="p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 cursor-pointer" onClick={() => handleSuggestedPrompt(`Help me with ${cap.title.toLowerCase()}`)}>
                    <div className="flex items-center">
                      <cap.icon className="w-4 h-4 text-primary-500 mr-2" />
                      <span className="font-medium text-secondary-900 dark:text-white text-sm">{cap.title}</span>
                    </div>
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
