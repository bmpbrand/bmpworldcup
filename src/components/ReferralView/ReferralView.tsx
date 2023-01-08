import styles from "./ReferralView.module.css";
import { Button } from "../Button/Button";
import copy from "copy-to-clipboard";
import { useWeb3React } from "@web3-react/core";
import Label from "../Label/Label";
import Box from "../Box/Box";
import { useEffect, useState } from "react";
import { getReferralLevels } from "../../utils/contract";

const baseUrl = "https://bmpworldcup.com/app";

export const ReferralView = ({
   refBonus,
}: {
   refBonus: string;
   totalInvestment: string;
}) => {
   const { account } = useWeb3React();
   const [levels, setLevels] = useState([] as number[])
   function handleClick() {
      if (account) {
         copy(`${baseUrl}?ref=${account}`);
         alert("Your link copied successfully");
      }
   }

   useEffect(() => {
      const int = setInterval(async () => {
         if (!account) return;
         const newLevels = await getReferralLevels(account);
         setLevels(newLevels);
      }, 2000);
      return () => clearInterval(int);
   }, [account]);

   return (
      <>
         <div className={styles.labels}>
            <Label label="REFERRAL POWER" value={refBonus} />
         </div>
         <Box header="REFERRAL">
            <p>
               There are 15 levels of referral bonus. 10%, 3%, 1%, 1%, 1%, 0.5%, 0.5%, 0.5%, 0.5%, 0.5%,
               0.3%, 0.3%, 0.3%, 0.3%, 0.3%. The referral
               bonus will paid as CUP on new deposits.
            </p>

            <div className={styles.tools}>
               <Button bgColor="red" onClick={handleClick}>
                  Copy My Link
               </Button>
            </div>
            <h1 className="center">Referral Details</h1>
            <div className={styles.levelsWrap}>
               {
                  levels.map((x, i) => {
                     return <div key={i} className={styles.level}>
                        <span className={styles.value}>{x}</span>
                        <span className={styles.label}>Level {i + 1}</span>
                     </div>
                  })
               }
            </div>
         </Box>

      </>

   );
};
