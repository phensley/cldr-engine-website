import { parseLocale } from '@phensley/cldr';

(() => {
  let { id, tag } = parseLocale('und-US');
  console.log(id);
  console.log(tag.expanded());
})();