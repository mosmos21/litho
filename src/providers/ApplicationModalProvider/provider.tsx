import { ApplicationModalContext } from "@/providers/ApplicationModalProvider/context";
import { useApplicationModal } from "@/providers/ApplicationModalProvider/hooks";
import { ApplicationModal } from "@/components/ApplicationModal";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const ApplicationModalProvider = (props: Props) => {
  const { isOpen, content, openModal, closeModal, onCloseOverlay } =
    useApplicationModal();

  return (
    <ApplicationModalContext.Provider value={{ openModal, closeModal }}>
      <ApplicationModal
        isOpen={isOpen}
        content={content}
        onClose={onCloseOverlay}
      />
      {props.children}
    </ApplicationModalContext.Provider>
  );
};
