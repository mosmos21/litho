import { Auth, User, getAuth, connectAuthEmulator, signInAnonymously, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import { FirebaseApp } from "firebase/app";

const _setBrowserSessionPersistence = (auth: Auth) => () => setPersistence(auth, browserSessionPersistence);
const _signInAnonymously = (auth: Auth) => () => signInAnonymously(auth);

const _onAuthStateChanged = (auth: Auth) => (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback);

const getProductionAuth = (app: FirebaseApp) => getAuth(app);

const getDevelopmentAuth = () => {
  const auth = getAuth();
  connectAuthEmulator(auth, "http://localhost:3004", {
    disableWarnings: true
  });

  return auth;
}

export const getAuthInstance = (app: FirebaseApp) => {
  const auth = import.meta.env.MODE === "production" ? getProductionAuth(app) : getDevelopmentAuth();

  return {
    setBrowserSessionPersistence: _setBrowserSessionPersistence(auth),
    signInAnonymously: _signInAnonymously(auth),
    onAuthStateChanged: _onAuthStateChanged(auth),
  }
}

export type AuthInstance = ReturnType<typeof getAuthInstance>;
