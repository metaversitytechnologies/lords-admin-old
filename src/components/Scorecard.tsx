import React, { useState, useEffect } from 'react';
import { getScorecardData } from '../api/oddsApi';

interface ScorecardProps {
  matchId: string;
}

const Scorecard: React.FC<ScorecardProps> = ({ matchId }) => {
  const [scorecardHtml, setScorecardHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScorecard = async () => {
      if (!matchId) {
        setLoading(false);
        console.error("Match ID is not provided.");
        return;
      }

      setLoading(true);
      try {
        const response = await getScorecardData(matchId);
        if (response.data) {
          setScorecardHtml(response.data);
        } else {
          console.error("Failed to load scorecard data.");
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScorecard();
    const interval = setInterval(fetchScorecard, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [matchId]);

  return (
    <div
      style={{ marginLeft: "5px" }}
      dangerouslySetInnerHTML={{ __html: scorecardHtml }}
    />
  );
};

export default Scorecard;