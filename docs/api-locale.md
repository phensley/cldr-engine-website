---
id: api-locale
title: Locale
---

Contains an application's locale identifier and a parsed or resolved language tag.

Applications may identify their supported locales in various forms, depending on their use case. For example, the locale for United States English might be identified by any of the following strings: `en, en-US, en-Latn-US, en_US`. This locale identifier is likely used by an application as a key to lookup a message bundle or other localized objects.

We use the `Locale` object as a container to pair an application's unmodified locale identifier with a parsed and resolved [LanguageTag](api-languagetag.html).

#### Syntax

<pre class="syntax">
object {
  id,
  tag
}
</pre>

#### Properties
  - <code class="def">id: <span>string</span></code>
    - Application's locale identifier
  - <code class="def">tag: <span>[LanguageTag](api-languagetag.html)</span></code>
    - Parsed and resolved language tag, allowing the library internals to access individual properties, e.g. language, script, region, extensions.

#### See Also
  * [resolveLocale](api-resolvelocale.html)
