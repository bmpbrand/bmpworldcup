import { useEffect, useState } from "react";
import { now, timeParts } from "../utils/time_util";

export function useTimer(origin: number) {
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const int = setInterval(() => {
            if (origin) {
                setDistance(Math.abs(now() - origin));
            }
        }, 1000);
        return () => clearInterval(int);
    }, [origin]);

    return timeParts(distance);
}