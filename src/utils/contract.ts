import { ethers, utils } from "ethers";
import abi from "./api.json";
import { getSigner } from "./walletApi";

export const contractAddress = "0xF74273C6716Ce3CD13Eea88ab982bb2d4AaC6Aeb";

export const loadContract = () => {
   const signer = getSigner();
   const contract = new ethers.Contract(contractAddress, abi as any, signer);

   return contract;
};

export const hatchEggs = (callback?: () => void) => {
   const contract = loadContract();
   contract.hatchEggs();
   contract.on("hatchEvent", async () => {
      callback && callback();
   });
};

export const sellEggs = (callback?: () => void) => {
   const contract = loadContract();
   contract.sellEggs();
   callback &&
      contract.on("sellEvent", async () => {
         callback();
      });
};

export const buyEggs = (
   referrer: string,
   amount: string,
   callback?: () => void
) => {
   const contract = loadContract();
   contract.buyEggs(referrer, {
      value: ethers.utils.parseEther(amount),
      gasLimit: 6000000,
   });
   contract.on("buyEvent", async () => {
      callback && callback();
   });
};

export const getContractData = async (userAddress: string | null) => {
   const contract = loadContract();
   const data = await contract.getContractData(userAddress);
   return data;
};

export const calculateEggBuy = async (amount: string) => {
   const contract = loadContract();
   const data = await contract.calculateEggBuySimple(
      ethers.utils.parseEther(amount)
   );
   return data;
};

export const enableAutoCompound = (callback?: () => void) => {
   const contract = loadContract();
   contract.enableAutoCompounding({
      value: ethers.utils.parseEther("0.1"),
      gasLimit: 6000000,
   });
   contract.on("autoCompounderEnabled", async () => {
      callback && callback();
   });
};

export const disableAutoCompound = (callback?: () => void) => {
   const contract = loadContract();
   contract.disableAutoCompounding();
   callback &&
      contract.on("autoCompounderDisabled", async () => {
         callback();
      });
};

// export async function getNewbieEvents() {
//    // const bsc_jsonRPC_testnet = "https://data-seed-prebsc-1-s1.binance.org:8545/" // json RPC url
//    // const provider = new ethers.providers.JsonRpcProvider(bsc_jsonRPC_testnet) // provider for signing transaction
//    // const provider = new ethers.providers.Web3Provider((window as any).ethereum);
//    const contract = loadContract();
//    const filter = contract.filters.buyEvent();
//    console.log(await contract.queryFilter(filter, 24856033, 24856033 + 4000));
//    // return events;
// }

export async function getReferralLevels(userAddress: string) {
   const contract = loadContract();
   const levels = await contract.getUserLevels(userAddress);
   return levels.map((x: any) => x.toNumber());
}
