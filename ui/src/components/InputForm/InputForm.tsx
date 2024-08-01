import React, { useState } from 'react';
import './InputForm.css'; // Import the CSS file

interface InputFormProps {
    onRunTests: (urls: string[], runs: number, device: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onRunTests }) => {
    const [urls, setUrls] = useState('');
    const [runs, setRuns] = useState(3);
    const [device, setDevice] = useState('desktop');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onRunTests([urls], runs, device);
    };

    return (
        <div className="form-container">
            <h2 className="heading">Please Provide Inputs</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label className="label">URLs (comma separated):</label>
                    <input
                        type="text"
                        value={urls}
                        onChange={(e) => setUrls(e.target.value)}
                        className="input"
                        placeholder="http://example.com"
                        required
                    />
                </div>
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
