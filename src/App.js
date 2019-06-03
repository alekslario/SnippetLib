import React, { useState } from "react";
import ListItem from "./ListItem";
import SearchBar from "./SearchBar";
/*global chrome*/

const handleClick = url => {
  chrome.tabs.create({ url: url, active: false });
};
const App = ({ quotes, regex }) => {
  const [myQuotes, setQuotes] = useState(quotes);
  const [myRegex, setRegex] = useState(regex);

  const onCancel = _ => {
    const defaultRegex = { text: "", options: "gi" };
    chrome.storage.sync.set(
      {
        qouterRegex: defaultRegex
      },
      () => setRegex(defaultRegex)
    );
  };

  const onSearch = (text, options) => {
    const newRegex = { text: text, options: options };
    chrome.storage.sync.set(
      {
        qouterRegex: newRegex
      },
      () => setRegex(newRegex)
    );
  };

  const onDelete = id => {
    chrome.storage.sync.get(["qouterQuotes"], result => {
      const storedQuotes = result["qouterQuotes"] || [];
      const updatedQuotes = storedQuotes.filter(ele => ele.id !== id);

      chrome.storage.sync.set(
        {
          qouterQuotes: updatedQuotes
        },
        () => setQuotes(updatedQuotes)
      );
    });
  };

  return (
    <div className="App">
      <SearchBar onSearch={onSearch} regex={myRegex} onCancel={onCancel} />
      <ul>
        {myQuotes
          .filter(ele => RegExp(myRegex.text, myRegex.options).test(ele.quote))
          .sort((a, b) => b.id - a.id)
          .map(({ url, quote, id }, index) => {
            return (
              <li key={index}>
                <ListItem
                  id={id}
                  text={quote}
                  url={url}
                  handleClick={handleClick}
                  onDelete={onDelete}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default App;
