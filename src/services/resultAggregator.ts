import { runLighthouse } from "./lighthouseRunner";
import { DeviceType } from "../models/device.model";
import { averageLHResults } from "../utils/resultProcessor";
import { runAxeAccessibility } from "./axeRunner";

const runTests = async (urls: string[], runs: number, deviceTypeArray: DeviceType[], tests: string[]) => {
  const results: Record<string, any>[] = [];

  for (const _url of urls) {
    console.log(`Running Performance tests for ${_url}`);
    const urlLHResults: Record<string, any>[] = [];
    for (const deviceType of deviceTypeArray) {
      console.log(`Selecting device type: ${deviceType}`);
      if (tests.includes('lighthouse')) {
        console.log(`Running Lighthouse for ${_url}`);
        for (let i = 0; i < runs; i++) {
          console.log(`Run ${i + 1} for ${_url}`);
          const lhResults = await runLighthouse(_url, deviceType);
          urlLHResults.push(lhResults || {});
          console.log(`Run ${i + 1} completed for ${_url}`);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        const averagedResult = averageLHResults(urlLHResults);
        results.push({ url: _url, deviceType, runs, lhResults: averagedResult });
      }
      if (tests.includes('axe')) {
        console.log(`Axe test for ${_url} on ${deviceType}`);
        const axeResults = await runAxeAccessibility(_url, deviceType);
        results.push({  ...results, url: _url, deviceType, axeResults });
      }
      console.log(`Completed Performace Testing for ${_url} with device type: ${deviceType}`);
    }
  }
  return results;
};

export default runTests;
