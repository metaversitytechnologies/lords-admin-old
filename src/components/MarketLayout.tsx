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
      const response = await getOddsPnl({ matchId: "34966369" ?? "" });
      console.log("Odds Data Response:", response);
      setOdssPnl(response?.data);
    } catch (err: any) {
      console.error("Error fetching odds data:", err);
    }
  };
  const fetchFancyPnl = async () => {
    try {
      const response = await getFancyPnl({ matchId: "34966369" ?? "" });
      console.log("Odds Data Response:", response);
      setFancyPnl(response?.data);
    } catch (err: any) {
      console.error("Error fetching odds data:", err);
    }
  };
  const fetchBetList = async () => {
    try {
      const response = await getBetList({ matchId: "34966369" ?? "" });
      console.log("Odds Data Response:", response);
      setBetListData(response?.data);
    } catch (err: any) {
      console.error("Error fetching odds data:", err);
    }
  };

  console.log("Odds Data State:", oddsPnl);

  useEffect(() => {
    fetchOdds();
    fetchOddsPnl();
    fetchFancyPnl();
    fetchBetList();

    const interval = setInterval(() => {
      fetchOdds();
    }, 1000); // 1 second

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div>
      <div className="listing-grid w-100 float-left ">
        <div>
          <div className="market-container">
            <div className="left-market">
              <MatchOddsMarket oddsData={oddsData?.Odds} pnlData={oddsPnl}/>
              {/* <TiedMatchMarket market={sample.tiedMarket} /> */}
              {/* <OverByOverMarket market={sample.overMarket} /> */}
              {oddsData?.Fancy2?.length !== 0 && (
                <FancyMarket fancyData={oddsData?.Fancy2}  fancyPnldata={fancyPnl}/>
              )}
            </div>
            <div className="right-market">
              <Scorecard />
              <MatchedUnmatched matchId={id ?? ""} />
              <BookmakerMarket  pnlData={oddsPnl} bookmakerData={oddsData?.Bookmaker} />
              <LiveTvDrag />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketLayout;
