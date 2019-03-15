import * as fs from 'fs';
import { join } from 'path';

export const writeDoc = (name: string, data: string) => {
  const path = join(__dirname, `../../../docs/${name}`);
  fs.writeFileSync(path, data, { encoding: 'utf-8' });
};
