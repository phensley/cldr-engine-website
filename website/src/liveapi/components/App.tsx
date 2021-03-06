import * as React from 'react';
import { HashRouter, Link, Route, RouteComponentProps  } from 'react-router-dom';
import { English } from '../locale';
import { Decimal, DecimalConstants, DecimalFormatOptions } from '@phensley/cldr';
import styled, { createGlobalStyle } from 'styled-components';
import { Numbers } from './Numbers';
import { Sidebar } from './Sidebar';
import { Foo } from './Foo';
import { Heading } from './Heading';
import { Stepper } from './Stepper';
import { Config } from './config';
import { Grid } from './Grid';
import { Col } from './Col';
import { Row } from './Row';
import { Example1 } from './Example1';

const GlobalStyle = createGlobalStyle`
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

const FooCol = styled(Col)`
  border: 1px solid gray;
`;

const rand = (): number => Math.floor(Math.random() * 12);

const routes = [
  {
    name: 'One',
    path: '/',
    exact: true,
    component: (props: RouteComponentProps<any>) => {
      console.log(props);
      return <Example1 route={props} />;
    }
  },
  {
    name: 'Two',
    path: '/foo',
    exact: false,
    component: (props: any) => <pre>Two{JSON.stringify(props, undefined, 2)}</pre>
  },
  {
    name: 'Three',
    path: '/cldr/Numbers/formatDecimal',
    exact: true,
    component: (props: any) => <pre>formatDecimal: {JSON.stringify(props, undefined, 2)}</pre>
  },
  {
    name: 'Four',
    path: '/cldr/Numbers/formatCurrency',
    exact: true,
    component: (props: any) => <pre>formatDecimal: {JSON.stringify(props, undefined, 2)}</pre>
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
        <GlobalStyle>
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
            {routes.map(r => [<Link to={r.path}>{r.name}</Link>, <br/>])}
            {/* <Link to='/'>One</Link><br/>
            <Link to='/foo'>Two</Link><br/>
            <Link to='/cldr/Numbers/formatDecimal'>Three</Link> */}
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
        </GlobalStyle>
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
