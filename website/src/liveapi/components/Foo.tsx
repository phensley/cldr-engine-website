import * as React from 'react';
import { Bar } from './Bar';

const X = Bar.withComponent('h2').extend`
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
