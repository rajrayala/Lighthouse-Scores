import { DeviceType } from "../models/device.model";
import { LighthouseOptions } from '../models/lighthouse.model';

const generateLHOptions = async (deviceType: DeviceType) => {
  const { screenEmulationMetrics, throttling, userAgents } = await import('lighthouse/core/config/constants.js');

  const config = {
    mobile: {
      userAgent: userAgents.mobile,
      screenEmulation: screenEmulationMetrics.mobile,
      throttling: throttling.mobileRegular3G,
    },
    desktop: {
      userAgent: userAgents.desktop,
      screenEmulation: screenEmulationMetrics.desktop,
      throttling: throttling.desktopDense4G,
    },
  }

  const options: LighthouseOptions = {
    onlyCategories: [
      "performance",
      "accessibility",
      "best-practices",
      "seo",
      "pwa",
    ],
    onlyAudits: [
      "first-contentful-paint",
      "largest-contentful-paint",
      "total-blocking-time",
      "cumulative-layout-shift",
      "server-response-time",
      "speed-index",
    ],
    output: "json",
    logLevel: "error",
    formFactor: deviceType,
    screenEmulation: config[deviceType].screenEmulation,
    emulatedUserAgent: config[deviceType].userAgent,
    throttlingMethod: "simulate",
    throttling: config[deviceType].throttling,
  };

  return options;
}

export default generateLHOptions;
