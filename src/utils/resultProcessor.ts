import fs from 'fs';
import path from 'path';

type Results = {
  audits: Record<string, { score: string; }>;
  categories: Record<string, { score: string; }>;
};

const auditNames = [
  'first-contentful-paint',
  'speed-index',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
];

const formatValue = (key: string, value: number): string => {
  switch (key) {
    case 'first-contentful-paint':
    case 'largest-contentful-paint':
    case 'speed-index':
      return `${(value / 1000).toFixed(1)} s`;
    case 'total-blocking-time':
      return `${Math.round(value)} ms`;
    case 'cumulative-layout-shift':
      return value.toFixed(3);
    default:
      return value.toFixed(2);
  }
};

export const saveResults = (results: Record<string, any>[], outputDir: string) => {
  const date = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = path.join(outputDir, `results-${date}.json`);
  fs.writeFileSync(fileName, JSON.stringify(results, null, 2));
};

export const averageResults = (results: Record<string, any>[]) => {
  const summary = results.reduce((acc, result) => {
    Object.keys(result.audits).forEach((key) => {
      if (auditNames.includes(key)) {
        if (!acc[key]) {
          acc[key] = { score: 0, count: 0 };
        }
        acc[key].score += result.audits[key].numericValue;
        acc[key].count += 1;
      }
    });
    Object.keys(result.categories).forEach((key) => {
      if (!acc[key]) {
        acc[key] = { score: 0, count: 0 };
      }
      acc[key].score += result.categories[key].score * 100;
      acc[key].count += 1;
    });
    return acc;
  }, {} as Record<string, { score: number, count: number }>);

  const averaged = Object.keys(summary).reduce((acc, key) => {
    const averageScore = summary[key].score / summary[key].count;
    if (auditNames.includes(key)) {
      acc.audits[key] = { score: formatValue(key, averageScore) };
    } else {
      acc.categories[key] = { score: (averageScore).toFixed(2) };
    }
    return acc;
  }, { audits: {}, categories: {} } as Results);

  return averaged;
};
