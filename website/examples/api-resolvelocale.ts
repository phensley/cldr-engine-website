import { resolveLocale } from '@phensley/cldr';

(() => {
  let { id, tag } = resolveLocale('und-US');
  console.log(id);
  console.log(tag.expanded());
})();
