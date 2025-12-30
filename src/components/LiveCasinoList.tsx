import React, { useEffect, useMemo, useRef, useState } from "react";
import { auraData } from "../data/casinoGames";
import type { CasinoGame } from "../data/casinoGames";
import { useAuth } from "../context/AuthContext";

const palette = [
  "#d64035",
  "#0f9c83",
  "#c27a1e",
  "#e05b8f",
  "#4571d1",
  "#f18f32",
  "#b7a23a",
  "#5ab55c"
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
    games: auraData
  }
];

const LiveCasinoList: React.FC = () => {
  const { token } = useAuth();
  const [selectedGame, setSelectedGame] = useState<CasinoGame | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const iframeSrc = useMemo(() => {
    if (!token || !selectedGame) return "";
    return `https://aura.fawk.app/${token}/9815/${selectedGame.game_id}`;
  }, [token, selectedGame]);

  const handleCardClick = (game: CasinoGame) => {
    setSelectedGame(game);
  };

  const handleClose = () => setSelectedGame(null);

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

  if (selectedGame) {
    if (!token) {
      return (
        <section className="casino-page apl-section casino-full-embed">
          <button
            type="button"
            className="btn btn-sm btn-light casino-back"
            onClick={handleClose}
          >
            Back to games
          </button>
          <p className="m-0">Unable to load the game. Please log in again.</p>
        </section>
      );
    }

    return (
      <section className="casino-page apl-section casino-full-embed">
        <button
          type="button"
          className="btn btn-sm btn-light casino-back"
          onClick={handleClose}
        >
          Back to games
        </button>
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          title={selectedGame.name}
          allowFullScreen
        />
      </section>
    );
  }

  return (
    <section className="casino-page apl-section">
      <div className="casino-hero">
        <div>
          <p className="casino-label">Live Casino</p>
        </div>
      </div>

      {sections.map((section, sectionIndex) => (
        <div className="casino-section" key={section.title}>
          <div className="casino-grid">
            {section.games.map((game, index) => {
              const accent =
                palette[(index + sectionIndex * 3) % palette.length];

              return (
                <article
                  key={`${game.game_id}-${game.game_code}`}
                  className="casino-card"
                  style={{ ["--card-accent" as string]: accent }}
                  onClick={() => handleCardClick(game)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(game);
                    }
                  }}
                >
                  <div className="casino-card__image only-image">
                    {game.thumb ? (
                      <img src={game.thumb} alt={game.name} />
                    ) : (
                      <div className="casino-card__placeholder" />
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
};

export default LiveCasinoList;
