import { framework } from './helpers';

const SEP = '\n--------------------------------\n\n';

(() => {
  const cldr = framework.get('en');
  let result = cldr.General.formatList(['one', 'two', 'three'], 'and');
  console.log(result);

  result = cldr.General.formatList(['12ft', '9in'], 'unit-short');
  console.log(result);

  console.log(SEP);
})();
