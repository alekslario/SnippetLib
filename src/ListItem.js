import React from "react";
import "./App.css";

const ListItem = ({ id, text, url, handleClick, onDelete }) => {
  const onLinkClick = () => handleClick(url);
  const onQuoteDelete = () => onDelete(id);
  return (
    <div className="list-item">
      <div>
        {text} {"  "}
        <div class="link-icon">
          <i className="fas fa-external-link-alt" onClick={onLinkClick} />
          <div class="url-tooltip">{url}</div>
        </div>
        {"  "}
      </div>
      <i className="fas fa-trash" onClick={onQuoteDelete} />
    </div>
  );
};

export default ListItem;
