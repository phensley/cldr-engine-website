import * as React from 'react';
import { headerLinks } from '../../data';

const links = headerLinks;

export class Sidebar extends React.Component<any> {

  render(): JSX.Element {
    return <div>{links.map(l => <span>{l.label}</span>)}</div>;
  }
}
