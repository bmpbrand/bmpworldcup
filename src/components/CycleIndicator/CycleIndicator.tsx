import { useEffect, useState } from "react";
import Images from "../../images";
import { dailyTimeString, DAY, now } from "../../utils/time_util";
import styles from "./CycleIndicator.module.css";

function cycleDay(checkpoint: number) {
   return Math.floor(((now() - checkpoint) / DAY) % 14);
}
function dayStatus(day: number, checkpoint: number, hatches: number, autoCompound: boolean, lastHatch: number) {
   if (day > cycleDay(checkpoint)) return "upcoming";
   return day === cycleDay(checkpoint) && ((2 ** day) & hatches) !== 2 ** day
      ? "current"
      : ((2 ** day) & hatches) === 2 ** day
         ? "done"
         : "failed";
}
export function CycleIndicator({
   hatches,
   checkpoint,
   autoCompount,
   lastHatch
}: {
   hatches: number;
   checkpoint: number;
   autoCompount: boolean;
   lastHatch: number
}) {
   const [state, setState] = useState([...Array(13)]);

   useEffect(() => {
      const int = setInterval(() => {
         setState([...Array(13)]);
      }, 1000);
      return () => clearInterval(int);
   }, []);

   return (
      <div>
         <ul className={styles.wrap}>
            {state.map((_, i) => (
               <i
                  key={i}
                  className={`${styles.circle} ${styles["circle-" + (i + 1)]} ${dayStatus(i, checkpoint, hatches, autoCompount, lastHatch) === "failed"
                     ? styles.failed
                     : dayStatus(i, checkpoint, hatches, autoCompount, lastHatch) === "current"
                        ? styles.active
                        : dayStatus(i, checkpoint, hatches, autoCompount, lastHatch) === "done"
                           ? styles.done
                           : null
                     }`}
               ></i>
            ))}
            {
               cycleDay(checkpoint) === 13 && <img className={styles.logo} src={Images.logo} alt="BMP" />
            }<div className={styles.timer}>{dailyTimeString(
               DAY - ((now() - checkpoint) % DAY)
            )}</div>
            {/* <i
               key={13}
               className={`${styles.active} ${styles.circle} ${
                  styles[`circle-14`]
               }`}
            >
               {cycleDay(checkpoint) < 13 ? "waiting" : "timer"}
            </i> */}
         </ul>
      </div>
   );
}
