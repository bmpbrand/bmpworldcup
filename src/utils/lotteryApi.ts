import { ethers } from "ethers";
import abi from "./lotteryAbi.json";
import { getSigner } from "./walletApi";

export const lotteryContractAddress = "0x964b904e0953B44be2A4ee0Fd560fc5E99bc6CC2";

export const loadContract = () => {
    const signer = getSigner();
    const contract = new ethers.Contract(lotteryContractAddress, abi as any, signer);

    return contract;
};

export const buyTicket = (
    guesses: any[],
    callback?: () => void
) => {
    const contract = loadContract();
    contract.buyTicket(guesses, {
        value: ethers.utils.parseEther("0.015"),
        gasLimit: 6000000,
    });
    contract.on("buyEvent", async () => {
        callback && callback();
    });
};

export const getLotteryStats = async () => {
    const contract = loadContract();
    const data = await contract.getLotteryStats();
    return data;
};

export const getUserStats = async (userAddress: string) => {
    const contract = loadContract();
    const data = await contract.getUserTickets(userAddress);
    return data;
};

export async function drawLottery() {
    const contract = loadContract();
    contract.drawRound();
}
