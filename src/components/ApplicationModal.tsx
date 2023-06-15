import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  content: ReactNode;
};

export const ApplicationModal = (props: Props) => (
  <Modal isOpen={props.isOpen} onClose={props.onClose}>
    <ModalOverlay />
    <ModalContent width="initial">{props.content}</ModalContent>
  </Modal>
);
