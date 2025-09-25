import { useEffect, useState, type PropsWithChildren } from "react";
import { supabase } from "../supabase/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";
import { AuthContext } from "./auth.context";
import { useNavigate } from "react-router";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const Navigate = useNavigate()

  const getInitialSession = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    setSession(session);
    setUser(session?.user ?? null);
  };

  useEffect(() => {
    getInitialSession();
  }, []);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext
      value={{
        session,
        user,
        // signIn: async (credentials) =>
        //   await supabase.auth.signInWithPassword(credentials),
        signUp: async (credentials) =>
          await supabase.auth.signUp({
            ...credentials,
            options: { emailRedirectTo: "http://localhost:5173/account" },
          }),
        signOut: async () => {
          Navigate('/')
          return await supabase.auth.signOut();
        },
      }}
    >
      {children}
    </AuthContext>
  );
};
