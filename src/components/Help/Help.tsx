import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import styles from "./Help.module.css";
import { ReactNode } from "react";

export function Help({
   showHelp,
   onClose,
   children,
}: {
   showHelp: boolean;
   onClose: () => void;
   children: ReactNode;
}) {
   return (
      <Modal open={showHelp} onClose={onClose} center>
         <div className={styles.wrap}>{children}</div>
      </Modal>
   );
}
