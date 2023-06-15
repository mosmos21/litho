import { ReactNode, useMemo } from "react";
import { getAppInstance } from "@/lib/firebase";
import { getDB } from "@/lib/firebase/database";
import { FirebaseContext } from "@/providers/FirebaseProvider/context";

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const app = useMemo(() => getAppInstance(), []);
  const db = useMemo(() => getDB(app), [app]);

  return (
    <FirebaseContext.Provider value={{ db }}>
      {children}
    </FirebaseContext.Provider>
  );
};
