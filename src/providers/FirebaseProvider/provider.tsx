import { ReactNode } from "react";
import { FirebaseContext } from "@/providers/FirebaseProvider/context";
import { useFirebase } from "@/providers/FirebaseProvider/hooks.ts";

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const firebase = useFirebase();

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};
