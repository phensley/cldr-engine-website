import { css, SimpleInterpolation } from 'styled-components';

const FOO = '';

const font = (fonts: string[]) => fonts.map(f => `"${f}"`).join(',');

const bodyFont = font([
  'Source Sans Pro',
  'Segoe UI',
  'Helvetica Neue',
  'sans-serif'
]);

const codeFont = font([
  'SFMono-Regular',
  'source-code-pro',
  'Menlo',
  'Monaco',
  'Consolas',
  'Roboto Mono',
  'Droid Sans Mono',
  'Liberation Mono',
  'Courier New',
  'Courier',
  'monospace'
]);

export const Config = {
  bodyFont,
  codeFont,
  primaryColor: '#2c2c2e',
  gridSize: 12,
  gutterWidth: 1,
  outerMargin: 0,
  mediaQuery: 'only screen',
  container: {
    sm: 46,
    md: 61,
    lg: 76
  },
  breakpoints: {
    xs: 0,
    sm: 48,
    md: 64,
    lg: 75
  }
};

export type MediaFunc = (strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]) => any;
export type Dimension = 'xs' | 'sm' | 'md' | 'lg';
export const DIMENSIONS: Dimension[] = ['xs', 'sm', 'md', 'lg'];

interface Media {
  xs: MediaFunc;
  sm: MediaFunc;
  md: MediaFunc;
  lg: MediaFunc;
}

export const media: Media = Object.keys(Config.breakpoints).reduce((m: any, b: string) => {
  const width = Config.breakpoints[b];
  const params = [
    Config.mediaQuery,
    width !== 0 && `(min-width: ${width}em)`
  ].filter(Boolean).join(' and ');
  m[b] = (strings: TemplateStringsArray, ...interpolations: SimpleInterpolation[]): any => css`
    @media ${params} {
      ${css(strings, ...interpolations)}
    }
  `;
  return m;
}, {});
