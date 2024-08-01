import { runLighthouse } from "./lighthouseRunner";
import { DeviceType } from "../models/lighthouse.model";
import { averageResults, saveResults } from "../utils/resultProcessor";

const runTests = async (urls: string[], runs: number, deviceTypeArray: DeviceType[]) => {
  const results: Record<string, any>[] = [];

  for (const _url of urls) {
    console.log(`Running Lighthouse for ${_url}`);
    const urlResults: Record<string, any>[] = [];
    for (const deviceType of deviceTypeArray) {
      console.log(`Selecting device type: ${deviceType}`);
      for (let i = 0; i < runs; i++) {
        console.log(`Run ${i + 1} for ${_url}`);
        const result = await runLighthouse(_url, deviceType);
        urlResults.push(result || {});
        console.log(`Run ${i + 1} completed for ${_url}`);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      const averagedResult = averageResults(urlResults);
      results.push({ url: _url, runs, deviceType, averagedResult  });
      console.log(`Completed Lighthouse for ${_url} with device type: ${deviceType}`);
    }
  }
  return results;
};

export default runTests;
