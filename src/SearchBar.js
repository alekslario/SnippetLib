import React from "react";

const SearchBar = ({ onSearch, regex, onCancel }) => {
  const onChange = e => {
    const inputValue = e.target.value;
    if (e.target.name === "text") {
      onSearch(inputValue, regex.options);
    } else {
      if (!/^$|^ig$|^gi$|^g$|^i$/.test(inputValue)) return;
      onSearch(regex.text, inputValue);
    }
  };
  const handleCancel = () => onCancel();
  return (
    <div className="search_bar">
      <span className="slash">/</span>{" "}
      <input
        type="text"
        name="text"
        maxlength="80"
        value={regex.text}
        onChange={e => onChange(e)}
      />
      {regex.text.length > 0 ? (
        <i className="fas fa-times-circle" onClick={handleCancel} />
      ) : (
        <i className="fas fa-search" />
      )}
      <span className="slash">/</span>
      <input
        type="text"
        name="options"
        className="inputOptions"
        maxlength="2"
        value={regex.options}
        onChange={e => onChange(e)}
      />
    </div>
  );
};

export default SearchBar;
