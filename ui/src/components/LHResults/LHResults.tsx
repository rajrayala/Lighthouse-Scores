import ResultsCard from '../ResultsCard/ResultsCard';
import './LHResults.css';

interface LHResultsProps {
  results: any;
}

const LHResults: React.FC<LHResultsProps> = ({ results }) => {
  return (
    <>
      {results?.map((result: any, index: number) => (
        <ResultsCard key={index}>
          <h3 className="url">{result.url}</h3>
          <p className="runs">Total Runs: <strong>{result.runs}</strong></p>
          <p className="device">Device Type: <strong>{result.deviceType.toUpperCase()}</strong></p>
          <div className="scores-container">
            {Object.keys(result.lhResults.categories).map((category) => (
              <div key={category} className="score">
                <div className={`circle`} style={{ borderColor: getColor(result.lhResults.categories[category].score) }}>
                  {result.lhResults.categories[category].score}
                </div>
                <p className="category-text">{capitalize(category.replaceAll('-', ' '))}</p>
              </div>
            ))}
          </div>
          <div className="metrics-container">
            <h3>Metrics</h3>
            <ul className="metrics-list">
              {Object.keys(result.lhResults.audits).map((audit) => (
                <li key={audit} className="metric">
                  <span>{capitalize(audit.replaceAll('-', ' '))}</span>
                  <strong>{result.lhResults.audits[audit].score}</strong>
                </li>
              ))}
            </ul>
          </div>
        </ResultsCard>
      ))}
    </>
  );
};

const getColor = (score: number) => {
  if (score > 90) return 'green';
  if (score > 50) return 'orange';
  return 'red';
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default LHResults;
