---
id: version-0.25.21-api-parsemessagepattern
title: parseMessagePattern
original_id: api-parsemessagepattern
---

Parses a message string, producing code that can be evaluated multiple times against different arguments.


### Syntax

```syntax
parseMessagePattern(message: string, matcher: MessageMatcher): MessageCode;
```

### Parameters

  - <code class="def">message: <span>string</span></code>
    - Message string to parse
  - <code class="def">matcher: <span>[MessageMatcher](api-messagematcher.html)</span></code>
    - Matcher to reuse across multiple parses

### Example

```typescript
import { buildMessageMatcher, parseMessagePattern } from '@phensley/messageformat';

const matcher = buildMessageMatcher(['foo']);

json(parseMessagePattern('{0 foo}', matcher));
```
<pre class="output">
[6,"foo",[0],[]]
</pre>

```typescript
json(parseMessagePattern('{0 plural one {# item} other {# items}}', matcher));
```
<pre class="output">
[2,[0],0,0,[[1,"one",[4,[[7],[0," item"]]]],[1,"other",[4,[[7],[0," items"]]]]]]
</pre>

{%refs parseMessagePattern}
