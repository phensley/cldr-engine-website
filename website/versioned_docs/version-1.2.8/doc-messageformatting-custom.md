---
id: version-1.2.8-doc-messageformatting-custom
title: Customization
original_id: doc-messageformatting-custom
---

The `@phensley/cldr` package does not currently define any i18n-specific message formatter functions. In the meantime you can easily hook up custom i18n formatters for your types using any formatter names you wish.

Below is an example of defining custom formatting functions that use a [`CLDR`](api-cldr.html) instance with options to control which format is rendered.

```typescript
import {
  buildMessageMatcher,
  parseMessagePattern,
  pluralRules,
  CLDR,
  CurrencyFormatStyleType,
  CurrencyType,
  Decimal,
  DecimalConstants,
  DecimalFormatStyleType,
  DefaultMessageArgConverter,
  FormatWidthType,
  MessageArg,
  MessageNamedArgs,
  MessageEngine,
  MessageFormatFuncMap,
  PluralRules,
  ZonedDateTime
} from '@phensley/cldr';

const coerce = (arg: any) => {
  try {
    return new Decimal(arg);
  } catch (e) {
    return DecimalConstants.NAN;
  }
};

const formatter = (cldr: CLDR) => ({
  decimal: (args: MessageArg[], options: string[]) => {
    const style = options[0] as DecimalFormatStyleType;
    return cldr.Numbers.formatDecimal(coerce(args[0]), { style });
  },
  datetime: (args: MessageArg[], options: string[]) => {
    const width = options[0] as FormatWidthType;
    return cldr.Calendars.formatDate(args[0] as ZonedDateTime, {
      datetime: width
    });
  },
  currency: (args: MessageArg[], options: string[]) => {
    const arg = args[0] as MyCurrency;
    const style = options[0] as CurrencyFormatStyleType;
    return cldr.Numbers.formatCurrency(coerce(arg.amount), arg.currencyCode, {
      style
    });
  }
});

const FORMATTER_NAMES = ['currency', 'decimal', 'datetime'];
const MATCHER = buildMessageMatcher(FORMATTER_NAMES);
const CONVERTER = new DefaultMessageArgConverter();

const parse = (message: string) => parseMessagePattern(message, MATCHER);

const format = (
  plurals: PluralRules,
  formatters: MessageFormatFuncMap,
  message: string,
  positional: MessageArg[],
  named: MessageNamedArgs = {}
) => {
  const engine = new MessageEngine(
    plurals,
    CONVERTER,
    formatters,
    parse(message)
  );
  return engine.evaluate(positional, named);
};

const ENGLISH = framework.get('en');
for (const id of ['en', 'es', 'ko']) {
  const cldr = framework.get(id);

  // Fetch the PluralRules instance for the current locale
  const plurals = cldr.General.bundle().plurals();

  log(ENGLISH.General.getLanguageDisplayName(id));

  // Build our map of custom formatters once whenever the locale changes
  const formatters = formatter(cldr);

  let msg = '  "{0 decimal}"  "{0 decimal short}"  "{0 decimal long}"';
  let s = format(plurals, formatters, msg, ['12535.99']);
  log(s);

  msg = '  "{0 datetime short}"  "{0 datetime long}"';
  s = format(plurals, formatters, msg, [
    { date: new Date(), zoneId: 'America/Los_Angeles' }
  ]);
  log(s);

  msg = '  "{0 currency name}"  "{0 currency}"  "{0 currency short}"';
  s = format(plurals, formatters, msg, [
    { amount: '12351330', currencyCode: 'EUR' }
  ]);
  log(s);
}
```
<pre class="output">
English
  "12,535.99"  "13K"  "13 thousand"
  "4/29/20, 5:41 AM"  "April 29, 2020 at 5:41:36 AM PDT"
  "12,351,330.00 euros"  "€12,351,330.00"  "€12M"
Spanish
  "12.535,99"  "13 mil"  "13 mil"
  "29/4/20 5:41"  "29 de abril de 2020, 5:41:36 GMT-7"
  "12.351.330,00 euros"  "12.351.330,00 €"  "12 M€"
Korean
  "12,535.99"  "1.3만"  "1.3만"
  "20. 4. 29. AM 5:41"  "2020년 4월 29일 AM 5시 41분 36초 GMT-7"
  "12,351,330.00 유로"  "€12,351,330.00"  "€1,235만"
</pre>

