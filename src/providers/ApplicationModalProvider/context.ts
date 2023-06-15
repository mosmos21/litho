import { createContext, ReactNode } from "react";

export type Context = {
  openModal: (content: ReactNode, canCloseByOverlay?: boolean) => void;
  closeModal: () => void;
};

export type InternalContext = Context & {
  isOpen: boolean;
  canCloseByOverlay?: boolean;
  content?: ReactNode;
  onCloseOverlay: () => void;
};

export const ApplicationModalContext = createContext<Context>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  openModal: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closeModal: () => {},
});
