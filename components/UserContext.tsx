import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services/supabase'; // Updated path
import { Session, User } from '@supabase/supabase-js';

interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  date_of_birth?: string;
}

interface UserContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchProfile = async (userId?: string) => {
      const id = userId || user?.id;
      if (id) {
        try {
            const { data, error, status } = await supabase
                .from('profiles')
                .select(`*`)
                .eq('id', id)
                .single();
            if (error && status !== 406) throw error;
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
      }
  }

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
      } catch (error) { 
        console.error('Error in initial session fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (_event === 'SIGNED_IN' && session?.user) {
        await fetchProfile(session.user.id);
      } else if (_event === 'SIGNED_OUT') {
        setProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    profile,
    loading,
    fetchProfile: () => fetchProfile(),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
