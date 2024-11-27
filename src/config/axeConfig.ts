import { DeviceType } from '../models/device.model';

export const generateAxeDeviceConfig = (deviceType: DeviceType) => {
  const config = {
    mobile: {
      viewport: { width: 375, height: 812 },
    },
    desktop: {
      viewport: { width: 1920, height: 1080 },
    },
  };

  return config[deviceType];
};
