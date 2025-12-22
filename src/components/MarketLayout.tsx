import { useParams } from "react-router-dom";
import MatchOddsMarket from "./MatchOddsMarket";
import BookmakerMarket from "./BookmakerMarket";
import FancyMarket from "./FancyMarket";
import Scorecard from "./Scorecard";
import LiveTvDrag from "./LiveTvDrag";
import { getMatchSettings, getOddsData } from "../api/oddsApi";
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
  const [matchSettings, setMatchSettings] = useState<any[]>([]);
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
  const fetchMatchSettingsData = async () => {
    if (!id) return;
    try {
      const response = await getMatchSettings(id);
      setMatchSettings(response?.data || response || []);
    } catch (err: any) {
      console.error("Error fetching match settings:", err);
    }
  };

  useEffect(() => {
    fetchOdds();
    fetchOddsPnl();
    fetchFancyPnl();
    fetchBetList();
    fetchMatchSettingsData();

    const interval = setInterval(() => {
      fetchOdds();
      fetchFancyPnl();
    }, 1000); // 1 second
    const settingsInterval = setInterval(() => {
      fetchMatchSettingsData();
    }, 15000); // 15 seconds

    return () => {
      clearInterval(interval);
      clearInterval(settingsInterval);
    }; // cleanup
  }, []);

  const matchSettingsByMarketId = Array.isArray(matchSettings)
    ? matchSettings.reduce((acc: Record<string, any>, item: any) => {
        const key = item?.marketId || item?.mid || item?.sid;
        if (key) acc[key] = item;
        return acc;
      }, {})
    : {};

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
                matchId={id ?? ""}
                matchSettings={matchSettingsByMarketId}
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
                        matchSettings={matchSettingsByMarketId}
                      />
                    );
                  return <></>;
                })}
            </div>
            <div className="right-market">
              <Scorecard matchId={id ?? ""} />
              <MatchedUnmatched matchId={id ?? ""} />
              <BookmakerMarket
                pnlData={oddsPnl}
                bookmakerData={oddsData?.Bookmaker}
                matchId={id ?? ""}
                matchSettings={matchSettingsByMarketId}
              />
              <MatchOddsMarket
                oddsData={oddsData?.Odds}
                pnlData={oddsPnl}
                filterName="Tied Match"
                showOnly={true}
                matchId={id ?? ""}
                matchSettings={matchSettingsByMarketId}
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
