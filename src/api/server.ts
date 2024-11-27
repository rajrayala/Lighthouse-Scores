// src/api/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import runTests from '../services/resultAggregator';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/run-tests', async (req, res) => {
  const { urls, runs, device, tests } = req.body;
  const deviceTypeArray = device.split(',');

  try {
    const results = await runTests(urls, Number(runs), deviceTypeArray, tests);
    res.json(results);
  } catch (error) {
    res.status(500).send({ error: error || 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
