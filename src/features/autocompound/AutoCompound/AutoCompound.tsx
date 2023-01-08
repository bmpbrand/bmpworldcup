import { DAY } from "../../../utils/time_util";
import styles from "./AutoCompound.module.css";

interface AutoCompoundState {
    dividends: string,
    lastHatch: string
}

function getList(dividends: number, lastHatch: number): string[] {
    const now = new Date().getTime() / 1000;
    const days = Math.floor((now - lastHatch) / DAY);
    const divPerDay = dividends / days;
    let dayDividends: string[] = [];
    let d = 0;
    for (let i = 0; i < 6; i++) {
        d += DAY;
        if (d > now) {
            dayDividends.push("0");
        } else {
            dayDividends.push(divPerDay.toFixed());
        }
    }
    return dayDividends;
}

export function AutoCompound({ dividends, lastHatch }: AutoCompoundState) {
    return <div>
        {getList(parseInt(dividends), parseInt(lastHatch)).map(l =>
            <div className={styles.day}>{
                l === "0" ? null : l
            }</div>
        )}
    </div>;
}