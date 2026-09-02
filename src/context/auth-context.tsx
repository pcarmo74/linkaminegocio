"use client";

import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onIdTokenChanged, type User } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase/client";

export interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip Firebase auth if not configured (allows UI preview without env vars)
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    const unsubscribe = onIdTokenChanged(
      getFirebaseAuth(),
      async (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);

        try {
          if (firebaseUser) {
            const token = await firebaseUser.getIdToken();
            await fetch("/api/login", {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            });
          } else {
            await fetch("/api/logout", { method: "GET" });
          }
        } catch {
          // Ignore — the middleware session cookie will recover on next request.
        }
      },
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
