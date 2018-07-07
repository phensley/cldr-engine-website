import styled, { css } from 'styled-components';
import { media, Config, DIMENSIONS } from './config';

interface Props {
  fluid?: boolean;
}

export const Grid = styled.div<Props>`
  margin-right: auto;
  margin-left: auto;
  padding-right: ${Config.outerMargin}rem;
  padding-left: ${Config.outerMargin}rem;

  ${p => !p.fluid && css`
    ${DIMENSIONS.map(d => Config.container[d] && media[d]`
      width: ${Config.container[d]}rem;`)}
  `}
`;
