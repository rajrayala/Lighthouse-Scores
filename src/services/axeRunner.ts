import puppeteer from 'puppeteer';
import axeCore from 'axe-core';
import { DeviceType } from '../models/device.model';
import { generateAxeDeviceConfig } from '../config/axeConfig';

export const runAxeAccessibility = async (url: string, deviceType: DeviceType) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Fetch user agent dynamically
  const dynamicUserAgent = await page.evaluate(() => navigator.userAgent);

  // Use viewport from configuration and dynamic user agent
  const { viewport } = generateAxeDeviceConfig(deviceType);
  await page.setViewport(viewport);
  await page.setUserAgent(dynamicUserAgent);

  await page.goto(url, { waitUntil: 'load' });

  // Inject and execute Axe
  const axeResults = await page.evaluate(`
    (function() {
      ${axeCore.source}
      return axe.run();
    })()
  `);

  await browser.close();
  return axeResults;
};
