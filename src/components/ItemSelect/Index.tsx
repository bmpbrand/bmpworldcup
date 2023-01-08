import * as React from "react";
import Images from "../../images";
import { Button } from "../Button/Button";
import styles from "./Index.module.css";

export interface ISelectItemProps {
   value: string;
   iconName: "england" | "france" | "argentina" | "belgium" | "brazil";
   description?: string;
   increase: () => void;
   decrease: () => void;
}

export const SelectItem: React.FC<ISelectItemProps> = ({
   value,
   iconName,
   description,
   increase,
   decrease,
}) => {
   return (
      <div className={styles.card}>
         <div className={styles.header}>
            <img src={Images[iconName]} alt={iconName} />
         </div>
         <div className={styles.content}>
            <div className={styles.value}>
               {/* <span className={styles.value}>{value}</span> */}
               <div className={styles.small}>{description}</div>
            </div>
            <div className={styles["multi-button"]}>
               <button
                  onClick={decrease}
                  className={`${styles.button} ${styles.minus}`}
               >
                  -
               </button>
               <button
                  onClick={increase}
                  className={`${styles.button} ${styles.plus}`}
               >
                  +
               </button>
            </div>
         </div>
      </div>
   );
};

export const ItemSelectList = ({
   submitHandler,
}: {
   submitHandler: (amount: string) => void;
}) => {
   const [milk, setMilk] = React.useState(0);
   const [cocoa, setCocoa] = React.useState(0);
   const [nut, setNut] = React.useState(0);
   const [soya, setSoya] = React.useState(0);
   return (
      <>
         <div className={`${styles["card-wrapper"]}`}>
            <SelectItem
               value={(milk / 10).toFixed(1)}
               iconName="england"
               description="0.3 bnb"
               increase={() => setMilk((m) => m + 3)}
               decrease={() => setMilk((m) => (m === 0 ? 0 : m - 3))}
            />
            <SelectItem
               value={(nut / 10).toFixed(1)}
               iconName="france"
               description="0.5 bnb"
               increase={() => setNut((m) => m + 5)}
               decrease={() => setNut((m) => (m === 0 ? 0 : m - 5))}
            />
            <SelectItem
               value={(soya / 10).toFixed(1)}
               iconName="argentina"
               description="1 bnb"
               increase={() => setSoya((m) => m + 10)}
               decrease={() => setSoya((m) => (m === 0 ? 0 : m - 10))}
            />

            <SelectItem
               value={(cocoa / 10).toFixed(1)}
               iconName="belgium"
               description="3 bnb"
               increase={() => setCocoa((m) => m + 30)}
               decrease={() => setCocoa((m) => (m === 0 ? 0 : m - 30))}
            />
            <SelectItem
               value={(cocoa / 10).toFixed(1)}
               iconName="brazil"
               description="5 bnb"
               increase={() => setCocoa((m) => m + 50)}
               decrease={() => setCocoa((m) => (m === 0 ? 0 : m - 50))}
            />
         </div>
         <div>
            <div className={styles.total}>
               {((milk + cocoa + soya + nut) / 10).toFixed(1)}{" "}
               <span className={styles.bnb}>BNB</span>
            </div>
            <div className={styles.tools}>
               <Button
                  onClick={() =>
                     submitHandler(
                        ((milk + cocoa + soya + nut) / 10).toFixed(2)
                     )
                  }
                  bgColor="green"
               >
                  Buy
               </Button>
            </div>
         </div>
      </>
   );
};
