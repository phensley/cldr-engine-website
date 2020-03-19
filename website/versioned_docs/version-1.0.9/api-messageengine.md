---
id: version-1.0.9-api-messageengine
title: MessageEngine
original_id: api-messageengine
---

Evalutes a parsed message against one or more arguments.

## new

Constructs a new message engine.

#### Syntax

<pre class="syntax">
new MessageEngine(plurals, converters, formatters, code)
</pre>

#### Parameters

- <code class="def">plurals: <span>[PluralRules](api-pluralrules)</span></code>
  - A set of plural rules for a given locale
- <code class="def">converter: <span>[MessageArgConverter](api-messageargconverter)</span></code>
  - Converts arguments to required types. See [DefaultMessageArgConverter](api-defaultmessageargconverter)
- <code class="def">formatters: <span>[MessageFormatFuncMap](api-messageformatfuncmap.html)</span></code>
  - An object whose properties are message format functions.
- <code class="def">code: <span>[MessageCode](api-messagecode.html)</span></code>
  - A parsed message.

## evaluate

Evaluate a parsed message against one or more arguments. Arguments can be positional or named.

#### Syntax

<pre class="syntax">
evaluate(positional: MessageArg[], named: MessageNamedArgs): string
</pre>

#### Parameters

- <code class="def">positional: <span>MessageArg[]</span></code>
  - Arguments keyed by their position in the array
- <code class="def">named: <span>MessageNamedArgs</span></code>
  - Arguments keyed by name

#### Example

```typescript
import {
  buildMessageMatcher,
  parseMessagePattern,
  DefaultMessageArgConverter,
  MessageArg,
  MessageEngine,
  MessageNamedArgs
} from '@phensley/messageformat';
import { pluralRules } from '@phensley/plurals';

const FORMATTERS = {
  foo: (args: MessageArg[], options: string[]) =>
    options[0] === 'upper' ? args[0].toUpperCase() : args[1].toLowerCase()
};
const NAMES = Object.keys(FORMATTERS);
const MATCHER = buildMessageMatcher(NAMES);
const CONVERTER = new DefaultMessageArgConverter();

const parse = (message: string) => parseMessagePattern(message, MATCHER);

const format = (
  message: string,
  positional: MessageArg[],
  named: MessageNamedArgs = {}
) => {
  const plurals = pluralRules.get('en');
  const engine = new MessageEngine(
    plurals,
    CONVERTER,
    FORMATTERS,
    parse(message)
  );
  log(engine.evaluate(positional, named));
};

const msg =
  '{0, plural, offset:1 =0 {Be the first to like this} =1 {You liked this} ' +
  'one {You and someone else liked this} other {You and # others liked this}}';

format(msg, [0]);
format(msg, [1]);
format(msg, [2]);
format(msg, [3]);
```
<pre class="output">
Be the first to like this
You liked this
You and someone else liked this
You and 2 others liked this
</pre>

