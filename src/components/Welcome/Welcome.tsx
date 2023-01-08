import { Button } from "../Button/Button";
import styles from "./Welcome.module.css";

export function Welcome({ hide }: { hide: () => void }) {
   return (
      <div className={styles.welcome}>
         <h1>Welcome</h1>
         <Button onClick={hide}>Enter</Button>
      </div>
   );
}
