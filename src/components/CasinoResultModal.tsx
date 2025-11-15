import React from "react";
import { Trophy } from "react-bootstrap-icons";
import ReusableModal from "./ReusableModal";

interface CasinoResultModalProps {
  show: boolean;
  handleClose: () => void;
  roundId: string;
  winner: string;
  playerA: {
    cards: string[];
  };
  playerB: {
    cards: string[];
  };
}

const CasinoResultModal: React.FC<CasinoResultModalProps> = ({
  show,
  handleClose,
  roundId,
  winner,
  playerA,
  playerB,
}) => {
  return (
    <ReusableModal
      show={show}
      handleClose={handleClose}
      title="Casino Result"
    >
      <div className="text-center">
        <h6>OneDay Teenpatti Result</h6>
      </div>
      <div className="d-block text-center">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <span className="float-right round-id">
                <b>Round ID:</b>
                {roundId}
              </span>
            </div>
          </div>
          <div className="row bottom-border-casino m-t-10">
            <div className="col-md-12">
              <div className="player-image-container row">
                <div className="col-md-6 text-center player-number">
                  <h4>Player A</h4>
                  {playerA.cards.map((card, index) => (
                    <img
                      key={index}
                      src={`https://d3kb8xz339pq18.cloudfront.net/v12/static/backend/images/cards/${card}.png`}
                    />
                  ))}
                  <div className="col-md-12 text-center">
                    <label
                      className={`m-t-20 ${
                        winner === "Player A" ? "winner-label bg-success" : ""
                      }`}
                    >
                      {winner === "Player A" && (
                        <>
                          <Trophy className="m-r-5" />
                          Winner
                        </>
                      )}
                      &nbsp;
                    </label>
                  </div>
                </div>
                <div className="col-md-6 text-center player-number">
                  <h4>Player B</h4>
                  {playerB.cards.map((card, index) => (
                    <img
                      key={index}
                      src={`https://d3kb8xz339pq18.cloudfront.net/v12/static/backend/images/cards/${card}.png`}
                    />
                  ))}
                  <div className="col-md-12 text-center">
                    <label
                      className={`m-t-20 ${
                        winner === "Player B" ? "winner-label bg-success" : ""
                      }`}
                    >
                      {winner === "Player B" && (
                        <>
                          <Trophy className="m-r-5" />
                          Winner
                        </>
                      )}
                      &nbsp;
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReusableModal>
  );
};

export default CasinoResultModal;
