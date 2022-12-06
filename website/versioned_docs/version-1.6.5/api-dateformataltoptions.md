---
id: version-1.6.5-api-dateformataltoptions
title: DateFormatAltOptions
original_id: api-dateformataltoptions
---

### Syntax

<pre class="syntax">
object {
  era?,
  dayPeriod?,
  atTime?
}
</pre>

### Properties

- <code class="def">era?: <span>[EraAltType](api-eraalttype)</span></code>
  - Specify the alternate form of the ERA field, e.g. "Before Christ" vs "Before Common Era".
- <code class="def">dayPeriod?: <span>[DayPeriodAltType](api-dayperiodalttype)</span></code>
  - Specify the alternate form of the DAY PERIOD field, e.g. "AM" vs "am".
- <code class="def">atTime?: <span>boolean</span></code>
  - Specify use of the "DATE at TIME" format (default `true`).

{%refs DateFormatAltOptions}
