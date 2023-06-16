import { createContext } from "react";
import { User } from "@firebase/auth";

type Context = {
  currentUser: User;
};

export const AuthContext = createContext<Context>({} as Context);
