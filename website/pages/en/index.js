const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock;
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

const imgUrl = (img) => siteConfig.baseUrl + 'img/' + img;
const docUrl = (doc, lang) => siteConfig.baseUrl + 'docs/' + (lang ? lang + '/' : '') + doc;
const pageUrl = (page, lang) => siteConfig.baseUrl + (lang ? lang + '/' : '') + page;

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <div className="inner">
          {/* <ProjectTitle /> */}
          <img src={imgUrl('cldr-engine-logo-bw.svg')} />
          <h2 className="projectTitle">
            <small>{siteConfig.tagline}</small>
          </h2>
          <PromoSection>
            {/* <Button href="#try">Try It Out</Button> */}
            <Button href={docUrl('doc-index.html', language)}>Docs</Button>
            {/* <Button href={docUrl('doc2.html', language)}>Example Link 2</Button> */}
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Sandbox = props => (
  <Container padding={['bottom', 'top']}
  id={props.id}
  background={props.background}>
    <iframe src="https://codesandbox.io/embed/qqr1rl40r6?fontsize=12" style={{ width: '100%', height: '700px', border: 0, borderRadius: '4px', overflow: 'hidden'}} sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'></iframe>
  </Container>
);

const Features = props => (
  <Block layout="twoColumn">
    {[
      // {
      //   title: 'Broad and deep CLDR-based functionality',
      //   content: 'Locale parsing, language matching, calendars, numbers, currencies, names, units of measure, etc',
      //   image: imgUrl('docusaurus.svg'),
      //   imageAlign: 'top',
      // },
      // {
      //   title: 'Date formatting in multiple calendars',
      //   content: 'Gregorian, Japanese, Buddhist, Persian',
      //   image: imgUrl('docusaurus.svg'),
      //   imageAlign: 'top',
      // },
      // {
      //   title: 'Extensive language and region support',
      //   content: '77 languages, 360 modern locales',
      //   image: imgUrl('docusaurus.svg'),
      //   imageAlign: 'top',
      // },
      {
        title: 'Arbitrary precision decimal math',
        content: 'Handle large and small numbers and currency values with precision',
        image: imgUrl('factorial.png'),
        imageAlign: 'top',
      },
      // {
      //   title: 'Compact resource bundles',
      //   content: 'Faster loading at runtime. All 104 English locales fit in a single 34 KB gzipped file',
      //   image: imgUrl('docusaurus.svg'),
      //   imageAlign: 'top',
      // },
    ]}
  </Block>
);

// const FeatureCallout = props => (
//   <div
//     className="productShowcaseSection paddingBottom"
//     style={{textAlign: 'center'}}>
//     <h2>Feature Callout</h2>
//     <MarkdownBlock>These are features of this project</MarkdownBlock>
//   </div>
// );

// const LearnHow = props => (
//   <Block background="light">
//     {[
//       {
//         content: 'Talk about learning how to use this',
//         image: imgUrl('docusaurus.svg'),
//         imageAlign: 'right',
//         title: 'Learn How',
//       },
//     ]}
//   </Block>
// );

// const TryOut = props => (
//   <Block id="try">
//     {[
//       {
//         content: 'Talk about trying this out',
//         image: imgUrl('docusaurus.svg'),
//         imageAlign: 'left',
//         title: 'Try it Out',
//       },
//     ]}
//   </Block>
// );

// const Description = props => (
//   <Block background="dark">
//     {[
//       {
//         content: 'This is another description of how this project is useful',
//         image: imgUrl('docusaurus.svg'),
//         imageAlign: 'right',
//         title: 'Description',
//       },
//     ]}
//   </Block>
// );

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} alt={user.caption} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"Who's Using This?"}</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          {/* <Features /> */}
          {/* <FeatureCallout /> */}
          {/* <LearnHow /> */}
          {/* <TryOut /> */}
          {/* <Sandbox /> */}
          {/* <Description /> */}
          {/* <Showcase language={language} /> */}
        </div>
      </div>
    );
  }
}

module.exports = Index;
