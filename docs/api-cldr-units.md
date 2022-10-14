---
id: api-cldr-units
title: CLDR.Units
---

## availableUnits

Return an array of available units ([UnitType](api-unittype.html)).

#### Syntax

<pre class="syntax">
availableUnits(): UnitType[]
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const units = cldr.Units.availableUnits();
for (const u of units.slice(0, 15)) {
  log(u);
}
log("...");
```
<pre class="output">
acre
acre-foot
ampere
arc-minute
arc-second
astronomical-unit
atmosphere
bar
barrel
bit
british-thermal-unit
bushel
byte
calorie
candela
...
</pre>


## formatQuantity

Format a given unit quantity to string.

#### Syntax

<pre class="syntax">
formatQuantity(qty, options?): string
</pre>

#### Parameters

- <code class="def">qty: <span>[Quantity](api-quantity.html)</span></code>
  - Value to be formatted
- <code class="def">options?: <span>[UnitFormatOptions](api-unitformatoptions.html)</span></code>
  - Options to control unit formatting

#### Example

```typescript
const cldr = framework.get("en");
const qty: Quantity = { value: "123.3799", unit: "meter-per-square-second" };
log(
  cldr.Units.formatQuantity(qty, { length: "narrow", maximumFractionDigits: 2 })
);
```
<pre class="output">
123.38m/s²
</pre>


## formatQuantityToParts

Format a given unit quantity to an array of parts.

#### Syntax

<pre class="syntax">
formatQuantity(qty, options?): Part[]
</pre>

#### Parameters

- <code class="def">qty: <span>[Quantity](api-quantity.html)</span></code>
  - Value to be formatted
- <code class="def">options?: <span>[UnitFormatOptions](api-unitformatoptions.html)</span></code>
  - Options to control unit formatting

#### Example

```typescript
const cldr = framework.get("en");
const qty: Quantity = { value: "1353.75999", unit: "mile-per-hour" };
log(cldr.Units.formatQuantityToParts(qty, { length: "long" }));
```
<pre class="output">
[
  { type: 'integer', value: '1' },
  { type: 'group', value: ',' },
  { type: 'integer', value: '353' },
  { type: 'decimal', value: '.' },
  { type: 'fraction', value: '76' },
  { type: 'literal', value: ' miles per hour' }
]
</pre>


## formatQuantitySequence

Format a sequence of [Quantity](api-quantity.html) into a string.

#### Syntax

<pre class="syntax">
formatQuantitySequence(quantities, options?): string
</pre>

#### Parameters

- <code class="def">quantities: <span>[Quantity[]](api-quantity.html)</span></code>
  - Array of quantities to be formatted
- <code class="def">options?: <span>[UnitFormatOptions](api-unitformatoptions.html)</span></code>
  - Options to control unit formatting

#### Example

```typescript
const cldr = framework.get("en");
const qty: Quantity[] = [
  { value: 3, unit: "mile" },
  { value: 1, unit: "yard" },
  { value: 23, unit: "foot" },
  { value: 9.6, unit: "inch" },
];
const options: UnitFormatOptions[] = [
  { length: "long" },
  { length: "short" },
  { length: "narrow" },
];
for (const opt of options) {
  const result = cldr.Units.formatQuantitySequence(qty, opt);
  log(result);
}
```
<pre class="output">
3 miles, 1 yard, 23 feet, 9.6 inches
3 mi, 1 yd, 23 ft, 9.6 in
3mi 1yd 23′ 9.6″
</pre>


## formatQuantitySequenceToParts

Format a sequence of [Quantity](api-quantity.html) into an array of parts.

#### Syntax

<pre class="syntax">
formatQuantitySequenceToParts(quantities, options?): string
</pre>

#### Parameters

- <code class="def">quantities: <span>[Quantity[]](api-quantity.html)</span></code>
  - Array of quantities to be formatted
- <code class="def">options?: <span>[UnitFormatOptions](api-unitformatoptions.html)</span></code>
  - Options to control unit formatting

#### Example

```typescript
const cldr = framework.get("en");
const qty: Quantity[] = [
  { value: 3, unit: "mile" },
  { value: 1, unit: "yard" },
  { value: 23, unit: "foot" },
  { value: 9.6, unit: "inch" },
];
log(cldr.Units.formatQuantitySequenceToParts(qty, { length: "short" }));
```
<pre class="output">
[
  { type: 'integer', value: '3' },
  { type: 'literal', value: ' mi' },
  { type: 'literal', value: ', ' },
  { type: 'integer', value: '1' },
  { type: 'literal', value: ' yd' },
  { type: 'literal', value: ', ' },
  { type: 'integer', value: '23' },
  { type: 'literal', value: ' ft' },
  { type: 'literal', value: ', ' },
  { type: 'integer', value: '9' },
  { type: 'decimal', value: '.' },
  { type: 'fraction', value: '6' },
  { type: 'literal', value: ' in' }
]
</pre>


## getUnitDisplayName

Return a string containing the unit display name.

#### Syntax

<pre class="syntax">
getUnitDisplayName(unit, length?): string
</pre>

#### Parameters

- <code class="def">name: <span>[UnitType](api-unittype.html)</span></code>
  - Name of the unit
- <code class="def">length?: <span>[UnitLength](api-unitlength.html)</span></code>
  - Length of the name, defaults to `"long"`

#### Example

```typescript
const w = (s: string) => `${s}${" ".repeat(15 - s.length)}`;

const en = framework.get("en");
const de = framework.get("de");
const zh = framework.get("zh");

const units: UnitType[] = [
  "light-year",
  "kilogram",
  "meter",
  "kilowatt",
  "hertz",
];
for (const unit of units) {
  const a = en.Units.getUnitDisplayName(unit);
  const b = de.Units.getUnitDisplayName(unit);
  const c = zh.Units.getUnitDisplayName(unit);
  log(`en=${w(a)}  de=${w(b)}  zh=${w(c)}`);
}
```
<pre class="output">
en=light years      de=Lichtjahre       zh=光年             
en=kilograms        de=Kilogramm        zh=千克             
en=meters           de=Meter            zh=米              
en=kilowatts        de=Kilowatt         zh=千瓦             
en=hertz            de=Hertz            zh=赫兹             
</pre>

