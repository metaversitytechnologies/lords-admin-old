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
        setError("Match ID is not provided.");
        return;
      }

      setLoading(true);
      try {
        const response = await getScorecardData(matchId);
        if (response.data) {
          setScorecardHtml(response.data);
        } else {
          setError("Failed to load scorecard data.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScorecard();
    const interval = setInterval(fetchScorecard, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [matchId]);

  if (loading && !scorecardHtml) {
    return <div>Loading scorecard...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!scorecardHtml) {
    return <div>No scorecard available.</div>;
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: scorecardHtml }} />
  );
};

export default Scorecard;