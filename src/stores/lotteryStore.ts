import create from "zustand";

export interface LotteryOverview {
    jackpot: string,
    roundId: string,
    totalTickets: string,
    roundStart: string,
    previousWinners: string[],
    previousJackpot: string
}

interface LotteryState {
    overview: LotteryOverview,
    setLotteryOverview: (data: LotteryOverview) => void
}

export const useLotteryStore = create<LotteryState>(set => ({
    overview: {
        jackpot: "",
        roundId: "",
        totalTickets: "",
        roundStart: "",
        previousWinners: [],
        previousJackpot: ""
    },
    setLotteryOverview: (data) => set(() => ({ overview: data }))
}));