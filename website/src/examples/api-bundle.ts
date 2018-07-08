import { framework } from './helpers';

const SEP = '\n--------------------------------\n\n';

(() => {
  const cldr = framework.get('fr-CA');
  const bundle = cldr.Locales.bundle();
  console.log(`${bundle.id()}`);

  console.log(SEP);
})();

(() => {
  const cldr = framework.get('no');
  const bundle = cldr.Locales.bundle();
  console.log(`${bundle.language()}`);

  console.log(SEP);
})();

(() => {
  const cldr = framework.get('pt');
  const bundle = cldr.Locales.bundle();
  console.log(`${bundle.region()}`);

  console.log(SEP);
})();
