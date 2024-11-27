import ResultsCard from '../ResultsCard/ResultsCard';
import './AxeResults.css';

interface AxeResultsProps {
  results: any;
}

const AxeResults: React.FC<AxeResultsProps> = ({ results }) => {
  return (
    <>
      {results?.map((result: any, index: number) => (
        <ResultsCard key={index}>
          <h3 className="url">{result.url}</h3>
          <p className="device">Device Type: <strong>{result.deviceType.toUpperCase()}</strong></p>
          <div className="violations-container">
            <h3>Violations</h3>
            <div className="violations-list">
              {result.axeResults.violations.map((violation: any, idx: number) => (
                <div key={idx} className="violation">
                  <span>{capitalize(violation.id.replaceAll('-', ' '))}</span>
                  <p className="description">{violation.description}</p>
                  <div>
                    {violation.nodes.map((node: any, nodeIdx: number) => (
                      <div key={nodeIdx}>
                        <strong>Impact:</strong> {node.impact} <br />
                        <strong>Target:</strong> {node.target.join(', ')}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="passes-container">
            <h3>Passed Checks</h3>
            <ul className="passes-list">
              {result.axeResults.passes.map((pass: any, idx: number) => (
                <li key={idx} className="pass">
                  <span>{capitalize(pass.id.replaceAll('-', ' '))}</span>
                  <p className="description">{pass.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </ResultsCard>
      ))}
    </>
  );
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default AxeResults;
