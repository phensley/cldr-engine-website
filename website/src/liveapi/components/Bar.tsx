import styled from 'styled-components';

interface Props {
  enabled?: boolean;
}

export const Bar = styled.header<Props>`
  color: ${p => p.enabled ? 'red' : 'blue'};
  border-radius: 2px;
`;

const Input = styled.input.attrs({
  size: 10
})<Props>`
  color: red;
`;
