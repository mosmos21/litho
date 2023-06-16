import { createContext } from "react";
import { DatabaseInstance, AuthInstance } from "@/lib/firebase";

export type Context = {
  db: DatabaseInstance;
  auth: AuthInstance;
};

export const FirebaseContext = createContext<Context>({} as Context);
