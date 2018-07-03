import * as React from 'react';

import { English } from '../locale';
import { DecimalFormatOptions, Decimal, DecimalConstants } from '@phensley/cldr-core';
import { Numbers } from './Numbers';
import { Sidebar } from './Sidebar';

// The rebass typings are way out of date
const {
  Provider,
  Box,
  Flex,
  Heading,
  Text,
  Button
} = require('rebass');

export class App extends React.Component<any> {

  render(): JSX.Element {
    const opts: DecimalFormatOptions = { group: true, minimumFractionDigits: 10 };
    let num: Decimal = new Decimal(Number.MAX_SAFE_INTEGER);
    const result = num.multiply(num).divide(DecimalConstants.PI, { scale: 20 });
    return <Provider>
      <Box px={3} py={5} m={0}>
      <Heading is='h1' fontSize={[ 4, 5, 6 ]}>
        Hello
      </Heading>
      ({num.toString()} * {num.toString()}) / {DecimalConstants.PI.setScale(20).toString()} = {English.Numbers.formatDecimal(result, opts)}
      <Sidebar />
      <Numbers />
      </Box>
    </Provider>
  }
}
