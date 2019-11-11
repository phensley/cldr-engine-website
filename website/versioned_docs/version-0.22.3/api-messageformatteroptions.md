---
id: version-0.22.3-api-messageformatteroptions
title: MessageFormatterOptions
original_id: api-messageformatteroptions
---

Configures a [MessageFormatter](api-messageformatter) instance. See [MessageformatFuncMap](api-messageformatfuncmap).

### Syntax

<pre class="syntax">
{
  formatters?: MessageFormatFuncMap,
  cacheSize?: number
}
</pre>

### Properties
  - <code class="def">formatters: <span>[MessageFormatFuncMap](api-messageformatfuncmap)</span></code>
    - Custom formatter functions
  - <code class="def">cacheSize: <span>number</span></code>
    - Indicates the number of parsed messages to keep in the least-recently-used cache

### Defaults

```typescript
{
  cacheSize: 100
}
```

{%refs MessageFormatterOptions}
