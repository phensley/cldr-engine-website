---
id: version-1.0.1-api-numbersystemtype
title: NumberSystemType
original_id: api-numbersystemtype
---

A union type that can include either a number system type or name.

### Values

A number system type indicates which of a locale's number system name to select.

  - <code class="def">'default'</code>
    - Use the locale's default numbering system
  - <code class="def">'native'</code>
    - Use the locale's native numbering system
  - <code class="def">'finance'</code>
    - Use the locale's finance numbering system
  - <code class="def">'traditional'</code>
    - Use the locale's traditional numbering system

A number system name identifies a specific numbering system. It may be rare that you
would need to specify a numbering system name.

The current decimal numbering system names are below. Algorithmic numbering systems
are not supported at this time.

```typescript
type NumberSystemName = 'adlm' | 'ahom' | 'arab' | 'arabext' |
'bali' | 'beng' | 'bhks' | 'brah' | 'cakm' | 'cham' | 'deva' |
'fullwide' | 'gonm' | 'gujr' | 'guru' | 'hanidec' | 'hmng' | 'java' |
'kali' | 'khmr' | 'knda' | 'lana' | 'lanatham' | 'laoo' | 'latn' |
'lepc' | 'limb' | 'mathbold' | 'mathdbl' | 'mathmono' | 'mathsanb' |
'mathsans' | 'mlym' | 'modi' | 'mong' | 'mroo' | 'mtei' | 'mymr' |
'mymrshan' | 'mymrtlng' | 'newa' | 'nkoo' | 'olck' | 'orya' |
'osma' | 'saur' | 'shrd' | 'sind' | 'sinh' | 'sora' | 'sund' |
'takr' | 'talu' | 'tamldec' | 'telu' | 'thai' | 'tibt' | 'tirh' |
'vaii' | 'wara';
```

{%refs NumberSystemType}
