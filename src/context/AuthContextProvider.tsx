import { useEffect, useState, type PropsWithChildren } from "react";
import { AuthContext, type AuthStatus } from "./auth.context";
import { supabase } from "../supabase/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const getInitialSession = () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        console.log(authStatus)
        setSession(null);
        setUser(null);
        setAuthStatus("not-authenticated");
        return;
      }
      console.log(authStatus)
      
      setSession(session);
      setUser(session?.user || null);
      setAuthStatus("authenticated");
    });
  };

  useEffect(() => {
    getInitialSession();
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setSession(null);
          setUser(null);
          setAuthStatus("not-authenticated");
          return;
        }

        setSession(session);
        setUser(session?.user || null);
        setAuthStatus("authenticated");
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext
      value={{
        session,
        user,
        authStatus,
        isAuthenticated: authStatus === "authenticated",
      }}
    >
      {children}
    </AuthContext>
  );
};
