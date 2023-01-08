import * as React from "react";
import styles from "./Button.module.css";

type IButtonProps = {
   children?: React.ReactNode;
   bgColor?: "red" | "green";
   full?: true;
} & React.ComponentPropsWithoutRef<"button"> &
   React.ComponentPropsWithoutRef<"a">;

export const Button: React.FC<IButtonProps> = ({
   children,
   bgColor = "red",
   full,
   ...props
}) => {
   const s = full ? `${styles.button} ${styles.full}` : styles.button;
   if (props.href)
      return (
         <a className={s} {...props}>
            {children}
         </a>
      );
   return (
      <button className={s} type="button" {...props}>
         {children}
      </button>
   );
};
