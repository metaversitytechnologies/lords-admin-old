import MatchOddsMarket from "./MatchOddsMarket";
import TiedMatchMarket from "./TiedMatchMarket";
import OverByOverMarket from "./OverByOverMarket";
import BookmakerMarket from "./BookmakerMarket";
import FancyMarket from "./FancyMarket";
import Scorecard from "./Scorecard";
import MatchedUnmatched from "./MatchedUnmatched";
import LiveTvDrag from "./LiveTvDrag";
import TiedMatch from "./TiedMatch";

type MarketLayoutProps = {
  data?: any;
};

const MarketLayout = ({ data }: MarketLayoutProps) => {
  const sample = data || {
    matchOdds: {
      title: "MATCH_ODDS",
      rows: [
        {
          teamName: "Mpumalanga Rhinos",
          boxes: [
            { className: "bl-box back2 changed", odds: "1.47", size: "1.91" },
            { className: "bl-box back1 changed", odds: "1.48", size: "3.97" },
            { className: "bl-box back changed", odds: "1.49", size: "10.32" },
            { className: "bl-box lay changed", odds: "1.5", size: "1.54K" },
            { className: "bl-box lay1 changed", odds: "1.54", size: "4.55" },
            { className: "bl-box lay2 changed", odds: "1.55", size: "2.04K" }
          ]
        },
        {
          teamName: "Limpopo",
          boxes: [
            { className: "bl-box back2 changed", odds: "2.8", size: "1.13K" },
            { className: "bl-box back1 changed", odds: "2.84", size: "2.46" },
            { className: "bl-box back", odds: "3", size: "772.26" },
            { className: "bl-box lay changed", odds: "3.05", size: "5.04" },
            { className: "bl-box lay1 changed", odds: "3.1", size: "1.9" },
            { className: "bl-box lay2 changed", odds: "3.3", size: "1.76" }
          ]
        }
      ]
    },
    tiedMarket: undefined,
    overMarket: undefined,
    bookmakerMarket: undefined,
    fancyMarket: undefined,
    matched: [],
    unmatched: [],
    scoreboard: {}
  };

  return (
    <div>
      <div className="listing-grid w-100 float-left ">
        <div>
          <div className="market-container">
            <div className="left-market">
              <MatchOddsMarket
                market={{
                  title: sample.matchOdds.title,
                  rows: sample.matchOdds.rows
                }}
              />
              <TiedMatchMarket market={sample.tiedMarket} />
              <OverByOverMarket market={sample.overMarket} />
            </div>
            <div className="right-market">
              <Scorecard scoreboard={sample.scoreboard} />
              <MatchedUnmatched
                matched={sample.matched}
                unmatched={sample.unmatched}
              />
              <BookmakerMarket market={sample.bookmakerMarket} />
              <FancyMarket market={sample.fancyMarket} />
              <TiedMatch />
              <LiveTvDrag />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketLayout;
