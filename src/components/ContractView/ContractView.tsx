import * as React from "react";
import { useState } from "react";
import { calculateEggBuy } from "../../utils/contract";
import Label from "../Label/Label";
import styles from "./ContractView.module.css";

export interface IContractViewProps {
   totalInvestment: string;
   totalUsers: string;
   registered: boolean;
}

export const ContractView: React.FC<IContractViewProps> = (props) => {
   const [amount] = useState("");
   const [, setLabel] = useState("");

   React.useEffect(() => {
      async function run() {
         const val = await calculateEggBuy(amount);
         setLabel(val.div(1000000).toNumber());
      }
      if (amount && parseFloat(amount) > 0) run();
      else setLabel("");
   }, [amount]);

   return (
      <div className={`box ${styles.wrap}`}>
         {/* <li>{props.userMiners}</li> */}
         {/* <Label
            label="CONTRACT TREASURY BANK"
            value={props.totalInvestment}
            unit="BNB"
         /> */}
         {/* <Label label="Total Users" value={props.totalUsers} /> */}
         {/* <li>{props.userDividends}</li> */}
         {/* <li>{props.marketNewtella}</li>
            <li>{props.contractBalance}</li> */}
         {/* <div className={styles.links}>
            <a href="https://eu.jotform.com/app/bmpbrand/bmp-brand">
               <video autoPlay loop muted playsInline>
                  <source src="logobmp.mp4" type="video/mp4" />
               </video>
            </a>
            <a href="https://wadjetegyptianminer.com/?ref=0x46310b73BabDde141EB44AfBF538013B0F65F1dc">
               <video autoPlay loop muted playsInline>
                  <source src="logowadjet.mp4" type="video/mp4" />
               </video>
            </a>
            <a href="https://fandfbnb.com/?ref=0x46310b73BabDde141EB44AfBF538013B0F65F1dc">
               <video autoPlay loop muted playsInline>
                  <source src="logoff.mp4" type="video/mp4" />
               </video>
            </a>
            <a href="https://bnbminingpirates.com/?ref=0x46310b73BabDde141EB44AfBF538013B0F65F1dc">
               <video autoPlay loop muted playsInline>
                  <source src="logopirates.mp4" type="video/mp4" />
               </video>
            </a>
         </div> */}
      </div>
   );
};
