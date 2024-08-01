export interface LighthouseOptions {
    onlyCategories: string[];
    onlyAudits?: string[],
    output: "json";
    logLevel?: "error" | "info" | "warn" | "silent" | "verbose";
    formFactor: DeviceType;
    screenEmulation?: {
        mobile: boolean;
        width: number;
        height: number;
        deviceScaleFactor: number;
        disabled: boolean;
    };
    emulatedUserAgent?: string;
    throttlingMethod?: 'devtools' | "provided" | "devtools" | "simulate";
    throttling?: object;
}

export type DeviceType = 'desktop' | 'mobile';
