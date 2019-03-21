import * as fs from 'fs';
import { join } from 'path';

import currencies from './currencies';
import ids from './ids';
import units from './units';
import zones from './zones';


export const writeDoc = (name: string, data: string) => {
  const path = join(__dirname, `../../../docs/${name}`);
  fs.writeFileSync(path, data, { encoding: 'utf-8' });
};

export const write = (typename: string, desc: string) => {
  const id = `api-${typename.toLowerCase()}`;
  const name = `${id}.md`;
  const head = `---\nid: ${id}\ntitle: ${typename}\n---\n\n`;
  console.log(`writing "${name}"`);
  writeDoc(name, head + desc);
};

export const writeTypes = (map: any) => {
  for (const typename of Object.keys(map)) {
    write(typename, map[typename]);
  }
}

const main = () => {
  writeTypes(currencies);
  writeTypes(ids);
  writeTypes(zones);
  writeTypes(units);
};

main();
