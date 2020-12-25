const data = {};

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === 'webvital:metrics') {
    const tab = sender.tab.url.toString();
    data[tab] = data[tab] || {};

    const name = req.name;
    data[tab][name] = data[tab][name] || {
      values: [],
      average: 0,
    };

    data[tab][name].values.push(req.value);
    data[tab][name].average =
      data[tab][name].values.reduce((acc, val) => acc + val, 0) /
      data[tab][name].values.length;
  }

  if (req.type === 'webvital:metrics:request') {
    sendResponse(data);
  }
});
