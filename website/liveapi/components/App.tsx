import * as React from 'react';

import { English } from '../locale';
import { DecimalFormatOptions } from '@phensley/cldr-core';
import { Sidebar } from './Sidebar';

export class App extends React.Component<any> {

  render(): JSX.Element {
    const opts: DecimalFormatOptions = { group: true, minimumSignificantDigits: 4 };
    return <div>
      <span>Hello {English.Numbers.formatDecimal('12599', opts)}</span>
      <Sidebar />
      </div>;
  }
}
