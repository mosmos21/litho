import { useContext } from "react";
import { FirebaseContext } from "@/providers/FirebaseProvider/context";
import { useMemo } from "react";
import {
  getAppInstance,
  getDatabaseInstance,
  getAuthInstance,
} from "@/lib/firebase";

export const useFirebase = () => {
  const app = useMemo(() => getAppInstance(), []);
  const db = useMemo(() => getDatabaseInstance(app), [app]);
  const auth = useMemo(() => getAuthInstance(app), [app]);

  return {
    db,
    auth,
  };
};

export const useFirebaseContext = () => useContext(FirebaseContext);
