import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { UserView } from "./components/UserView/UserView";
import { ReferralView } from "./components/ReferralView/ReferralView";
import { injected } from "./utils/connector";
import { buyEggs, getContractData } from "./utils/contract";
import Box from "./components/Box/Box";
import Links from "./components/Links/Links";
import { Button } from "./components/Button/Button";
import { Help } from "./components/Help/Help";
import { getRef } from "./utils/env";
import { ItemSelectList } from "./components/ItemSelect/Index";
import { DAY, now } from "./utils/time_util";
import { Lottery } from "./features/lottery/components/LotteryHome/Lottery";
import { DayCounter } from "./components/DayCounter/DayCounter";
import Images from "./images";

function handleBuy(amount: string) {
   if (!getRef()) {
      alert("Please use an invitation link");
      return;
   }
   buyEggs(getRef(), amount, () => {});
}

function App() {
   const { active, account, activate } = useWeb3React();
   const [tradingModal, setTradingModal] = useState(false);
   const [stats, setStats] = useState({
      userMiners: "---",
      userEggs: "---",
      userEggsBnb: "---",
      userInvestment: "---",
      userWithdrawal: "---",
      userLastHatch: "0",
      refBonus: "---",
      totalInvestment: "---",
      totalUsers: "---",
      userTVL: "---",
      contractBalance: "---",
      checkpoint: "0",
      hatchery: "0",
      userAutoCompound: "0",
      userAutoCompoundTime: "0",
   });
   // const [count, setCount] = useState("0");
   const [showModal, setShowModal] = useState(false);
   // const audioRef = createRef<HTMLAudioElement>();
   const [showWelcome, setShowWelcome] = useState(true);

   function getHatchery(
      hatches: number,
      checkpoint: number,
      autoCompound: boolean,
      lastHatch: number
   ) {
      if (autoCompound) return hatches;
      const cycleStart =
         checkpoint +
         Math.floor((now() - checkpoint) / (DAY * 14)) * (14 * DAY);
      if (lastHatch < cycleStart) return BigNumber.from("0");
      return hatches;
   }

   const loadData = useCallback(
      async function loadData() {
         if (account) {
            const data = await getContractData(account);
            setStats({
               userMiners: data[0].toNumber().toFixed(1),
               userEggs: data[1].div(10000000).toNumber().toFixed(1),
               userEggsBnb: ethers.utils.formatEther(data[2]).substring(0, 5),
               userInvestment: ethers.utils
                  .formatEther(data[5])
                  .substring(0, 5),
               userWithdrawal: ethers.utils
                  .formatEther(data[6])
                  .substring(0, 5),
               userLastHatch: data[7].toNumber(),
               // userDividends: data[2].toString(),
               refBonus: data[4].div(10000000).toNumber().toFixed(1),
               contractBalance: ethers.utils
                  .formatEther(data[8])
                  .substring(0, 5),
               // marketNewtella: data[4].toString(),
               totalInvestment: ethers.utils
                  .formatEther(data[11])
                  .substring(0, 5),
               totalUsers: data[10].toNumber(),
               userTVL: ethers.utils.formatEther(data[12]).substring(0, 5),
               checkpoint: data[13].toNumber(),
               hatchery: getHatchery(
                  data[14].toNumber(),
                  data[13].toNumber(),
                  data[15].toNumber(),
                  data[7].toNumber()
               ).toString(),
               userAutoCompound: data[15].toNumber(),
               userAutoCompoundTime: data[16].toNumber(),
            });
         }
      },
      [account]
   );

   useEffect(() => {
      activate(injected);
      if (active) {
         loadData();
      }
   }, [activate, active, loadData]);

   useEffect(() => {
      const interval = window.setInterval(() => {
         loadData();
         // getNewbieEvents();
      }, 1000);
      return () => clearInterval(interval);
   }, [loadData]);

   return (
      <div className="main-wrap">
         {/* <Landing ref={audioRef} /> */}
         {/* <Nav /> */}

         <div className="landing">
            <Header />
         </div>
         <div className="presale">
            <a
               href="https://bmptoken.com"
               className="link"
               target="_blank"
               rel="noreferrer"
            >
               BUY BMP TOKEN
            </a>
         </div>
         <div className="trading">
            <img src={Images.blinking} alt="Trading live opportunities" />
            <a
               href="#"
               onClick={(e) => {
                  e.preventDefault();
                  setTradingModal(true);
               }}
            >
               <p>
                  <span>TRADING</span> Opportunity...
               </p>
            </a>
         </div>
         <Help showHelp={tradingModal} onClose={() => setTradingModal(false)}>
            <div>
               <h1>Opportunity 💵💵💵💵</h1>
               <h4>Extra income BMP brand 🚨</h4>
               <p>2 options available 💰</p>
               <p>Option 1👇👇</p>
               <p>Requirements ☀️</p>
               <p>1👉Have at least 1000 tokens in the wallet 🚨 </p>
               <p>
                  2👉 Have an active Word cup deposit and mandatory
                  participation in all future brand developments 🚨
               </p>
               <p>
                  Always and only solely from the wallet where you hold the
                  tokens ( another wallet will not be valid to get the trading
                  commissions)
               </p>
               <p>Option 2</p>
               <p>1👉Have in your wallet at least 700 tokens 🚨🚨🚨</p>
               <p>
                  2👉Have an active deposit in all brand dapps created (BnB
                  pirates, fast furius, paper house, wadjet egyptian miner,
                  World cup) All exclusively in the wallet where you hold the
                  tokens no other wallets than that are accepted participate in
                  all future developments
               </p>
               <p>What will you gain?💵💰💵💰💵💰💵💰</p>
               <p>
                  Each month liquidity will be added in trading and each month
                  10% of trading earnings will be calculated and divided to all
                  eligible people who filled out the form Payment will be made
                  in busd in the wallet where you hold the token💵💵💵💵💵💵
               </p>
               FOR INFORMATION WRITE TO @Silene_Oliveira_TPH @Mikecryptobusiness
               <br />
               remember to fill out the form👇👇👇👇👇
               <a href="https://forms.gle/nsd2ZDmqgtm898MPA">Google Form</a>
            </div>
         </Help>
         <DayCounter start={1657892476} />
         <h1 style={{ textAlign: "center" }}>BMP Ecosystem</h1>
         <div className="links">
            <a href="https://eu.jotform.com/app/bmpbrand/bmp-brand">
               <video autoPlay loop muted playsInline>
                  <source src="logobmp.mp4" type="video/mp4" />
               </video>
            </a>
            {/* <a href="https://wadjetegyptianminer.com/?ref=0x46310b73BabDde141EB44AfBF538013B0F65F1dc">
               <video autoPlay loop muted playsInline>
                  <source src="logowadjet.mp4" type="video/mp4" />
               </video>
            </a> */}
            <a href="https://fandfbnb.com/?ref=0x46310b73BabDde141EB44AfBF538013B0F65F1dc">
               <video autoPlay loop muted playsInline>
                  <source src="logoff.mp4" type="video/mp4" />
               </video>
            </a>
            <a href="https://bnbminingpirates.com/?ref=0x46310b73BabDde141EB44AfBF538013B0F65F1dc">
               <video autoPlay loop muted playsInline>
                  <source src="logopirates.mp4" type="video/mp4" />
               </video>
            </a>
            <a
               href="https://paperhouseminer.com/?ref=0x46310b73BabDde141EB44AfBF538013B0F65F1dc"
               title="Paper House"
            >
               <video autoPlay loop muted playsInline>
                  <source src="logopaper.mp4" type="video/mp4" />
               </video>
            </a>
            {/* <a href="https://t.me/ilprofessorelacasadicartaa" title="Marketing">
               <video autoPlay loop muted playsInline>
                  <source src="dial.mp4" type="video/mp4" />
               </video>
            </a> */}
            <a
               href="https://avengersroi.com/?ref=0x46310b73BabDde141EB44AfBF538013B0F65F1dc"
               title="Avengers"
            >
               <video autoPlay loop muted playsInline>
                  <source src="avengers.mp4" type="video/mp4" />
               </video>
            </a>
         </div>
         {!active && (
            <div className="center">
               <Button full onClick={() => activate(injected)}>
                  Connect To Wallet
               </Button>
            </div>
         )}
         <section className="contract">
            <div className="header"></div>
            <div className="body">
               <Lottery />
            </div>
         </section>
         <section className="buy">
            <div className="header"></div>
            <div className="body">
               <UserView
                  miners={stats.userMiners}
                  tvl={stats.userTVL}
                  eggsBNB={stats.userEggsBnb}
                  invested={stats.userInvestment}
                  withdrawal={stats.userWithdrawal}
                  checkpoint={stats.checkpoint}
                  hatchery={stats.hatchery}
                  eggs={stats.userEggs}
                  lastHatch={stats.userLastHatch}
                  autoCompound={+stats.userAutoCompound === 1}
                  autoCompoundTime={+stats.userAutoCompoundTime}
               />
               <ItemSelectList submitHandler={handleBuy} />
            </div>
         </section>
         <section className="referral">
            <div className="header"></div>
            <div className="body">
               <ReferralView
                  refBonus={stats.refBonus}
                  totalInvestment={stats.totalInvestment}
               />

               <Links />

               {/* <Timer timeStr={count} /> */}
               <Box header="13+1 STRATEGY">
                  <p>
                     This plan helps the longevity of the project. You do 13
                     consequtive WORKOUTs (Compounds) followed by a
                     GOAL(withdraw). If the WORKOUT button (reinvest button)
                     isn't made use of every day for 13 consecutive days then
                     you cannot withdraw on the 14th day. If you miss clicking
                     the PRINT button for a day its not possible to withdraw on
                     the 14th day. Unless you have already AUTOCOMPOUND enabled.
                     If you missed a day, we recommend enable AUTOCOMPOUND as
                     soon as possible.
                  </p>
                  <p>
                     <b>Note:</b> This is is coded in the smart contract for
                     longevity and can not be changed.
                  </p>
               </Box>
            </div>
         </section>
         {/* <Dial /> */}
         {
            <Help showHelp={showWelcome} onClose={() => setShowWelcome(false)}>
               <div>
                  <h4>🚀🚀☄ WELCOME TO☄🚀🚀</h4>

                  <h4> 💪THE AVENGER'S ROI GAME 💪</h4>
                  <p>
                     🔋 ALL TRADING DONATIONS WILL GO TO THE DAPP TO ENSURE ALL
                     PLAYERS GET ROI .💵
                  </p>

                  <p>
                     🕹And you Gamer, are you ready to play your game to get to
                     your winning endgame?
                  </p>

                  <p>🍀Good luck and let's play</p>

                  <p>
                     <a href="https://avengersroi.com/?ref=0x46310b73BabDde141EB44AfBF538013B0F65F1dc">
                        📌JOIN US 🌍
                     </a>
                  </p>
               </div>
            </Help>
         }

         {/* <Footer /> */}
         {/* {showWelcome ? <Welcome hide={() => onEnter()} /> : null} */}
         {/* <Audio ref={audioRef} /> */}
      </div>
   );
}

export default App;
