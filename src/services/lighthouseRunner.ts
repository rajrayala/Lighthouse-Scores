import generateLHOptions from "../config/lighthouseConfig";
import { DeviceType } from "../models/device.model";

export const runLighthouse = async (
  url: string,
  deviceType: DeviceType,
  config: any = null
) => {
  const chromeLauncher = await import("chrome-launcher");
  const lighthouse = (await import("lighthouse")).default;

  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      "--headless",
      "--quiet",
      "--disable-gpu",
      "--no-sandbox",
      "--ignore-certificate-errors",
      "--allow-running-insecure-content",
      "--reduce-security-for-testing",
      "--unsafely-treat-insecure-origin-as-secure=*",
      "--disable-dev-shm-usage",
      "--collect.settings.maxWaitForFcp=45000",
    ],
  });

  const options = await generateLHOptions(deviceType);

  const runnerResult = await lighthouse(
    url,
    {
      port: chrome.port,
      ...options,
    },
    config
  );

  await chrome.kill();
  return runnerResult?.lhr;
};
