import { framework } from './helpers';
import { RegionIdType } from '@phensley/cldr';

const SEP = '\n--------------------------------\n\n';

(() => {
  const cldr = framework.get('es-PR');
  const s1 = cldr.General.measurementSystem();
  const s2 = cldr.General.measurementSystem('temperature');

  console.log(s1);
  console.log(s2);

  console.log(SEP);
})();

(() => {
  const cldr = framework.get('en');
  const items = ['one', 'two', 'three', 'four', 'five'];
  let result = cldr.General.formatList(items.slice(0, 2), 'and');
  console.log(result);

  result = cldr.General.formatList(items, 'or');
  console.log(result);

  console.log(SEP);
})();

(() => {
  const cldr = framework.get('en');
  const items = ['one', 'two', 'three', 'four', 'five'];
  let result = cldr.General.formatListToParts(items.slice(0, 2), 'and');
  console.log(result);

  result = cldr.General.formatListToParts(items, 'or');
  console.log(result);

  console.log(SEP);
})();

(() => {
  const en = framework.get('en');
  let result = en.General.getScriptDisplayName('Latn');
  console.log(result);

  result = en.General.getScriptDisplayName('Egyp');
  console.log(result);

  const de = framework.get('de');
  result = de.General.getScriptDisplayName('Latn');
  console.log(result);

  console.log(SEP);
})();

(() => {
  const en = framework.get('en');
  const fr = framework.get('fr');
  const ids: RegionIdType[] = ['US', 'CA', 'BE', 'ZA'];
  for (const id of ids) {
    const a = en.General.getRegionDisplayName(id);
    const b = fr.General.getRegionDisplayName(id);
    console.log(`en=${a} fr=${b}`);
  }
})();
