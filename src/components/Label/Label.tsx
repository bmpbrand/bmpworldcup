import styles from "./Label.module.css";

const Label = ({
   label,
   value,
   unit,
}: {
   label: string;
   value: string;
   unit?: string;
}) => {
   return (
      <div className={styles.wrap}>
         <div className={styles.label}>{label}</div>
         <div className={`${styles.value} number`}>
            {value} {unit}
         </div>
      </div>
   );
};

export default Label;
