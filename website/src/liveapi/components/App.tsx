import * as React from 'react';

import { English } from '../locale';
import { Decimal, DecimalConstants, DecimalFormatOptions } from '@phensley/cldr';
import { injectGlobal } from 'styled-components';
import { Numbers } from './Numbers';
import { Sidebar } from './Sidebar';
import { Foo } from './foo';
import { Heading } from './Heading';
import { Stepper } from './Stepper';
import { Config } from './config';
import { Grid } from './Grid';
import { Col } from './Col';
import { Row } from './Row';

injectGlobal`
body {
  font-size: 16px;
  margin: 0;
  background: 0;
  font-family: ${Config.bodyFont};
}
`;

const FooCol = Col.extend`
  border: 1px solid gray;
`;

const rand = (): number => Math.floor(Math.random() * 12);

export class App extends React.Component<any> {

  render(): JSX.Element {
    const opts: DecimalFormatOptions = { group: true, minimumFractionDigits: 10 };
    const num: Decimal = new Decimal(Number.MAX_SAFE_INTEGER);
    const result = num.multiply(num).divide(DecimalConstants.PI, { scale: 20 });
    const d = rand();
    // return <div><Foo /></div>;
    return (
      <Grid fluid>
        <Heading />
        <Row center='sm'>
          <FooCol>Foo</FooCol>
          <FooCol xs lg reverse><Stepper /></FooCol>
        </Row>
        <Row>
          <FooCol xs={12} md={d}>Foo</FooCol>
        </Row>
      </Grid>
    );

    // return <Provider>
    //   <Box px={3} py={5} m={0}>
    //   <Heading is='h1' fontSize={[ 4, 5, 6 ]}>
    //     Hello
    //   </Heading>
    //   ({num.toString()} * {num.toString()}) / {DecimalConstants.PI.setScale(20).toString()}
    //   = {English.Numbers.formatDecimal(result, opts)}
    //   <Sidebar />
    //   <Numbers />
    //   </Box>
    // </Provider>;
  }
}
