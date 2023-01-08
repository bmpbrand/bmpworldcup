import create from "zustand";

export interface UserStats {
    miners: string,
    eggs: string,
    dividends: string,
    refIncome: string,
    imvestment: string,
    withdrawal: string,
    lastHatch: string,
    tvl: string,
    checkpoint: string,
    hatches: string
}

interface UserStatsState {
    userStats: UserStats,
    setUserStats: (stats: UserStats) => void
}

export const useUserStatsStore = create<UserStatsState>(set => ({
    userStats: {
        miners: "",
        eggs: "",
        dividends: "",
        refIncome: "",
        imvestment: "",
        withdrawal: "",
        lastHatch: "",
        tvl: "",
        checkpoint: "",
        hatches: ""
    },
    setUserStats: (stats) => set(() => ({ userStats: stats }))
}));