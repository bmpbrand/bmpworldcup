import { ChangeEvent, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import Images from "../../../../images";
import { buyTicket } from "../../../../utils/lotteryApi";
import styles from "./LotterySelector.module.css";

type Teams = "brazil" | "argentina" | "portugal" | "japan" | "ghana" | "senegal"
    | "switzerland" | "spain" | "us" | "australia";
type Choice = "1" | "2" | "3";

function Game<T extends Teams>({ name, onSelect, country1, country2, selected }: {
    name: string,
    country1: T,
    country2: Exclude<Teams, T>,
    selected: Choice,
    onSelect: (e: ChangeEvent<HTMLInputElement>) => void
}) {
    return <div className={styles.game}>

        <div className={styles.group}>
            <label htmlFor={name + "1"}>
                <img src={Images[country1]} alt={country1} title={country1} />
            </label>
            <input type="radio" id={name + "1"} name={name} value="1" checked={selected === "1"} onChange={onSelect} />
        </div>
        <div className={styles.group}>
            <label htmlFor={name + "2"}>
            </label>
            <input type="radio" id={name + "2"} name={name} value="2" checked={selected === "2"} onChange={onSelect} />
        </div>

        <div className={styles.group}>
            <input type="radio" id={name + "3"} name={name} value="3" checked={selected === "3"} onChange={onSelect} />
            <label htmlFor={name + "3"}>
                <img src={Images[country2]} alt={country2} title={country2} />
            </label>
        </div>

    </div>
}

export function LotterySelector() {
    const [guesses, setGuesses] = useState<{
        game1: Choice,
        game2: Choice,
        game3: Choice,
        game4: Choice,
        game5: Choice,
    }>({
        game1: '2',
        game2: '2',
        game3: '2',
        game4: '2',
        game5: '2',
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setGuesses(g => ({ ...g, [name]: value }));
    }

    function handleBuy() {
        buyTicket(Object.values(guesses));
    }

    return <div className={styles.wrap}>
        <div className={styles.header}><span>1</span><span>X</span><span>2</span></div>
        <Game name="game1" selected={guesses.game1} country1="brazil" country2="argentina" onSelect={handleChange} />
        <Game name="game2" selected={guesses.game2} country1="portugal" country2="japan" onSelect={handleChange} />
        <Game name="game3" selected={guesses.game3} country1="ghana" country2="senegal" onSelect={handleChange} />
        <Game name="game4" selected={guesses.game4} country1="switzerland" country2="spain" onSelect={handleChange} />
        <Game name="game5" selected={guesses.game5} country1="us" country2="australia" onSelect={handleChange} />
        <div className={styles.buttonWrap}>
            <Button onClick={handleBuy} >Buy Ticket</Button>
        </div>
    </div>
}