---
id: version-0.21.0-doc-messageformatting
title: Usage
original_id: doc-messageformatting
---

Fast, compact, and extensible ICU message formatting.

The message formatting system exports a parser and evaluation engine. It supports basic [ICU message formatting](https://unicode-org.github.io/icu-docs/apidoc/released/icu4j/com/ibm/icu/text/MessageFormat.html) with the `plural`, `select`, and `selectordinal` complex formatters, and can be extended with your own custom simple formatters.

The message formatter can be used independent of the bulk of the library via the [`@phensley/messageformat`](https://www.npmjs.com/package/@phensley/messageformat) package.

```typescript
import {
  buildMessageMatcher,
  parseMessagePattern,
  MessageArg,
  MessageEngine,
  MessageNamedArgs
} from '@phensley/cldr';

const FORMATTERS = {
  foo: (args: MessageArg[], options: string[]) =>
    options[0] === 'upper' ? args[0].toUpperCase() : args[0].toLowerCase()
};

const FORMATTER_NAMES = Object.keys(FORMATTERS);

const MATCHER = buildMessageMatcher(FORMATTER_NAMES);

const parse = (message: string) => parseMessagePattern(message, MATCHER);

const dump = (message: string) =>
  log(JSON.stringify(parse(message)));

const format = (message: string, positional: MessageArg[], named: MessageNamedArgs = {}) => {
  const engine = new MessageEngine('en', FORMATTERS, parse(message));
  log(engine.evaluate(positional, named));
};

let msg: string;
```

### Example 1 - message parsing (cache code repeated use)

Messages can be pre-parsed and embedded into source code, JSON, or YAML files, or parsed and cached at runtime.

```typescript
dump('{0 select, male {his} female {her} other {their}} {item}');
```
<pre class="output">
[4,[[3,[0],[["male",[0,"his"]],["female",[0,"her"]],["other",[0,"their"]]]],[0," "],[1,"item"]]]
</pre>

```typescript
dump('{word} uppercase = {word foo upper} lowercase = {word foo lower}');
```
<pre class="output">
[4,[[1,"word"],[0," uppercase = "],[6,"foo",["word"],["upper"]],[0," lowercase = "],[6,"foo",["word"],["lower"]]]]
</pre>

### Example 2 - plural cardinals

```typescript
msg = '{count, plural, offset:1 =0 {Be the first to like this} =1 {You liked this} one {You and someone else liked this} other {You and # others liked this}}';

format(msg, [], { count: 0 });
format(msg, [], { count: 1 });
format(msg, [], { count: 2 });
format(msg, [], { count: 3 });
```
<pre class="output">
Be the first to like this
You liked this
You and someone else liked this
You and 2 others liked this
</pre>

### Example 3 - select

```typescript
msg = '{0, select, male {his} female {her} other {their}} {item}';

format(msg, ['they'], { item: 'coat' });
format(msg, ['female'], { item: 'jacket' });
format(msg, ['male'], { item: 'parka' });
```
<pre class="output">
their coat
her jacket
his parka
</pre>

### Example 4 - plural ordinals and select

```typescript
msg = '{name} {tied select true {tied for} other {came in}} {place selectordinal one {#st} two {#nd} few {#rd} other {#th}} place';

const racers = [
  { name: 'Lisa', place: 1 },
  { name: 'Bob', place: 2 },
  { name: 'Betty', place: 3 },
  { name: 'Frank', place: 4, tied: true },
  { name: 'George', place: 4, tied: true },
  { name: 'Larry', place: 5 }
];

for (const racer of racers) {
  format(msg, [], racer);
}
```
<pre class="output">
Lisa came in 1st place
Bob came in 2nd place
Betty came in 3rd place
Frank tied for 4th place
George tied for 4th place
Larry came in 5th place
</pre>

### Example 5 - custom formatter

```typescript
msg = '{word} uppercase = {word foo upper} lowercase = {word foo lower}';

const WORDS = [
  'Computer',
  'Science',
  'Mathematics'
];

for (const word of WORDS) {
  format(msg, [], { word });
}
```
<pre class="output">
Computer uppercase = COMPUTER lowercase = computer
Science uppercase = SCIENCE lowercase = science
Mathematics uppercase = MATHEMATICS lowercase = mathematics
</pre>
