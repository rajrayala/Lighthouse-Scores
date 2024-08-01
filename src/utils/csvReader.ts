import fs from 'fs';
import csv from 'csv-parser';

interface UrlEntry {
  url: string;
}

export const readCsv = (filePath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const urls: string[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: UrlEntry) => urls.push(data.url))
      .on('end', () => resolve(urls))
      .on('error', (error) => reject(error));
  });
};
