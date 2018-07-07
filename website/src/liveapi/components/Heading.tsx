import * as React from 'react';
import styled, { css } from 'styled-components';

const blue = '#56727c';

// HEADER

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: ${blue};
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
  font-size: 14px;
  cursor: pointer;
  color: #D9E9EF;

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
    const selected = false;
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
