import styles from "./Header.module.css";
import { Button } from "../Button/Button";
import { contractAddress } from "../../utils/contract";
import Images from "../../images";

export function Header() {
   return (
      <div className={styles.wrap}>
         <div className={styles.logo}>
            <img src={Images.logo} alt="BMP" />
         </div>
         <div className={styles.info}>
            <div>WORLD CUP</div>
            <span className={styles.subTitle}>
               with
            </span><span className={styles["bg-red"]}>BMP</span>
            <div className={styles.buttons}>
               <Button href="https://docs.google.com/gview?embedded=true&url=https://bmpworldcup.com/app/audit.pdf">
                  Audit
               </Button>
               <Button
                  href={`https://www.bscscan.com/address/${contractAddress}`}
               >
                  BSC
               </Button>
            </div>
         </div>
      </div>
   );
}
