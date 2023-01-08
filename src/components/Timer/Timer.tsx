import { useTimer } from "../../hooks/useTimer";
import styles from "./Timer.module.css";

export function Timer({ origin }: { origin: number }) {
   const [days, hours, mins, secs] = useTimer(origin);
   return (
      <div className={styles.wrap}>
         <div className={styles.daysWrap}>
            <span>{days < 0 ? "0" : days}</span>
            <span className={styles.label}>DAYS</span>
         </div>
         <div className={styles.hoursWrap}>
            {hours < 0 ? "0" : hours}
            <span className={styles.label}>HOURS</span>
         </div>
         <div className={styles.minsWrap}>
            {mins < 0 ? "0" : mins}
            <span className={styles.label}>MINS</span>
         </div>
         <div className={styles.secsWrap}>
            {secs < 0 ? "0" : secs}
            <span className={styles.label}>SECS</span>
         </div>
      </div>
   );
}
