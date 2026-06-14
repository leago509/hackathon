import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, User } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, name: string, role: User['role']) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) fetchUserData(session.user.id);
      else setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) fetchUserData(session.user.id);
      else { setUser(null); setLoading(false); }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function fetchUserData(userId: string) {
    const { data } = await supabase.from('users').select('*').eq('id', userId).single();
    setUser(data || null);
    setLoading(false);
  }

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error || null };
  }

  async function signUp(email: string, password: string, name: string, role: User['role']) {
    const { data: { user: authUser }, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError || !authUser) return { error: authError || new Error('No user') };
    await supabase.from('users').insert({ id: authUser.id, email, name, role });
    return { error: null };
  }

  async function signOut() { await supabase.auth.signOut(); setUser(null); }

  return <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
