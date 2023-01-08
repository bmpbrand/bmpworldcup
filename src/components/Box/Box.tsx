import { CSSProperties, ReactNode } from "react";
import styles from "./Box.module.css";

interface BoxProps {
   children: ReactNode;
   style?: CSSProperties;
   gradient?: boolean;
   header?: string;
}

const Box = ({ children, header, style, gradient }: BoxProps) => {
   return (
      <div
         className={`${styles.box} ${gradient ? styles.gradient : ""}`}
         style={style}
      >
         {header && <div className={styles.header}>{header}</div>}
         {children}
      </div>
   );
};

export default Box;
