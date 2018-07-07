## Dates


```typescript
cldr.Calendars.formatDate(date, { date: 'short' });
```
<pre class="output">
3/15/18
</pre>

```typescript
cldr.Calendars.formatDate(date, { date: 'medium' });
```
<pre class="output">
Mar 15, 2018
</pre>

```typescript
cldr.Calendars.formatDate(date, { date: 'long' });
```
<pre class="output">
March 15, 2018
</pre>

```typescript
cldr.Calendars.formatDate(date, { date: 'full' });
```
<pre class="output">
Thursday, March 15, 2018
</pre>

## Times


```typescript
cldr.Calendars.formatDate(date, { time: 'short' });
```
<pre class="output">
8:34 AM
12:34 PM
9:34 PM
</pre>

```typescript
cldr.Calendars.formatDate(date, { time: 'medium' });
```
<pre class="output">
8:34:56 AM
12:34:56 PM
9:34:56 PM
</pre>

```typescript
cldr.Calendars.formatDate(date, { time: 'long' });
```
<pre class="output">
8:34:56 AM EDT
12:34:56 PM GMT
9:34:56 PM GMT+9
</pre>

```typescript
cldr.Calendars.formatDate(date, { time: 'full' });
```
<pre class="output">
8:34:56 AM Eastern Daylight Time
12:34:56 PM Greenwich Mean Time
9:34:56 PM Japan Standard Time
</pre>

## Dates and times


```typescript
cldr.Calendars.formatDate(date, { datetime: 'short' });
```
<pre class="output">
3/15/18, 8:34 AM
3/15/18, 12:34 PM
3/15/18, 9:34 PM
</pre>

```typescript
cldr.Calendars.formatDate(date, { datetime: 'medium' });
```
<pre class="output">
Mar 15, 2018, 8:34:56 AM
Mar 15, 2018, 12:34:56 PM
Mar 15, 2018, 9:34:56 PM
</pre>

```typescript
cldr.Calendars.formatDate(date, { datetime: 'long' });
```
<pre class="output">
March 15, 2018 at 8:34:56 AM EDT
March 15, 2018 at 12:34:56 PM GMT
March 15, 2018 at 9:34:56 PM GMT+9
</pre>

```typescript
cldr.Calendars.formatDate(date, { datetime: 'full' });
```
<pre class="output">
Thursday, March 15, 2018 at 8:34:56 AM Eastern Daylight Time
Thursday, March 15, 2018 at 12:34:56 PM Greenwich Mean Time
Thursday, March 15, 2018 at 9:34:56 PM Japan Standard Time
</pre>

## Date skeletons


```typescript
cldr.Calendars.formatDate(date, { skeleton: 'yMd' });
```
<pre class="output">
3/15/2018
</pre>

```typescript
cldr.Calendars.formatDate(date, { skeleton: 'yMMMd' });
```
<pre class="output">
Mar 15, 2018
</pre>

```typescript
cldr.Calendars.formatDate(date, { skeleton: 'yMMMMd' });
```
<pre class="output">
March 15, 2018
</pre>

```typescript
cldr.Calendars.formatDate(date, { skeleton: 'EEEEyMMMMd' });
```
<pre class="output">
Thursday, March 15, 2018
</pre>

## Time skeletons


```typescript
cldr.Calendars.formatDate(date, { skeleton: 'hm' });
```
<pre class="output">
8:34 AM
12:34 PM
9:34 PM
</pre>

```typescript
cldr.Calendars.formatDate(date, { skeleton: 'hmsz' });
```
<pre class="output">
8:34:56 AM EDT
12:34:56 PM GMT
9:34:56 PM GMT+9
</pre>

```typescript
cldr.Calendars.formatDate(date, { skeleton: 'hmszzzz' });
```
<pre class="output">
8:34:56 AM Eastern Daylight Time
12:34:56 PM Greenwich Mean Time
9:34:56 PM Japan Standard Time
</pre>

```typescript
cldr.Calendars.formatDate(date, { skeleton: 'hmsVVVV' });
```
<pre class="output">
8:34:56 AM New York Time
12:34:56 PM London Time
9:34:56 PM Tokyo Time
</pre>

```typescript
cldr.Calendars.formatDate(date, { skeleton: 'hmsvvvv' });
```
<pre class="output">
8:34:56 AM Eastern Time
12:34:56 PM GMT
9:34:56 PM Japan Time
</pre>

## Date time skeletons


```typescript
cldr.Calendars.formatDate(date, { skeleton: 'yMdhm' });
```
<pre class="output">
3/15/2018, 8:34 AM
3/15/2018, 12:34 PM
3/15/2018, 9:34 PM
</pre>

```typescript
cldr.Calendars.formatDate(date, { skeleton: 'yMMMdhmsz' });
```
<pre class="output">
Mar 15, 2018, 8:34:56 AM EDT
Mar 15, 2018, 12:34:56 PM GMT
Mar 15, 2018, 9:34:56 PM GMT+9
</pre>

```typescript
cldr.Calendars.formatDate(date, { skeleton: 'EyMMMMdhmszzzz' });
```
<pre class="output">
Thu, March 15, 2018 at 8:34:56 AM Eastern Daylight Time
Thu, March 15, 2018 at 12:34:56 PM Greenwich Mean Time
Thu, March 15, 2018 at 9:34:56 PM Japan Standard Time
</pre>

```typescript
cldr.Calendars.formatDate(date, { skeleton: 'yMMMdhmsVVVV' });
```
<pre class="output">
Mar 15, 2018, 8:34:56 AM New York Time
Mar 15, 2018, 12:34:56 PM London Time
Mar 15, 2018, 9:34:56 PM Tokyo Time
</pre>

```typescript
cldr.Calendars.formatDate(date, { skeleton: 'yMMMMdhmsvvvv' });
```
<pre class="output">
March 15, 2018 at 8:34:56 AM Eastern Time
March 15, 2018 at 12:34:56 PM GMT
March 15, 2018 at 9:34:56 PM Japan Time
</pre>

