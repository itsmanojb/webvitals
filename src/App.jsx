import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './App.css';

const METRICES = ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'];

const App = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        type: 'webvital:metrics:request',
      },
      (data) => {
        setData(data);
        console.log(data);
      }
    );
  }, []);

  return (
    <div>
      <h1>WebVital Metrices</h1>
      <table>
        <thead>
          <tr>
            <th style={{ width: '20%' }}>URL</th>
            {METRICES.map((metric) => (
              <th key={metric} style={{ width: '16%' }}>
                {metric}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((url) => (
            <tr key={url}>
              <td style={{ width: '20%' }}>{url}</td>
              {METRICES.map((metric) => (
                <td key={[url, metric].join('')} style={{ width: '16%' }}>
                  {Math.round((data[url][metric] || { average: 0 }).average)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
