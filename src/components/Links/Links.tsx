/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./Links.module.css";
import Images from "../../images";
import { contractAddress } from "../../utils/contract";

const Links = () => {
   // const [showHelp, setShowHelp] = useState(false);

   return (
      <div className={styles.wrap}>
         <a
            href={`https://www.bscscan.com/address/${contractAddress}`}
            className={styles.btn}
            target="_blank"
            rel="noreferrer"
         >
            <img src={Images.bsc} alt="bsc" />
            <div>BSC</div>
         </a>
         {/* <a href="https://linktr.ee/" className={styles.btn}>
            <img src={Images.linktee} alt="social links" />
            <div>LINK TREE</div>
         </a> */}
         <a href="https://t.me/BMPBrandDDB" className={styles.btn}>
            <img src={Images.tel} alt="Global" />
            <div>Official Channel</div>
         </a>
         <a
            href="https://docs.google.com/gview?embedded=true&url=https://bmpworldcup.com/app/whitepaper.pdf"
            className={styles.btn}
         >
            <img src={Images.logo} alt="pdf" />
            <div>PDF</div>
         </a>
         {/*<a
            href="https://telegram.me/officialpiratesitaly"
            className={styles.btn}
         >
            <img src={Images.tel} alt="Italy" />
            <div>ITALY</div>
         </a> */}
         {/* <a className={styles.btn} onClick={() => setShowHelp(true)} href="#">
            <img src={Images.help} alt="help" />
         </a>
         <Help showHelp={showHelp} onClose={() => setShowHelp(false)} /> */}
      </div>
   );
};

export default Links;
