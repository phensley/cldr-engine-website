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
  headerLinks: [
    { doc: 'doc-index', label: 'Docs' },
    { href: '/cldr-engine/liveapi.html', label: 'Live API'},
    { href: 'https://github.com/phensley/cldr-engine', label: 'Github' },
    { href: 'https://www.npmjs.com/package/@phensley/cldr', label: 'NPM' }
  ],
  users,
  headerIcon: 'img/cldr-engine-logo-w.svg',
  footerIcon: 'img/cldr-engine-logo-w.svg',
  favicon: 'img/favicon.png',
  colors: {
    primaryColor: '#2c2c2e',
    secondaryColor: '#59585d'
  },
  highlight: {
    theme: 'vs2015'
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
    }
  ]
};

module.exports = siteConfig;
