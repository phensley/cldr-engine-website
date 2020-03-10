---
id: version-1.0.4-api-bundle
title: Bundle
original_id: api-bundle
---

Exposes properties on the loaded resource bundle. The bundle is the collection of strings and other properties for a given locale.

## id

Identifier of the bundle's [Locale](api-locale.html). This is the expanded language tag identifying the bundle.

#### Syntax
<pre class="syntax">
id(): string
</pre>

#### Example

```typescript
const cldr = framework.get('fr-CA');
const bundle = cldr.General.bundle();
log(bundle.id());
```
<pre class="output">
fr-Latn-CA
</pre>



## language

The [IETF](https://en.wikipedia.org/wiki/IETF_language_tag) code for this bundle's language.

#### Syntax

<pre class="syntax">
language(): string
</pre>

#### Example

```typescript
const cldr = framework.get('no');
const bundle = cldr.General.bundle();
log(bundle.language());
```
<pre class="output">
nb
</pre>


## plurals

The set of [PluralRules](api-pluralrules) used for this locale.


#### Syntax

<pre class="syntax">
plurals(): PluralRules
</pre>

#### Example

```typescript
const cldr = framework.get('en');
const plurals = cldr.General.bundle().plurals();
for (const n of [0, 1, '1.0']) {
  log(n, plurals.cardinal(n));
}
```
<pre class="output">
0 other
1 one
1.0 other
</pre>

## region

The [IETF](https://en.wikipedia.org/wiki/IETF_language_tag) for this bundle's region.

#### Syntax

<pre class="syntax">
region(): string
</pre>

#### Example

```typescript
const cldr = framework.get('pt');
const bundle = cldr.General.bundle();
log(bundle.region());
```
<pre class="output">
BR
</pre>


{%refs Bundle}
