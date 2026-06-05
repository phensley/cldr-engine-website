/**
 * Home page — port of the v1 pages/en/index.js splash (logo, tagline, Docs
 * button) onto the v3 classic template.
 */
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  return (
    <Layout
      title=""
      description="CLDR internationalization and localization in Typescript, batteries-included">
      <main className="home-splash">
        <div className="container">
          <img className="home-splash__logo" src={useBaseUrl('img/cldr-engine-logo-bw.svg')} alt="cldr-engine" />
          <h2 className="home-splash__tagline">
            CLDR internationalization and localization in Typescript,
            batteries-included
          </h2>
          <div className="home-splash__actions">
            <Link className="button button--primary button--lg" to="/docs/doc-index">
              Docs
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/api-cldr">
              API Reference
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
