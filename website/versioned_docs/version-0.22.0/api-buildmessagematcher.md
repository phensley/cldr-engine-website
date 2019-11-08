---
id: version-0.22.0-api-buildmessagematcher
title: buildMessageMatcher
original_id: api-buildmessagematcher
---

A component that performs low-level matching for [parseMessagePattern](api-parsemessagepattern.html).

### Syntax

```syntax
buildMessageMatcher(formatters: string[]): MessageMatcher
```

### Parameters

  - <code class="def">formatters: <span>string[]</span></code>
    - Array containing the names of your custom formatter functions.

### Example

```typescript
import { buildMessageMatcher, parseMessagePattern } from '@phensley/messageformat';

const message = '{0 foo}';

// No names specified, so 'foo' will not be detected as a valid formatter
let matcher = buildMessageMatcher([]);
let code = parseMessagePattern(message, matcher);
log(code);

// Now 'foo' shoulr parse as a formatter
matcher = buildMessageMatcher(['foo']);
code = parseMessagePattern(message, matcher);
log(code);
```
<pre class="output">
[ 5 ]
[ 6, 'foo', [ 0 ], [] ]
</pre>

{%refs buildMessageMatcher}
