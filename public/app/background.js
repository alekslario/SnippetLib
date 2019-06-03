saveToQouter = function(word) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      var url = tabs[0].url;
      var key = "qouterQuotes";
      var id = Date.now();
      var selection = word.selectionText;
      chrome.storage.sync.get([key], function(result) {
        var quotes = result[key] || [];
        quotes.push({ url: url, quote: selection, id: id });
        chrome.storage.sync.set({
          [key]: quotes
        });
      });
    }
  );
};

chrome.contextMenus.create({
  title: "Save to your Snippet library",
  contexts: ["selection"],
  onclick: saveToQouter
});
