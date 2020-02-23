---
id: version-0.25.21-api-defaultmessageargconverter
title: DefaultMessageArgConverter
original_id: api-defaultmessageargconverter
---

Converts basic types to `Decimal` and `string`.

#### Example

```typescript
import {
  DefaultMessageArgConverter,
  MessageArg,
  MessageFormatter
} from '@phensley/messageformat';

class Converter extends DefaultMessageArgConverter {
  asString(arg: any): string {
    if (typeof arg === 'boolean') {
      return arg ? 'yes' : 'no';
    }
    return super.asString(arg) + '!';
  }
}

const formatter = new MessageFormatter({
  language: 'en',
  converter: new Converter()
});
log(formatter.format('{0} and {1} or {2}', [true, false, 'other'], {}));
```
<pre class="output">
yes and no or other!
</pre>

