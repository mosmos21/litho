import { ReactNode } from "react";
import { AuthContext } from "@/providers/AuthProvider/context";
import { useAuth } from "@/providers/AuthProvider/hooks";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();

  return currentUser !== null ? (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  ) : null;
};
