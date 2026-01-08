import React, { useEffect, useMemo, useRef, useState } from "react";
import { auraData, crashGames, fantsySlot } from "../data/casinoGames";
import type { CasinoGame } from "../data/casinoGames";
import { useAuth } from "../context/AuthContext";
import ReusableModal from "./ReusableModal";
import CasinoBetsModal from "./CasinoBetsModal";

const palette = [
  "#d64035",
  "#0f9c83",
  "#c27a1e",
  "#e05b8f",
  "#4571d1",
  "#f18f32",
  "#b7a23a",
  "#5ab55c",
];

type Section = {
  title: string;
  description: string;
  games: CasinoGame[];
};

const sections: Section[] = [
  {
    title: "Live Casino",
    description: "AURA tables, instant settle, and signature classics.",
    games: fantsySlot,
  },
];

const CrashGame: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuth();
  const [selectedGame, setSelectedGame] = useState<CasinoGame | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const iframeSrc = useMemo(() => {
    if (!token || !selectedGame) return "";
    return `https://aura.fawk.app/${token}/9815/${selectedGame.launchId}`;
  }, [token, selectedGame]);

  const handleCardClick = (game: CasinoGame) => {
    setSelectedGame(game);
  };

  const handleClose = () => setSelectedGame(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !selectedGame) return;

    const tryHideRightPane = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) {
          console.warn("Casino iframe: no access to iframe document.");
          return;
        }

        const style = doc.createElement("style");
        style.textContent = `
          .right-pane,
          .right-pane__bettingPL,
          .right-pane__game-rules,
          .inner-right-pane,
          .inner-right-pane-placeholder {
            display: none !important;
          }
        `;
        doc.head?.appendChild(style);

        const hiddenTargets = doc.querySelectorAll(
          ".right-pane, .right-pane__bettingPL, .right-pane__game-rules, .inner-right-pane, .inner-right-pane-placeholder"
        );

        if (!hiddenTargets.length) {
          console.warn(
            "Casino iframe: right-side selectors not found; layout may have changed."
          );
        }
      } catch (error) {
        console.warn(
          "Casino iframe: could not inject hide CSS (likely cross-origin).",
          error
        );
      }
    };

    iframe.addEventListener("load", tryHideRightPane);
    return () => {
      iframe.removeEventListener("load", tryHideRightPane);
    };
  }, [iframeSrc, selectedGame]);

  return (
    <>
      {selectedGame ? (
        !token ? (
          <section className="casino-page apl-section casino-full-embed">
            <button
              type="button"
              className="btn btn-sm btn-light casino-back"
              onClick={handleClose}>
              Back to games
            </button>
            <p className="m-0">Unable to load the game. Please log in again.</p>
          </section>
        ) : (
          <section className="casino-page apl-section casino-full-embed">
            <button
              type="button"
              className="btn btn-sm btn-light casino-back"
              onClick={handleClose}>
              Back to games
            </button>

            <div className="main_casino_iframe">
              <div className="right_side_iframe"></div>
              <iframe
                ref={iframeRef}
                src={iframeSrc}
                title={selectedGame.name}
                allowFullScreen
              />
            </div>

            <button
              type="button"
              onClick={openModal}
              className="btn btn-sm btn-light casino_bet">
              Show Bet List
            </button>
          </section>
        )
      ) : (
        <div className="container-fluid  mt-2">
          <div className="row">
            {crashGames?.map((item) => (
              <div
                key={item.launchId}
                className="col-4 col-md-2 mb-2 px-1"
                onClick={() => handleCardClick(item)}
                style={{ cursor: "pointer" }}>
                <div className="card bg-light border-0 shadow-sm game-card">
                  <div className="game-img-wrapper">
                    <img
                      src={item?.thumb}
                      className="img-fluid game-img"
                      alt={item?.name}
                      loading="lazy"
                      title={item?.name}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ReusableModal
        show={isModalOpen}
        handleClose={closeModal}
        title="Casino Bets"
        size="xl"
        position="top">
        <CasinoBetsModal matchId={selectedGame?.match_id} />
      </ReusableModal>
    </>
  );
};

export default CrashGame;
