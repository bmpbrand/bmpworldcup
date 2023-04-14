import {
   disableAutoCompound,
   enableAutoCompound,
   hatchEggs,
   sellEggs,
} from "../../utils/contract";
import { DAY, days, now } from "../../utils/time_util";
import { Button } from "../Button/Button";
import { CycleIndicator } from "../CycleIndicator/CycleIndicator";
import Label from "../Label/Label";
import { Timer } from "../Timer/Timer";
import styles from "./UserView.module.css";

function cycleStart(checkpoint: number) {
   return checkpoint + Math.floor((now() - checkpoint) / (14 * DAY)) * 14 * DAY;
}

function withdrawalAllowed(
   distance: number,
   hatchery: number,
   autoCompound: boolean,
   autoCompoundTime: number,
   checkpoint: number
) {
   var d = days(distance);
   if (autoCompound) return false;
   if (d >= 13 && d % 14 === 13) {
      if (autoCompoundTime >= cycleStart(checkpoint)) return true;
      return (hatchery & (2 ** 13 - 1)) === 2 ** 13 - 1;
   }
   return false;
}

export interface IUserViewProps {
   miners: string;
   eggs: string;
   tvl: string;
   eggsBNB: string;
   invested: string;
   withdrawal: string;
   checkpoint: string;
   hatchery: string;
   lastHatch: string;
   autoCompound: boolean;
   autoCompoundTime: number;
}

export const UserView = ({
   miners,
   eggs,
   eggsBNB,
   tvl,
   withdrawal,
   invested,
   checkpoint,
   hatchery,
   lastHatch,
   autoCompound,
   autoCompoundTime,
}: IUserViewProps) => {
   function handleDisable() {
      disableAutoCompound();
   }

   function handleEnable() {
      enableAutoCompound();
   }
   return (
      <div className={`${styles["card-wrapper"]}`}>
         <div className={styles.labels}>
            <Label label="TEAM POWER" value={miners} />
            <Label label="CUPS" value={eggsBNB} unit="BNB" />
            {/* <Label label="TVL" value={tvl} unit="BNB" /> */}
            <Label label="Withdrawn" value={withdrawal} />
         </div>
         {/* <Label label="Total Invested" value={invested} /> */}
         {/* <div className={styles.total}>{grogBNB}</div> */}
         <div className={styles.autoReinvest}>
            <h1>
               Auto-Compound{" "}
               {autoCompound
                  ? +lastHatch + 13 * DAY < now()
                     ? "EXPIRED"
                     : "ENABLED"
                  : "DISABLED"}
            </h1>
            {autoCompound && +lastHatch + 13 * DAY > now() && (
               <Timer origin={+lastHatch + 13 * DAY} />
            )}
            {autoCompound ? (
               <Button onClick={handleDisable}>Disable</Button>
            ) : (
               <Button onClick={handleEnable}>ENABLE</Button>
            )}
            {autoCompound &&
               Math.floor((now() - +checkpoint) / DAY) % 14 === 12 && (
                  <div className={styles.danger}>
                     If you want to <b>WITHDRAW</b> tomorrow, disable
                     auto-compound. The sooner you disable the more dividens you
                     can withdraw.
                  </div>
               )}
         </div>
         {+invested > 0 && (
            <div>
               {+invested > 0 && (
                  <CycleIndicator
                     checkpoint={parseInt(checkpoint)}
                     hatches={parseInt(hatchery)}
                     autoCompount={autoCompound}
                     lastHatch={+lastHatch}
                  />
               )}
               <div className={styles.tools}>
                  {withdrawalAllowed(
                     new Date().getTime() / 1000 - parseInt(checkpoint),
                     parseInt(hatchery),
                     autoCompound,
                     autoCompoundTime,
                     +checkpoint
                  ) ? (
                     <Button onClick={() => sellEggs()} bgColor="green">
                        GOAL
                     </Button>
                  ) : null}
                  {!autoCompound && (
                     <Button
                        onClick={() => {
                           hatchEggs();
                        }}
                        bgColor="red"
                     >
                        WORKOUT
                     </Button>
                  )}
               </div>
            </div>
         )}
      </div>
   );
};
