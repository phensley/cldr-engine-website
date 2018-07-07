import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Input = styled.input.attrs({
  type: 'text',
  // placeholder: 'Age',
  // value: '32'
})`
  border-left: 0;
  border-right: 0;
  width: 60px;
  text-align: center;
  border: 1px solid #d7dbdd;
  padding: 0 10px;
  border-radius: 0;
  box-shadow: none;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 5px 15px;
  color: #fff;
  background-color: #4ebbe4;
  font-size: 13px;
  border: 1px solid #16a2d7;
  border-radius: 4px;
`;

const Left = Button.extend`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const Right = Button.extend`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export class Stepper extends React.Component<any> {
  render(): JSX.Element {
    return (
    <Wrapper>
      <Left>-</Left>
      <Input />
      <Right>+</Right>
    </Wrapper>
  );
  }
}
