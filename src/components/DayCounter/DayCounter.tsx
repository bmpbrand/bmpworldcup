import { useEffect, useState } from 'react';
import images from '../../images';
import { timeParts } from '../../utils/time_util';
import styles from './DayCounter.module.css';

export const DayCounter = ({ start }: { start: number }) => {
    const [state, setState] = useState([0, 0, 0, 0]);
    useEffect(() => {
        var int = setInterval(() => {
            setState(timeParts(new Date().getTime() / 1000 - start));
        }, 1000);
        return () => clearInterval(int);
    }, [])
    return <div className={styles.wrap}>
        <h1 className={styles.headline}>BMP BRAND START</h1>
        <a href="https://eu.jotform.com/app/bmpbrand/bmp-brand"><video autoPlay loop muted playsInline>
            <source src="logobmp.mp4" type="video/mp4" />
        </video></a>
        <ul>
            <li><span className={styles.day}>{state[0]}</span>days</li>
            <li><span className={styles.hour}>{state[1]}</span>Hours</li>
            <li><span className={styles.minute}>{state[2]}</span>Minutes</li>
            <li><span className={styles.second}>{state[3]}</span>Seconds</li>
        </ul>
    </div>
}