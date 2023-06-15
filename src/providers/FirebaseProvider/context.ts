import { createContext } from "react";
import { DB } from "@/lib/firebase/database";

export type Context = {
  db: DB;
};

export const FirebaseContext = createContext<Context>({} as Context);
