import {
  InternalContext,
  ApplicationModalContext,
} from "@/providers/ApplicationModalProvider/context";
import { useState, useCallback, ReactNode, useContext } from "react";

export const useApplicationModal = (): InternalContext => {
  const [modalState, setModalState] = useState<
    Pick<InternalContext, "isOpen" | "content" | "canCloseByOverlay">
  >({
    isOpen: false,
    content: undefined,
  });

  const openModal = useCallback(
    (content: ReactNode, canCloseByOverlay?: boolean) =>
      setModalState({
        isOpen: true,
        content,
        canCloseByOverlay,
      }),
    []
  );

  const closeModal = useCallback(
    () =>
      setModalState({
        isOpen: false,
        content: undefined,
        canCloseByOverlay: undefined,
      }),
    []
  );

  const onCloseOverlay = useCallback(() => {
    if (modalState.canCloseByOverlay !== false) {
      closeModal();
    }
  }, [modalState.canCloseByOverlay, closeModal]);

  return {
    ...modalState,
    openModal,
    closeModal,
    onCloseOverlay,
  };
};

export const useApplicationModalContext = () =>
  useContext(ApplicationModalContext);
