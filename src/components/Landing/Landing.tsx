import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./Landing.module.css";

export const Landing = forwardRef<
   HTMLVideoElement,
   ComponentPropsWithoutRef<"video">
>((_, ref) => {
   return (
      <div className={styles.landing}>
         <video className={styles.video} loop autoPlay ref={ref}>
            <source src="newtella.mp4" type="video/mp4" />
         </video>
         <div className={styles.overlay}>
            <h1>
               <span className={styles.new}>new-</span>
               <span className={styles.tella}>tella</span>
            </h1>
            <h3>
               Make <span className={styles.new}>new-</span>{" "}
               <span className={styles.tella}>tella</span> with BNB
            </h3>
         </div>
      </div>
   );
});
