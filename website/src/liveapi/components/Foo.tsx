import * as React from 'react';
import { Bar } from './Bar';
import styled from 'styled-components';

const X = styled(Bar.withComponent('h2'))`
  line-height: 1.2;
`;

export class Foo extends React.Component<any> {

  render(): JSX.Element {
    return <span>
        <Bar enabled={false}>xyz</Bar>
        <Bar enabled={true}>abc</Bar>
        <X>blah</X>
        hello</span>;
  }

}
