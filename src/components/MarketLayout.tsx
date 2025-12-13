import { useParams } from "react-router-dom";
import MatchOddsMarket from "./MatchOddsMarket";
import BookmakerMarket from "./BookmakerMarket";
import FancyMarket from "./FancyMarket";
import Scorecard from "./Scorecard";
import LiveTvDrag from "./LiveTvDrag";
import { getOddsData } from "../api/oddsApi";
import { useEffect, useState } from "react";
import MatchedUnmatched from "./MatchedUnmatched";
import { getBetList, getFancyPnl, getOddsPnl } from "../api/bet";

type MarketLayoutProps = {
  data?: any;
};

const MarketLayout = () => {
  const { id } = useParams();
  const [oddsData, setOddsData] = useState<oddsResponse>();
  const [oddsPnl, setOdssPnl] = useState<any>();
  const [fancyPnl, setFancyPnl] = useState<any>();
  const [betListData, setBetListData] = useState<any>();
  const fetchOdds = async () => {
    try {
      const response = await getOddsData(id ?? "");
      console.log("Odds Data Response:", response);
      setOddsData(response);
    } catch (err: any) {
      console.error("Error fetching odds data:", err);
    }
  };

  const fetchOddsPnl = async () => {
    try {
      const response = await getOddsPnl({ matchId: id });
      console.log("Odds Data Response:", response);
      setOdssPnl(response?.data);
    } catch (err: any) {
      console.error("Error fetching odds data:", err);
    }
  };
  const fetchFancyPnl = async () => {
    try {
      const response = await getFancyPnl({ matchId: id });
      setFancyPnl(response?.data);
    } catch (err: any) {
      console.error("Error fetching odds data:", err);
    }
  };
  const fetchBetList = async () => {
    try {
      const response = await getBetList({ matchId: id });
      setBetListData(response?.data);
    } catch (err: any) {
      console.error("Error fetching odds data:", err);
    }
  };

  useEffect(() => {
    fetchOdds();
    fetchOddsPnl();
    fetchFancyPnl();
    fetchBetList();

    const interval = setInterval(() => {
      fetchOdds();
      fetchFancyPnl();
    }, 1000); // 1 second

    return () => clearInterval(interval); // cleanup
  }, []);

  // console.log("Odds Data State:", oddsData);

  return (
    <div>
      <div className="w-100 float-left ">
        <div>
          <div className="market-container">
            <div className="left-market">
              <MatchOddsMarket
                oddsData={oddsData?.Odds}
                pnlData={oddsPnl}
                filterName="Tied Match"
                showOnly={false}
              />
              {/* <TiedMatchMarket market={sample.tiedMarket} /> */}
              {/* <OverByOverMarket market={sample.overMarket} /> */}
              {/* {oddsData?.Fancy2?.length !== 0 && (
                <FancyMarket
                  fancyData={oddsData?.Fancy2}
                  fancyPnldata={fancyPnl}
                />
              )} */}

              {oddsData &&
                Object.keys(oddsData)?.map((fancyMarket: string) => {
                  if (
                    ["Odds", "Bookmaker", "CricketCasino"].includes(fancyMarket)
                  )
                    return <></>;
                  if (oddsData[fancyMarket]?.length > 0)
                    return (
                      // <FancyNew
                      //   handlePlaceBet={handlePlaceBet}
                      //   matchDetais={newOddsData[fancyMarket]}
                      //   profit={profits?.Fancy}
                      //   marketName={fancyMarket}
                      // />
                      <FancyMarket
                        fancyData={oddsData?.[fancyMarket]}
                        fancyPnldata={fancyPnl}
                        fancyMarket={fancyMarket}
                        matchId={id ?? ""}
                      />
                    );
                  return <></>;
                })}
            </div>
            <div className="right-market">
              <Scorecard />
              <MatchedUnmatched matchId={id ?? ""} />
              <BookmakerMarket
                pnlData={oddsPnl}
                bookmakerData={oddsData?.Bookmaker}
              />
              <MatchOddsMarket
                oddsData={oddsData?.Odds}
                pnlData={oddsPnl}
                filterName="Tied Match"
                showOnly={true}
              />
              <LiveTvDrag />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketLayout;
