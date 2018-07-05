import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CLDR } from '@phensley/cldr';
import { localeChange } from '../actions';
import { State } from '../reducers';

const { Group, Input, Label, Switch } = require('rebass');

// interface Props {
//   cldr: CLDR;
// }

class NumbersImpl extends React.Component<any> {

  changeLocale = (): void => {
    this.props.actions.localeChange('de');
  }

  render(): JSX.Element {
    const { cldr } = this.props;
    console.log(this.state);
    const result = cldr.Numbers.formatDecimal('12345.1533', { group: true });
    return (
    <div>
      <Group>
        <Input placeholder='Bar' />
        <Input placeholder='Another' />
      </Group>
        <Label>group: {result}</Label>
        <Switch checked={true} onClick={this.changeLocale} />
    </div>);
  }
}

const mapState = (s: State) => ({
  cldr: s.locale.cldr
});

const mapDispatch = (d: Dispatch<State>) => ({
  actions: bindActionCreators({ localeChange }, d)
});

export const Numbers = connect(mapState, mapDispatch)(NumbersImpl);
