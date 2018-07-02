import * as React from 'react';
const { Group, Input, Label, Switch } = require('rebass');

export class Numbers extends React.Component<any> {

  render(): JSX.Element {
    return <div>
      <Group>
        <Input placeholder='Bar' />
        <Input placeholder='Another' />
      </Group>;
        <Label>group</Label><Switch checked={true} />
        </div>;
      }
}