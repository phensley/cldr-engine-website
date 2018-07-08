import * as React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom';
import { English } from '../locale';
import { Decimal, DecimalConstants, DecimalFormatOptions } from '@phensley/cldr';
import { injectGlobal } from 'styled-components';
import { Numbers } from './Numbers';
import { Sidebar } from './Sidebar';
import { Foo } from './Foo';
import { Heading } from './Heading';
import { Stepper } from './Stepper';
import { Config } from './config';
import { Grid } from './Grid';
import { Col } from './Col';
import { Row } from './Row';

injectGlobal`
html, body {
  font-size: 16px;
  margin: 0;
  background: 0;
  font-family: ${Config.bodyFont};
}
code {
  font-family: ${Config.codeFont};
}
`;

const FooCol = Col.extend`
  border: 1px solid gray;
`;

const rand = (): number => Math.floor(Math.random() * 12);

const routes = [
  {
    path: '/',
    exact: true,
    component: () => <h2>One</h2>
  },
  {
    path: '/foo',
    exact: false,
    component: (props: any) => <pre>Two{JSON.stringify(props, undefined, 2)}</pre>
  }
];

export class App extends React.Component<any> {

  render(): JSX.Element {
    const opts: DecimalFormatOptions = { group: true, minimumFractionDigits: 10 };
    const num: Decimal = new Decimal(Number.MAX_SAFE_INTEGER);
    const result = num.multiply(num).divide(DecimalConstants.PI, { scale: 20 });
    const d = rand();
    // return <div><Foo /></div>;
    return (
      <HashRouter>
        <Grid fluid>
          <Heading />
          <Row center='sm'>
            <FooCol>Foo</FooCol>
            <FooCol xs lg reverse><Stepper /></FooCol>
          </Row>
          <Row>
            <Col xs={10}><Numbers /></Col>
          </Row>
          <Row>
            <FooCol xs={2}>

            <Link to='/'>One</Link><br/>
            <Link to='/foo'>Two</Link>
            </FooCol>
            <Col xs={10}>
              <h1>formatDecimal</h1>
              {/* <p>This is a paragraph of text</p>
              <p>This is a paragraph of text</p>
              <p>This is a paragraph of text</p>
              <p>This is a paragraph of text</p> */}
              <code>
                const n = '1.535';<br/>
                const options = {'{'} foo: 'bar' {'}'};<br/>
                cldr.Numbers.formatDecimal(n, options)
              </code>
            </Col>
          </Row>
          <Row>
            <Col>{routes.map((r, i) =>
              <Route key={i} path={r.path} exact={r.exact} component={r.component} />)}
            </Col>
          </Row>
        </Grid>
      </HashRouter>
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
