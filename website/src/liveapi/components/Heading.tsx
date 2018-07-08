import * as React from 'react';
import styled, { css } from 'styled-components';
import { Config } from './config';

// HEADER

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: ${Config.primaryColor};
`;

// SECTION

const Section = styled.div`
  display: flex;
  align-items: center;
`;

// ITEM

interface ItemProps {
  selected?: boolean;
}

const Item = styled.div<ItemProps>`
  padding: 5px 15px;
  font-size: 16px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;

  & + ${(): any => Item} {
    margin-left: 15px;
  }

  a {
    text-decoration: none;
    color: white;
  }

  ${p => p.selected && css`
    color: #fff;
    background-color: #415F69;
    border-radius: 4px;`}
`;

export class Heading extends React.Component<any> {
  render(): JSX.Element {
    const selected = true;
    return (
      <Header>
        <Section>
          <Item >Foo</Item>
          <Item>Bar</Item>
        </Section>
        <Section>
          <Item>Foo</Item>
          <Item selected={selected}>Bar</Item>
          <Item>Github</Item>
        </Section>
      </Header>
    );
  }
}
