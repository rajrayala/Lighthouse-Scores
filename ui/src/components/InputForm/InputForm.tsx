import React, { useState } from 'react';
import './InputForm.css'; // Import the CSS file

interface InputFormProps {
    onRunTests: (urls: string[], runs: number, device: string, tests: string[]) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onRunTests }) => {
    const [urls, setUrls] = useState('');
    const [runs, setRuns] = useState(3);
    const [device, setDevice] = useState('desktop');
    const [selectedTests, setSelectedTests] = useState<string[]>(['lighthouse']);

    const handleCheckboxChange = (test: string) => {
        setSelectedTests((prevTests) =>
          prevTests.includes(test) ? prevTests.filter((t) => t !== test) : [...prevTests, test]
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const urlsArray = urls.split(',').map((url) => url.trim());
        onRunTests(urlsArray, runs, device, selectedTests);
    };

    return (
        <div className="form-container">
            <h2 className="heading">Please Provide Inputs</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label className="label">Select Tests:</label>
                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            value="lighthouse"
                            checked={selectedTests.includes('lighthouse')}
                            onChange={() => handleCheckboxChange('lighthouse')}
                        />
                        <label>Lighthouse</label>
                    </div>
                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            value="axe"
                            checked={selectedTests.includes('axe')}
                            onChange={() => handleCheckboxChange('axe')}
                        />
                        <label>Axe</label>
                    </div>
                </div>
                <div className="form-group">
                    <label className="label">URLs:</label>
                    <input
                        type="text"
                        value={urls}
                        onChange={(e) => setUrls(e.target.value)}
                        className="input"
                        placeholder="http://example.com, http://example2.com"
                        required
                    />
                </div>
                {selectedTests.includes('lighthouse') && (
                    <div className="form-group">
                        <label className="label">Number of Runs:</label>
                        <input
                            type="number"
                            value={runs}
                            onChange={(e) => setRuns(Number(e.target.value))}
                            className="input"
                            min="1"
                            required
                        />
                    </div>
                )
                }
                <div className="form-group">
                    <label className="label">Device Type:</label>
                    <select value={device} onChange={(e) => setDevice(e.target.value)} className="input">
                        <option value="desktop">Desktop</option>
                        <option value="mobile">Mobile</option>
                    </select>
                </div>
                <button type="submit" className="button">Run Tests</button>
            </form>
        </div>
    );
};

export default InputForm;
