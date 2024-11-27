# Performance UI Dashboard

This is a React application that allows users to run Lighthouse and Axe performance tests and view the results in a user-friendly dashboard.

## Features

- Input form to specify URLs, device type, and number of runs.
- Displays Lighthouse results with categories and audits in a visually appealing format.
- Displays Axe results with violations and passed ones.
- Loading spinner while tests are running.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rajrayala/Performance-Testing-Scores.git
   cd ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```

2. Open the application in your browser at `http://localhost:3000`.

3. To update the port, update the port number in .env file

## Project Structure

- `src/`
  - `components/`
    - `InputForm` - Form for user input.
    - `AxeResults` - Component to display Axe results.
    - `LHResults` - Component to display Lighthouse results.
    - `Loader` - Loading spinner component.
    - `ResultsCard` - Component to wrap results in a card.
  - `App.tsx` - Main application component.
  - `index.tsx` - Entry point of the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
