import { Progress } from "../Progress/Progress";
import glass from "../../assets/glass.png";
import styles from "./GlassView.module.css";

function timeString(distance: number) {
   // var days = Math.floor(distance / (60 * 60 * 24));
   var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
   var minutes = Math.floor((distance % (60 * 60)) / 60);
   var seconds = Math.floor(distance % 60);

   return hours + "h " + minutes + "m " + seconds + "s ";
}

const GlassView = ({
   checkpoint,
   grogBNB,
}: {
   checkpoint: number;
   grogBNB: string;
}) => {
   const distance = new Date().getTime() / 1000 - checkpoint;
   const percent = (distance / 86400) * 100;
   if (checkpoint === 0) {
      return <Progress percent={0} text={"No Grog Generated"} />;
   }
   return (
      <div className={styles.wrap}>
         <div className={styles.header}>
            <img src={glass} alt="glass" />
            <b>BNB In Glass</b>
            <img src={glass} alt="glass" />
         </div>
         <Progress
            percent={percent}
            text={
               grogBNB +
               " (" +
               (percent < 100
                  ? timeString(86400 - distance) + " till full"
                  : "!!! Glass is full !!!") +
               ")"
            }
         />
      </div>
   );
};

export default GlassView;
