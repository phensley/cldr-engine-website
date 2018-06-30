const { join } = require('path');
const { headerLinks } = require('./siteData');

const users = [
  {
    // caption: 'Foo',
    // image: '/img/cldr-engine-logo-bw.svg',
    // pinned: true
  }
];

const siteConfig = {
  title: '@phensley/cldr',
  tagline: 'CLDR internationalization in Typescript, batteries-included',
  url: 'https://phensley.github.io',
  baseUrl: '/cldr-engine/',
  projectName: 'cldr-engine',
  organizationName: 'phensley',
  gaTrackingId: 'UA-121435304-1',
  headerLinks: headerLinks,
  users,
  headerIcon: 'img/cldr-engine-logo-w.svg',
  footerIcon: 'img/cldr-engine-logo-w.svg',
  favicon: 'img/favicon.png',
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
  copyright: 'Copyright © ' + new Date().getFullYear() +' Patrick Hensley',
  stylesheets: [
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700,300italic'
  ],
  scripts: [
    'https://buttons.github.io/buttons.js'
  ],
  onPageNav: 'separate',
  ogImage: 'img/cldr-engine-logo-bw.png',
  twitterImage: 'img/cldr-engine-logo-bw.png',
  repoUrl: 'https://github.com/phensley/cldr-engine',
  markdownPlugins: [
    function lists(md) {
      md.block.ruler.before('list', 'list', require('./markdown/list'));
      md.renderer.rules.list_item_open = function(tokens, idx) {
        return (tokens[idx].char === '*') ? '<li class="list">' : '<li>';
      };
    },
    function include(md) {
      const { parse, render } = require('./markdown/include');
      md.inline.ruler.push('include', parse(__dirname));
      md.renderer.rules.include = render(md);
    }
  ]
};

module.exports = siteConfig;
