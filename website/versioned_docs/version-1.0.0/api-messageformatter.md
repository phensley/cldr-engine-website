---
id: version-1.0.0-api-messageformatter
title: MessageFormatter
original_id: api-messageformatter
---

Self-contained, extensible message formatting class. Handles parsing and caching of messages. Convenience wrapper around the [message matcher](api-buildmessagematcher), [message parser](api-parsemessagepattern), and [evaluation engine](api-messageengine).

## new

Constructs a new message formatter.

#### Syntax

<pre class="syntax">
new MessageFormatter(options: MessageFormatterOptions)
</pre>

#### Parameters

  - <code class="def">options: <span>[MessageFormatterOptions](api-messageformatteroptions)</span></code>
    - Options, including custom formatter functions, cache size, etc.

## format

Formats a message with the given arguments. Internall the message is parsed and cached.

#### Syntax

<pre class="syntax">
format(message: string, positional: MessageArg[], named: MessageNamedArgs): string
</pre>

#### Parameters
  - <code class="def">message: <span>string</span></code>
    - Message to format
  - <code class="def">positional: <span>MessageArg[]</span></code>
    - Arguments keyed by their position in the array
  - <code class="def">named: <span>MessageNamedArgs</span></code>
    - Arguments keyed by name

#### Example

```typescript
import { MessageArg, MessageFormatter } from '@phensley/messageformat';

const formatters = {
  foo: (args: MessageArg[], options: string[]): string =>
    options[0] === 'upper' ? args[0].toUpperCase() : args[0].toLowerCase()
};

const formatter = new MessageFormatter({ language: 'en', formatters });
log(formatter.format('{0}', ['Hello'], {}));
log(formatter.format('{0 foo upper}', ['Hello'], {}));
log(formatter.format('{0 foo lower}', ['Hello'], {}));
```
<pre class="output">
Hello
HELLO
hello
</pre>

{%refs MessageFormatter}
