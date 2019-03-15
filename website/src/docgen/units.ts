import { UnitValues } from '@phensley/cldr-schema';
import { writeDoc } from './utils';

const UNIT_TYPE = `---
id: api-unittype
title: UnitType
---

The name of a unit like '\`kilogram\`' or '\`terabyte\`'.

### Values

${UnitValues.sort().map(u => `  - "${u}"`).join('\n')}
`;

export const generateUnits = () => {
  writeDoc('api-unittype.md', UNIT_TYPE);
};
