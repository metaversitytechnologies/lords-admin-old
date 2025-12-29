import React from "react";
import { auraData, fantsySlot } from "../data/casinoGames";
import type { CasinoGame } from "../data/casinoGames";

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

const fallbackMonogram = (name: string) => {
  const cleaned = name.replace(/[()]/g, " ");
  const parts = cleaned.split(" ").filter(Boolean);
  const letters = parts.slice(0, 3).map((p) => p[0] || "");
  return letters.join("").substring(0, 3).toUpperCase() || "CAS";
};

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
              const monogram = fallbackMonogram(game.name);

              return (
                <article
                  key={`${game.game_id}-${game.game_code}`}
                  className="casino-card"
                  style={{ ["--card-accent" as string]: accent }}
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
