import styles from "./Dial.module.css";

export function Dial() {
    return <div className={styles.wrap}>
        <a href="https://t.me/ilprofessorelacasadicartaa" title="Contact">
            <video className={styles.video} autoPlay loop muted playsInline>
                <source src="dial.mp4" type="video/mp4" />
            </video>
        </a>
    </div>
}