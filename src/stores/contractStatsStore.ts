import create from "zustand";

export interface ContractStats {
    balance: string,
    registeredUsers: string,
    totalInvestment: string,
    totalWithdrawal: string,
    marketEggs: string
}

export interface ContractStatsState {
    contractStats: ContractStats,
    setContractData: (stats: ContractStats) => void
}

export const useContractStatsStore = create<ContractStatsState>((set) => ({
    contractStats: {
        balance: "",
        registeredUsers: "",
        totalInvestment: "",
        totalWithdrawal: "",
        marketEggs: ""
    },
    setContractData: (stats) => set(() => ({ contractStats: stats }))
}));