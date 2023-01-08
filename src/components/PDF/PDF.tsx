import { Button } from "../Button/Button";
import styles from "./PDF.module.css";

export function PDF() {
   return (
      <div className={`box ${styles.wrap}`}>
         {/* <Button
            full
            target="_blank"
            rel="noreferrer"
            href="Resources/white_paper.pdf"
         >
            Whitepaper
         </Button>
         <Button
            full
            target="_blank"
            rel="noreferrer"
            href="Resources/white_paper.pdf"
         >
            Plan PDF
         </Button> */}
         <Button
            full
            href="https://docs.google.com/gview?embedded=true&url=https://bnbminingpirates.com/BnbMinersPirateBlockAudit.pdf"
         >
            Audit Report
         </Button>
      </div>
   );
}
