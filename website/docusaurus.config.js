/**
 * @phensley/cldr website — Docusaurus 3 configuration.
 * Replaces Docusaurus v1 siteConfig.js (migration, see MIGRATION-PLAN.md).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const remarkRefs = require('./src/markdown/refs');
const remarkInclude = require('./src/markdown/include');
const remarkListClass = require('./src/markdown/list-class');
const remarkHtmlLinks = require('./src/markdown/html-links');
const { resolveVersion } = require('./scripts/version-resolve');

const SITE = __dirname;
const REPO = path.join(SITE, '..');

// Per-version doc id sets (D8): the refs plugin only emits "References"
// entries pointing at docs that exist in the version being rendered.
const validBases = { current: null };
for (const version of JSON.parse(fs.readFileSync(path.join(SITE, 'versions.json'), 'utf-8'))) {
  validBases[version] = new Set(resolveVersion(version).keys());
}


module.exports = {
  title: '@phensley/cldr',
  tagline:
    'CLDR internationalization and localization in Typescript, batteries-included',
  url: 'https://phensley.github.io',
  baseUrl: '/cldr-engine/',
  organizationName: 'phensley',
  projectName: 'cldr-engine',
  favicon: 'img/favicon.ico',
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300italic'
  ],

  markdown: {
    // CommonMark for .md (raw HTML passthrough — docs rely on it, C10),
    // MDX for .mdx.
    format: 'detect'
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: path.join(REPO, 'docs'),
          sidebarPath: path.join(SITE, 'sidebars.json'),
          routeBasePath: 'docs',
          lastVersion: 'current',
          versions: {
            current: { label: '1.12.1' } // current release docs live in ../docs
          },
          remarkPlugins: [
            [remarkRefs, { crossref: path.join(SITE, 'crossref.json'), validBases }],
            [remarkInclude, { includeDir: SITE }],
            remarkListClass,
            remarkHtmlLinks
          ]
        },
        blog: false,
        theme: {
          customCss: path.join(SITE, 'src/css/custom.css')
        }
      }
    ]
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true
    },
    navbar: {
      title: '@phensley/cldr',
      logo: {
        alt: 'cldr-engine logo',
        src: 'img/cldr-engine-logo-w.svg'
      },
      items: [
        { type: 'doc', docId: 'doc-index', label: 'Docs', position: 'left' },
        { type: 'doc', docId: 'api-cldr', label: 'API', position: 'left' },
        // { href: '/cldr-engine/liveapi/', label: 'Live' }, // Phase 9: restore when ready
        {
          href: 'https://phensley.github.io/cldr-engine-react-demo',
          label: 'Demo',
          position: 'left'
        },
        { href: 'https://github.com/phensley/cldr-engine', label: 'GitHub', position: 'right' },
        { type: 'docsVersionDropdown', position: 'right' },
        { href: 'https://www.npmjs.com/package/@phensley/cldr', label: 'NPM', position: 'right' }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Introduction', to: '/docs/doc-index' },
            { label: 'API Reference', to: '/docs/api-cldr' },
            { label: 'Versions', to: '/versions' }
          ]
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/phensley/cldr-engine' },
            { label: 'Demo', href: 'https://phensley.github.io/cldr-engine-react-demo' },
            { label: 'NPM', href: 'https://www.npmjs.com/package/@phensley/cldr' }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Patrick Hensley`
    },
    prism: {
      additionalLanguages: ['typescript']
    }
  }
};
