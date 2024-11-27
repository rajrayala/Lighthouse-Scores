import { Command } from 'commander';
import { readCsv } from '../utils/csvReader';
import fs from 'fs';
import path from 'path';
import runTests from '../services/resultAggregator';
import { saveResults } from '../utils/resultProcessor';

const program = new Command();

program
  .option('-u, --url <string>', 'URL to test')
  .option('-r, --runs <number>', 'number of runs per URL', '3')
  .option('-d, --device <type>', 'device type (desktop or mobile or add comma separated)', 'mobile')
  .parse(process.argv);

const { url, runs, device } = program.opts();
const deviceTypeArray = device.split(',').map((d: string) => d.trim());

(async () => {
  const csvPath = path.resolve(__dirname, '..', '..', 'urls.csv');
  const outputDir = 'results';

  console.log(`Device Types: ${device}`);
  console.log(`Number of Runs: ${runs}`);

  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    console.log(`Reading URLs from ${csvPath}`);
    const urls = url ? [ url ] : await readCsv(csvPath);
    console.log(`Found ${urls.length} URLs`);

    const results = await runTests(urls, parseInt(runs), deviceTypeArray, ['lighthouse']);
    saveResults(results, outputDir);
    console.log(`Results saved`);
  } catch (error) {
    console.error(error);
  }
})();
