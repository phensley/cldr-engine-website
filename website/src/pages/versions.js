/**
 * Versions page — port of the v1 pages/en/versions.js onto the v3 theme.
 * Docusaurus 3.10 no longer ships a built-in versions page, so this small
 * page provides the /versions route (URL parity with the v1 site).
 */
import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useVersions } from '@docusaurus/plugin-content-docs/client';

const REPO = 'https://github.com/phensley/cldr-engine';

const ReleaseNotes = ({ version }) => (
  <Link href={`${REPO}/releases/tag/v${version}`}>Release Notes</Link>
);

const DocLink = ({ version }) => (
  <Link to={`/docs/${version.name === 'current' ? '' : version.name + '/'}doc-index`}>
    Documentation
  </Link>
);

export default function Versions() {
  const versions = useVersions();
  const current = versions.find(v => v.name === 'current');
  const archived = versions
    .filter(v => v.name !== 'current')
    .sort((a, b) => (a.name < b.name ? 1 : -1));

  return (
    <Layout title="Versions" description="@phensley/cldr versions">
      <main className="container margin-vert--lg">
        <h1>@phensley/cldr Versions</h1>
        <p>New versions of this project are released every so often.</p>

        <h3 id="latest">Current version (Stable)</h3>
        <table className="versions">
          <tbody>
            <tr>
              <th>{current.label}</th>
              <td><DocLink version={current} /></td>
              <td><ReleaseNotes version={current.label} /></td>
            </tr>
          </tbody>
        </table>
        <p>
          This is the version that is configured automatically when you first
          install this project.
        </p>

        <h3 id="archive">Past Versions</h3>
        <table className="versions">
          <tbody>
            {archived.map(version => (
              <tr key={version.name}>
                <th>{version.label}</th>
                <td><DocLink version={version} /></td>
                <td><ReleaseNotes version={version.label} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          You can find past versions of this project on <a href={REPO}>GitHub</a>.
        </p>
      </main>
    </Layout>
  );
}
