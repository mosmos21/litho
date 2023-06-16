import { useContext } from "react";
import { FirebaseContext } from "@/providers/FirebaseProvider/context";
import { useMemo } from "react";
import { getAppInstance } from "@/lib/firebase";
import { getDB } from "@/lib/firebase/database";
import { getAuthInstance } from "@/lib/firebase/auth";

export const useFirebase = () => {
  const app = useMemo(() => getAppInstance(), []);
  const db = useMemo(() => getDB(app), [app]);
  const auth = useMemo(() => getAuthInstance(app), [app]);

  return {
    db,
    auth
  }
}

export const useFirebaseContext = () => useContext(FirebaseContext);
