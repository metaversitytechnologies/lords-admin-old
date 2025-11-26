import { useParams } from "react-router-dom";
import MatchOddsMarket from "./MatchOddsMarket";
import BookmakerMarket from "./BookmakerMarket";
import FancyMarket from "./FancyMarket";
import Scorecard from "./Scorecard";
import LiveTvDrag from "./LiveTvDrag";
import { getOddsData } from "../api/oddsApi";
import { useEffect, useState } from "react";
import MatchedUnmatched from "./MatchedUnmatched";

type MarketLayoutProps = {
  data?: any;
};

const MarketLayout = () => {
  const { id } = useParams();
  const [oddsData, setOddsData] = useState<oddsResponse>();
  const fetchBalance = async () => {
    try {
      const response = await getOddsData(id ?? "");
      console.log("Odds Data Response:", response);
      setOddsData(response);
    } catch (err: any) {
      console.error("Error fetching odds data:", err);
    }
  };

  useEffect(() => {
    fetchBalance();

    const interval = setInterval(() => {
      fetchBalance();
    }, 1000); // 1 second

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div>
      <div className="listing-grid w-100 float-left ">
        <div>
          <div className="market-container">
            <div className="left-market">
              <MatchOddsMarket oddsData={oddsData?.Odds} />
              {/* <TiedMatchMarket market={sample.tiedMarket} /> */}
              {/* <OverByOverMarket market={sample.overMarket} /> */}
              {oddsData?.Fancy2?.length !== 0 && (
                <FancyMarket fancyData={oddsData?.Fancy2} />
              )}
            </div>
            <div className="right-market">
              <Scorecard />
              <MatchedUnmatched matchId={id ?? ""} />
              <BookmakerMarket bookmakerData={oddsData?.Bookmaker} />
              <LiveTvDrag />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketLayout;
