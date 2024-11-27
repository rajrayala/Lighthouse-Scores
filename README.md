# Performance Testing App

This application runs performance tests on specified URLs using Lighthouse. It can be used both as a server, a CLI tool and as an [UI](ui/README.md) app.

## Features

- Run Lighthouse and/ or Axe tests on multiple URLs.
- Supports both mobile and desktop devices.
- Save results to JSON files.
- Average results from multiple runs.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rajrayala/Performance-Testing-Scores.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### CLI

To run the tests from the command line:
```bash
node -r ts-node/register src/cli/index.ts --url "http://localhost:5000" --runs 3 --device desktop
```

The results will be saved in results folder

### Server

To start the server:
```bash
node -r ts-node/register src/cli/index.ts src/api/server.ts
```

The server will start at `http://localhost:3000`.

### API Endpoints

#### Run Tests

- **URL:** `http://localhost:3000/run-tests`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "urls": ["http://localhost:5000", "http://example.com"],
    "runs": 3,
    "device": "desktop"
  }
  ```
- **Response:**
  ```json
  [
    {
        "url": "http://localhost:5000",
        "runs": 1,
        "deviceType": "desktop",
        "averagedResult": {
            "audits": {
                "first-contentful-paint": {
                    "score": "0 s"
                },
                "largest-contentful-paint": {
                    "score": "0 s"
                },
                "server-response-time": {
                    "score": "0 ms"
                },
                "speed-index": {
                    "score": "0 s"
                },
                "total-blocking-time": {
                    "score": "0 ms"
                },
                "cumulative-layout-shift": {
                    "score": "0.0"
                }
            },
            "categories": {
                "performance": {
                    "score": "0.00"
                },
                "accessibility": {
                    "score": "0.00"
                },
                "best-practices": {
                    "score": "0.00"
                },
                "seo": {
                    "score": "0.00"
                }
            }
        }
    },
  ]
  ```

## Project Structure

- `src/`
  - `api/` - Server-related code.
  - `cli/` - CLI-related code.
  - `utils/` - Utility functions.
  - `models/` - Data models.
  - `services/` - Code for processing Lighthouse results.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
