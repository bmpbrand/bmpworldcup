import styles from "./Progress.module.css";

export const Progress = ({
   percent,
   text,
}: {
   percent: number;
   text: string;
}) => {
   if (percent > 100) percent = 100;
   return (
      <div className={styles.wrap}>
         <div
            className={styles.progress}
            style={{ width: `${percent}%` }}
         ></div>
         <div className={styles.content}>
            <span>{text}</span>
         </div>
      </div>
   );
};
