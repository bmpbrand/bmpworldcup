import styles from "./Input.module.css";
import { useEffect, useState } from "react";

interface IInputProps {
   onChange: (value: string) => void;
}

const Input = ({ onChange }: IInputProps) => {
   const [state, setState] = useState("");
   useEffect(() => {
      const timeoutRef = window.setTimeout(() => {
         onChange(state);
      }, 500);
      return () => clearTimeout(timeoutRef);
   }, [onChange, state]);
   return (
      <input
         className={styles.input}
         type="number"
         value={state}
         onChange={(e) => setState(e.target.value)}
         placeholder="0.1 BNB"
      />
   );
};

export default Input;
