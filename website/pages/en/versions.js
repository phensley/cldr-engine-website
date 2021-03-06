/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary');

const Container = CompLibrary.Container;

const CWD = process.cwd();

const versions = require(`${CWD}/versions.json`);

function Versions(props) {
  const { config: siteConfig } = props;
  const latestVersion = versions[0];
  const repoUrl = `https://github.com/${siteConfig.organizationName}/${
    siteConfig.projectName
    }`;
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer versionsContainer">
        <div className="post">
          <header className="postHeader">
            <h1>{siteConfig.title} Versions</h1>
          </header>
          <p>New versions of this project are released every so often.</p>
          <h3 id="latest">Current version (Stable)</h3>
          <table className="versions">
            <tbody>
              <tr>
                <th>{latestVersion}</th>
                <td>
                  <a href={`${siteConfig.baseUrl}${siteConfig.docsUrl}/${
                    props.language
                    }/doc-index`}>Documentation</a>
                </td>
                <td>
                  <a href={`${repoUrl}/releases/tag/v${latestVersion}`}>Release Notes</a>
                </td>
                {versions[1] && <td>
                  <a href={`${repoUrl}/compare/v${versions[1]}...v${latestVersion}`}>Changes</a>
                </td>}
              </tr>
            </tbody>
          </table>
          <p>
            This is the version that is configured automatically when you first
            install this project.
          </p>

          <h3 id="rc">Latest Version</h3>
          Here you can find the latest documentation for unreleased code.
          <table className="versions">
            <tbody>
              <tr>
                <th>master</th>
                <td>
                  <a
                    href={`${siteConfig.baseUrl}${siteConfig.docsUrl}/${
                      props.language
                      }/next/doc-index`}>
                    Documentation
                  </a>
                </td>
                <td>
                  <a href={repoUrl}>Source Code</a>
                </td>
                <td>
                  <a href={`${repoUrl}/compare/v${latestVersion}...master`}>Changes</a>
                </td>
              </tr>
            </tbody>
          </table>

          <h3 id="archive">Past Versions</h3>
          <table className="versions">
            <tbody>
              {versions.map(
                (version, i) => {
                  if (i === 0) {
                    return null;
                  }

                  const prevVersion = versions[i + 1];
                  return (
                    <tr key={i}>
                      <th>{version}</th>
                      <td>
                        <a href={`${siteConfig.baseUrl}${siteConfig.docsUrl}/${
                          props.language
                          }/${version}/doc-index`}>Documentation</a>
                      </td>
                      <td>
                        <a href={`${repoUrl}/releases/tag/v${version}`}>Release Notes</a>
                      </td>
                      <td>
                        {prevVersion && <a href={`${repoUrl}/compare/v${prevVersion}...v${version}`}>Changes</a>}
                      </td>
                    </tr>
                  )
                }
              )}
            </tbody>
          </table>
          <p>
            You can find past versions of this project on{' '}
            <a href={repoUrl}>GitHub</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}

module.exports = Versions;
