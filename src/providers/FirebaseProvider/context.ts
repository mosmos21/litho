import { createContext } from "react";
import { DB } from "@/lib/firebase/database";
import { AuthInstance } from "@/lib/firebase/auth";

export type Context = {
  db: DB;
  auth: AuthInstance
};

export const FirebaseContext = createContext<Context>({} as Context);
