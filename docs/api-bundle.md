---
id: api-bundle
title: Bundle
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
const bundle = cldr.Locales.bundle();
console.log(`${bundle.id()}`);
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
const bundle = cldr.Locales.bundle();
console.log(`${bundle.language()}`);
```
<pre class="output">
nb
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
  const bundle = cldr.Locales.bundle();
  console.log(`${bundle.region()}`);
```
<pre class="output">
BR
</pre>


{%refs Bundle}
