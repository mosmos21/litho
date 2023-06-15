import { useEffect } from "react";
import { Game } from "@/lib/firebase/schema";
import { useApplicationModalContext } from "@/providers/ApplicationModalProvider";
import { WaitingModalContent } from "@/components/WaitingModalContent";

export const useWatchGameStatusChange = (status: Game["status"]) => {
  const { openModal, closeModal } = useApplicationModalContext();

  useEffect(() => {
    switch (status) {
      case "waiting":
        openModal(<WaitingModalContent />, false);
        break;
      case "ongoing":
        closeModal();
        break;
      default:
        break;
    }
  }, [status, openModal, closeModal]);
};
