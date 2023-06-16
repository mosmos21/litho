import { useFirebaseContext } from "@/providers/FirebaseProvider";
import { useState, useContext, useEffect } from "react";
import { User } from "@firebase/auth";
import { AuthContext } from "@/providers/AuthProvider/context";

export const useAuth = () => {
  const { auth } = useFirebaseContext();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
    auth.setBrowserSessionPersistence().then(auth.signInAnonymously);
  }, [auth]);

  return {
    currentUser,
  };
};

export const useAuthContext = () => useContext(AuthContext);
