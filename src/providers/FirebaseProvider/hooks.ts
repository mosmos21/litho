import { useContext } from "react";
import { FirebaseContext } from "@/providers/FirebaseProvider/context";

export const useFirebaseContext = () => useContext(FirebaseContext);
