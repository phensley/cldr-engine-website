/**
 * MDXComponents (swizzled copy of the classic theme, modified).
 *
 * With markdown.format: 'md' (CommonMark), raw HTML blocks in docs
 * (<pre class="syntax">, <pre class="output">, <code class="def">, …) are
 * compiled into the MDX tree and rendered through the theme's `pre`/`code`
 * components — which are built for fenced code blocks and mangle raw HTML:
 * MDXPre drops the <pre> wrapper entirely; Code prism-ifies arbitrary
 * content. The `pre`/`code` entries below render raw HTML elements as plain
 * HTML while fenced code blocks keep the default theme behavior:
 *
 *   - raw <pre class=…>                             -> plain <pre>
 *   - fenced blocks' <pre> (no className)           -> children (Code renders its own <pre>)
 *   - raw <code class=…> (not language-*)           -> plain <code>
 *   - fenced <code language-*> or unclassed         -> default theme Code
 *
 * Everything else mirrors @docusaurus/theme-classic MDXComponents.
 */
import React from 'react';
import Head from '@docusaurus/Head';
import MDXCode from '@theme/MDXComponents/Code';
import MDXA from '@theme/MDXComponents/A';
import MDXPre from '@theme/MDXComponents/Pre';
import MDXDetails from '@theme/MDXComponents/Details';
import MDXHeading from '@theme/MDXComponents/Heading';
import MDXUl from '@theme/MDXComponents/Ul';
import MDXLi from '@theme/MDXComponents/Li';
import MDXImg from '@theme/MDXComponents/Img';
import Admonition from '@theme/Admonition';
import Mermaid from '@theme/Mermaid';

const RawHtmlPre = props => {
  // Fenced code blocks: children is the (wrapped) theme Code element, which
  // renders its own <pre> — unwrap. Anything else (<pre class=…> raw HTML,
  // bare <pre> inside raw tables) renders as a real <pre> element.
  const kids = props.children;
  const isFenced = kids && typeof kids !== 'string' && kids.type === RawHtmlCode;
  return isFenced ? <>{kids}</> : <pre {...props} />;
};

const RawHtmlCode = props => {
  if (props.className && !props.className.startsWith('language-')) {
    return <code {...props} />;
  }
  return <MDXCode {...props} />;
};

const MDXComponents = {
  Head,
  details: MDXDetails, // For MD mode support, see https://github.com/facebook/docusaurus/issues/9092#issuecomment-1602902274
  Details: MDXDetails,
  code: RawHtmlCode,
  a: MDXA,
  pre: RawHtmlPre,
  ul: MDXUl,
  li: MDXLi,
  img: MDXImg,
  h1: (props) => <MDXHeading as="h1" {...props} />,
  h2: (props) => <MDXHeading as="h2" {...props} />,
  h3: (props) => <MDXHeading as="h3" {...props} />,
  h4: (props) => <MDXHeading as="h4" {...props} />,
  h5: (props) => <MDXHeading as="h5" {...props} />,
  h6: (props) => <MDXHeading as="h6" {...props} />,
  admonition: Admonition,
  mermaid: Mermaid,
};
export default MDXComponents;
