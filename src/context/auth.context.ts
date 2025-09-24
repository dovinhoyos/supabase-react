import type { Session, User } from "@supabase/supabase-js";
import { createContext } from "react";

export type AuthStatus = "authenticated" | "checking" | "not-authenticated";

interface AuthContextType {
  authStatus: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;
  session: Session | null
}

export const AuthContext = createContext({} as AuthContextType);
