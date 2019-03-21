---
id: api-decimalformatstyletype
title: DecimalFormatStyleType
---

Indicates which format style to use when formatting decimal numbers.

<pre class="syntax">
'decimal' | 'short' | 'long' | 'percent' | 'percent-scaled' |
'permille' | 'permille-scaled'
</pre>

### Values
  - `"decimal"`
    - Default formatting.
  - `"short"`
    - Compact form, using as few digits as needed, with a short indicator of the order of magnitude.
  - `"long"`
    - Compact form, using as few digits as needed, with a long indicator of the order of magnitude.
  - `"percent"`
    - Formats a number as a percent, first multiplying it by 100.
  - `"percent-scaled"`
    - formats a number as a percent, without multiplying.
  - `"permille"`
    - Formats a number as a permille, first multiplying it by 1000.
  - `"permille-scaled"`
    - Formats a number as a permille, without multiplying.

### Examples

```typescript
cldr.Numbers.formatDecimal('123456.6789', { style: 'decimal', group: true });
```

<pre class="output">
123,456.679
</pre>

```typescript
cldr.Numbers.formatDecimal('123456.6789', { style: 'short' });
```

<pre class="output">
123K
</pre>

```typescript
cldr.Numbers.formatDecimal('123456.6789', { style: 'long' });
```

<pre class="output">
123 thousand
</pre>

```typescript
cldr.Numbers.formatDecimal('12.3456', { style: 'percent' });
```
<pre class="output">
1,235%
</pre>

```typescript
cldr.Numbers.formatDecimal('12.3456', { style: 'percent-scaled' });
```
<pre class="output">
12%
</pre>

```typescript
cldr.Numbers.formatDecimal('12.3456', { style: 'permille' });
```
<pre class="output">
12,346‰
</pre>

```typescript
cldr.Numbers.formatDecimal('12.3456', { style: 'permille-scaled' });
```
<pre class="output">
12‰
</pre>

