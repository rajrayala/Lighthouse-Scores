import React from 'react';
import './ResultsCard.css';

interface ResultsCardProps {
    children: React.ReactNode;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ children }) => {
  return (
    <div className="results-container">
      <div className="result-card">
        { children }
      </div>
    </div>
  );
};

export default ResultsCard;
