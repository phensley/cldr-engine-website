const { headerLinks } = require('./src/data');

const users = [
  {
    // caption: 'Foo',
    // image: '/img/cldr-engine-logo-bw.svg',
    // pinned: true
  }
];

const baseUrl = '/cldr-engine/';

const siteConfig = {
  title: '@phensley/cldr',
  tagline: 'CLDR internationalization and localization in Typescript, batteries-included',
  url: 'https://phensley.github.io',
  baseUrl,
  projectName: 'cldr-engine',
  organizationName: 'phensley',
  gaTrackingId: 'UA-121435304-1',
  headerLinks: headerLinks,
  users,
  headerIcon: 'img/cldr-engine-logo-w.svg',
  footerIcon: 'img/cldr-engine-logo-w.svg',
  favicon: 'img/favicon.ico',
  colors: {
    primaryColor: '#2c2c2e',
    secondaryColor: '#59585d'
  },
  highlight: {
    theme: 'vs'
  },
  fonts: {
    baseFont: ['Source Sans Pro', 'Segoe UI', 'Helvetica Neue', 'sans-serif']
  },
  copyright: 'Copyright © ' + new Date().getFullYear() + ' Patrick Hensley',
  cleanUrl: true,
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300italic'
  ],
  separateCss: [
    'static/liveapi-css'
  ],
  scripts: [
    'https://buttons.github.io/buttons.js',
    baseUrl + 'js/sidenav.js'
  ],
  onPageNav: 'separate',
  ogImage: 'img/cldr-engine-logo-bw.png',
  twitterImage: 'img/cldr-engine-logo-bw.png',
  repoUrl: 'https://github.com/phensley/cldr-engine',

  algolia: {
    apiKey: '184628c75b098ce37a1a35f1615d9410',
    indexName: 'phensley_cldr-engine',
  },

  markdownPlugins: [
    function lists(md) {
      md.block.ruler.before('list', 'list', require('./markdown/list'));
      md.renderer.rules.list_item_open = function (tokens, idx) {
        return (tokens[idx].char === '*') ? '<li class="list">' : '<li>';
      };
    },
    function include(md) {
      const { parse, render } = require('./markdown/include');
      md.inline.ruler.push('include', parse(__dirname));
      md.renderer.rules.include = render(md);
    },
    function refs(md) {
      const { parse, render } = require('./markdown/refs');
      md.inline.ruler.push('refs', parse(`${__dirname}/../docs`));
      md.renderer.rules.refs = render(md, `${__dirname}/crossref.json`);
    }
  ]
};

module.exports = siteConfig;
