import { useWeb3React } from "@web3-react/core";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import Label from "../../../../components/Label/Label";
import { Timer } from "../../../../components/Timer/Timer";
import { LotteryOverview } from "../../../../stores/lotteryStore";
import { drawLottery, getLotteryStats, getUserStats } from "../../../../utils/lotteryApi";
import { DAY, now } from "../../../../utils/time_util";
import { LotterySelector } from "../LotterySelector/LotterySelector";
import styles from "./Lottery.module.css";
const equal = require('deep-equal');

function reducer(state: LotteryOverview, newState: LotteryOverview) {
    if (equal(state, newState)) return state;
    return newState;
}

export function Lottery() {
    const [lotteryStats, setLotteryStats] = useState({} as LotteryOverview)
    const [userTickets, setUserTickets] = useState('0');

    const { active, account } = useWeb3React();

    useEffect(() => {
        const int = setInterval(async () => {
            const data = await getLotteryStats();
            const dataPure: LotteryOverview = {
                jackpot: formatEther(data.jackpot),
                roundId: data.roundId.toNumber(),
                totalTickets: data.tickets.toNumber(),
                roundStart: data.start.toNumber(),
                previousJackpot: formatEther(data.prevJackpot),
                previousWinners: data.prevWinners
            }
            setLotteryStats(s => reducer(s, dataPure));
        }, 2000);
        return () => clearInterval(int);
    }, []);

    useEffect(() => {
        const int = setInterval(async () => {
            if (!account) return;
            const data = await getUserStats(account);
            setUserTickets(data.toNumber());
        }, 2000);
        return () => clearInterval(int);
    }, [account]);

    function handleLotteryDraw() {
        drawLottery();
    }

    return <div className={styles.wrap}>
        <div className={styles.labels}>
            <Label value={lotteryStats.roundId} label="Round ID" />
            <Label value={lotteryStats.jackpot} label="Jackpot" />
            <Label value={lotteryStats.totalTickets} label="Tickets" />
            {/* <Label value={lotteryStats.previousWinners} label="Previous Winner" /> */}
            <Label value={lotteryStats.previousJackpot} label="Last Prize" />
            <Label value={userTickets} label="Your Tickets" />
        </div>
        <h1 className="center">Round Ends In </h1>
        {+lotteryStats.roundStart + (7 * DAY) < now() ? <h1 className="center">Start New Round</h1> :
            <Timer origin={+lotteryStats.roundStart + (7 * DAY)} />
        }
        {
            +lotteryStats.roundStart + (7 * DAY) < now() && <Button onClick={handleLotteryDraw}>DRAW LOTTERY</Button>
        }
        <div>
            <LotterySelector />
        </div>
        <div>
            {
                lotteryStats.previousWinners &&
                    lotteryStats.previousWinners.length > 0
                    ? <div>
                        <h1 className="center">Last Winners</h1>
                        <ul>
                            {
                                lotteryStats.previousWinners.map(x => <li key={x}>{x}</li>)
                            }
                        </ul>
                    </div>
                    : <h1 className="center">No Winners Yet</h1>
            }
        </div>
    </div>;
}