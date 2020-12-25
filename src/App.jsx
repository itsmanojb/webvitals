import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './App.css';

const METRICES = ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'];

const App = () => {
  const [data, setData] = useState({});
  const [tableView, setTableView] = useState(false);
  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        type: 'webvital:metrics:request',
      },
      (data) => {
        setData(data);
      }
    );
  }, []);

  return (
    <div>
      <h1>WebVitals - Performance Metrices</h1>
      {Object.keys(data).length === 0 ? (
        <div className="noData">
          No data available. Browse around and results will be visible here.
        </div>
      ) : (
        <>
          <div className="viewSwitch">
            <span>Table View</span>
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e) => setTableView(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          {tableView ? (
            <div className="table-ui">
              <table>
                <thead>
                  <tr>
                    <th>URL</th>
                    {METRICES.map((metric) => (
                      <th key={metric} style={{ textAlign: 'center' }}>
                        {metric}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(data).map((url) => (
                    <tr key={url}>
                      <td>{url}</td>
                      {METRICES.map((metric) => (
                        <td
                          key={[url, metric].join('')}
                          style={{ textAlign: 'center' }}
                        >
                          {Math.round(
                            (data[url][metric] || { average: 0 }).average
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="detailsView">
              {Object.keys(data).map((url) => (
                <details key={url}>
                  <summary>{url}</summary>
                  <div className="details">
                    <table>
                      <thead>
                        <tr>
                          {METRICES.map((metric) => (
                            <th key={metric} style={{ width: '20%' }}>
                              {metric}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {METRICES.map((metric) => (
                            <td
                              key={[url, metric].join('')}
                              style={{ width: '20%' }}
                            >
                              {Math.round(
                                (data[url][metric] || { average: 0 }).average
                              )}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </details>
              ))}
            </div>
          )}
        </>
      )}
      <footer>
        <p>
          <strong>N.B.</strong> Averaged value shown (in milisecond)
        </p>
        Web Vitals is an initiative by Google to provide unified guidance for
        quality signals that are essential to delivering a great user experience
        on the web.{' '}
        <a
          href="https://web.dev/vitals/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      </footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
