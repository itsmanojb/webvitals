import { getLCP, getFID, getCLS, getFCP, getTTFB } from 'web-vitals';

const infoDiv = document.createElement('div');
infoDiv.style.position = 'fixed';
infoDiv.style.left = '6px';
infoDiv.style.bottom = '6px';
infoDiv.style.zIndex = 999999;
infoDiv.style.backgroundColor = 'rgba(0,0,0,0.8)';
infoDiv.style.color = '#FFF';
infoDiv.style.padding = '1.5rem';
infoDiv.style.fontFamily = 'Helvetica';
infoDiv.style.fontSize = '15px';
infoDiv.style.borderRadius = '2px';

document.body.appendChild(infoDiv);

const metrics = {};

const gatherMetrics = ({ name, value }) => {
  metrics[name] = value;

  chrome.runtime.sendMessage({
    type: 'webvital:metrics',
    name,
    value,
  });

  const metricsHTML = Object.keys(metrics)
    .map((key) => `<div >${key}</div><div>${Math.round(metrics[key])}</div>`)
    .join('');

  infoDiv.innerHTML = `
  <div style="font-weight:bold; font-size:18px;">Web Vitals</div>
  <div style="display:grid; grid-template-columns:1fr 1fr; grid-column-gap:10px;margin:10px 0">
    <div>Metric</div>
    <div>Value</div>
    ${metricsHTML}
  </div>
  `;
};

getCLS(gatherMetrics);
getFID(gatherMetrics);
getLCP(gatherMetrics);
getFCP(gatherMetrics);
getLCP(gatherMetrics);
getTTFB(gatherMetrics);
