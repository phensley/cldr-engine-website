import styled, { css } from 'styled-components';
import { media, Config, DIMENSIONS } from './config';

const { floor } = Math;
const isInteger = (o: any) => typeof o === 'number' && floor(o) === o;

type ModType = number | boolean | undefined;

interface Props {
  reverse?: boolean;
  xs?: ModType;
  xsOffset?: number;
  sm?: ModType;
  smOffset?: number;
  md?: ModType;
  mdOffset?: number;
  lg?: ModType;
  lgOffset?: number;
}

const pct = (n: ModType) => `${100 / Config.gridSize * (n as number)}%`;

export const Col = styled.div<Props>`
  box-sizing: border-box;
  flex: 0 0 auto;
  padding-right: ${Config.gutterWidth / 2}rem;
  padding-left: ${Config.gutterWidth / 2}rem;

  ${p => p.reverse && `
    flex-direction: column-reverse;
  `}

  ${p => DIMENSIONS.map(d => p[d] && media[d]`${
    isInteger(p[d]) ? `
      flex-basis: ${pct(p[d])};
      max-width: ${pct(p[d])}
      display: block;
    ` : (p[d] ? `
      flex-grow: 1;
      flex-basis: 0;
      max-width: 100%;
      display: block;
    ` : 'display: none;')
  }`)}

  ${p => p.xsOffset && media.xs`margin-left: ${pct(p.xsOffset)};`}
  ${p => p.smOffset && media.sm`margin-left: ${pct(p.smOffset)};`}
  ${p => p.mdOffset && media.md`margin-left: ${pct(p.mdOffset)};`}
  ${p => p.lgOffset && media.lg`margin-left: ${pct(p.lgOffset)};`}
`;
