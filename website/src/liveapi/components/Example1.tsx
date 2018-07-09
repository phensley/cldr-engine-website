import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props {
  route: RouteComponentProps<any>;
}

export class Example1 extends React.Component<Props> {

  render(): JSX.Element {
    return (
      <div>
        <pre><code>
          {JSON.stringify(this.props.route)}
        </code></pre>
      </div>
    );
  }

}
