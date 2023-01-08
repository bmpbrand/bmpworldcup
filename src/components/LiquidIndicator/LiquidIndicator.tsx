import styles from "./LiquidIndicator.module.css";

// var animatePercentChange = function animatePercentChange(
//    newPercent: number,
//    elem
// ) {
//    elem = elem || $(".fu-percent span");
//    const val = parseInt(elem.text(), 10);

//    if (val !== parseInt(newPercent, 10)) {
//       let diff = newPercent < val ? -1 : 1;
//       elem.text(val + diff);
//       setTimeout(animatePercentChange.bind(null, newPercent, elem), 50);
//    }
// };

// $(".fu-progress").on("click", function () {
//    const amount = Math.ceil(Math.random() * 100);
//    const currentPercent = $(".fu-percent span").text();
//    const waterAnimSpeed = (Math.abs(currentPercent - amount) / 50) * 10;
//    const waterPercent = 100 - amount;
//    animatePercentChange(amount);
//    $(".water").css({
//       top: waterPercent + "%",
//    });
// });

export const LiquidIndicator = ({
   percent,
   disabled,
}: {
   percent: number;
   disabled: boolean;
}) => {
   return (
      <div className={styles["fu-progress"]}>
         <div className={styles["fu-inner"]}>
            <div className={`${styles["fu-percent"]} ${styles.percent}`}>
               <span>
                  {!disabled && (percent > 100 ? 100 : percent).toFixed(0)}
               </span>
               %
            </div>
            <div
               className={styles.water}
               style={{ top: 100 - percent < 0 ? 0 : 100 - percent + "%" }}
            ></div>
            <div className={styles.glare}></div>
         </div>
      </div>
   );
};
