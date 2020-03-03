---
id: version-1.0.1-api-messageformatfuncmap
title: MessageFormatFuncMap
original_id: api-messageformatfuncmap
---

A mapping of formatter functions.

### Syntax

<pre class="syntax">
{
  [name]: (args: MessageArg[], options: String[]) => string
}
</pre>

### Example

```typescript
import { MessageArg, MessageFormatFuncMap } from '@phensley/messageformat';

const FORMATTERS: MessageFormatFuncMap = {
  foo: (args: MessageArg[], options: string[]) =>
    options[0] === 'upper' ? args[0].toUpperCase() : args[1].toLowerCase()
};

log(FORMATTERS.foo(['hello'], ['upper']));
```
<pre class="output">
HELLO
</pre>

