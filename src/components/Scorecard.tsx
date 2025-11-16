import React from "react";

type Team = {
  short: string;
  score: string;
  crR?: string;
  rr?: string;
};

type ScoreboardProps = {
  scoreboard?: {
    teamA?: Team;
    teamB?: Team;
    remark?: string;
  };
};

const Scorecard: React.FC<ScoreboardProps> = ({ scoreboard = {} }) => {
  const sb = {
    teamA: scoreboard.teamA ?? { short: "MPR", score: "123-10 (19.4)" },
    teamB: scoreboard.teamB ?? {
      short: "LIM",
      score: "73-5 (14.2)",
      crR: "5.09",
      rr: "9.00"
    },
    remark: scoreboard.remark ?? "LIM Needed 51 runs from 34 balls"
  };

  return (
    <div className="float-left scorecard">
      <div className="scorecard-top-container">
        {/* Team A */}
        <div className="scorecard-left">
          <div className="team-block">
            <span className="float-left m-r-5">
              <img
                src="https://d3kb8xz339pq18.cloudfront.net/v12/static/backend/images/ball-icon-white.png"
                alt="ball"
              />
            </span>
            <div className="float-right">
              <h6 className="m-b-0">{sb.teamA.short}</h6>
              <div className="score">
                <p className="m-b-0">
                  <span>{sb.teamA.score}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent balls + Remark */}
        <div className="scorecard-center">
          <div className="text-center">
            <div className="col-md-12 p-t-5">
              <div>
                <span className="m-r-5">
                  <span className="m-b-0 ball-runs ball-runs wicket">ww</span>
                </span>
                <span className="m-r-5">
                  <span className="m-b-0 ball-runs">0</span>
                </span>
                <span className="m-r-5">
                  <span className="m-b-0 ball-runs">1</span>
                </span>
                <span className="m-r-5">
                  <span className="m-b-0 ball-runs">1</span>
                </span>
                <span className="m-r-5">
                  <span className="m-b-0 ball-runs">0</span>
                </span>
                <span className="m-r-5">
                  <span className="m-b-0 ball-runs">0</span>
                </span>
              </div>
            </div>
          </div>
          <p className="m-b-0 score-board-remark">{sb.remark}</p>
        </div>

        {/* Team B */}
        <div className="scorecard-right active-innings">
          <div className="team-block">
            <div className="float-left">
              <h6 className="m-b-0">{sb.teamB.short}</h6>
              <div className="score">
                <p className="m-b-0">
                  <span>{sb.teamB.score}</span>
                </p>
                <p className="m-b-0">
                  {sb.teamB.crR && <span>CRR {sb.teamB.crR}</span>}{" "}
                  {sb.teamB.rr && <span>RR {sb.teamB.rr}</span>}
                </p>
              </div>
            </div>

            <span className="float-right m-l-5">
              <img
                src="https://d3kb8xz339pq18.cloudfront.net/v12/static/backend/images/bat-icon.png"
                alt="bat"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scorecard;
