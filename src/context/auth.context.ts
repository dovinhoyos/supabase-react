import type {
  AuthError,
  AuthResponse,
  Session,
  User,
} from "@supabase/supabase-js";
import { createContext } from "react";

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  // signIn: (
  //   credentials: Credentials
  // ) => Promise<{ data: AuthResponse["data"] | null; error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  signUp: (
    credentials: Credentials
  ) => Promise<{ data: AuthResponse["data"] | null; error: AuthError | null }>;
}

export const AuthContext = createContext({} as AuthContextType);
