import { CLDRFramework } from '@phensley/cldr';

const { resolveLocale, parseLanguageTag } = CLDRFramework;

const SEP = '------------------------\n\n';

(() => {
  for (const str of ['en_US', 'zh', 'fr-CA-u-ca-persian-u-nu-mathmono']) {
    const { id, tag } = resolveLocale(str);
    console.log(`${tag.expanded()}`);
  }

  console.log(SEP);
})();

(() => {
  for (const s of ['und-US', 'fr']) {
    const parsed = parseLanguageTag(s);
    const resolved = resolveLocale(parsed);
    console.log(`${parsed.expanded()}  ${resolved.tag.compact()}`);
  }

  console.log(SEP);
})();
