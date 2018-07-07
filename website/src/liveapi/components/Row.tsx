import styled from 'styled-components';
import { media, Config, Dimension } from './config';

interface Props {
  reverse?: boolean;
  start?: Dimension;
  center?: Dimension;
  end?: Dimension;
  top?: Dimension;
  middle?: Dimension;
  bottom?: Dimension;
  around?: Dimension;
  between?: Dimension;
  first?: Dimension;
  last?: Dimension;
}

export const Row = styled.div<Props>`
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: ${Config.gutterWidth / 2 * -1}rem;
  margin-left: ${Config.gutterWidth / 2 * -1}rem;

  ${p => p.reverse && `
    flex-direction: row-reverse;
  `}

  ${p => p.start && media[p.start]`
  justify-content: flex-start;
  `}

  ${p => p.center && media[p.center]`
  justify-content: center;
  `}

  ${p => p.end && media[p.end]`
  justify-content: flex-end;
  `}

  ${p => p.top && media[p.top]`
    align-items: flex-start;
  `}

  ${p => p.middle && media[p.middle]`
    align-items: center;
  `}

  ${p => p.bottom && media[p.bottom]`
    align-items: flex-end;
  `}

  ${p => p.around && media[p.around]`
    justify-content: space-around;
  `}

  ${p => p.between && media[p.between]`
    justify-content: space-between;
  `}

  ${p => p.first && media[p.first]`
    order: -1;
  `}

  ${p => p.last && media[p.last]`
    order: 1;
  `}

`;
