import React from "react";

const Message = (props) => {
  return (
    <div className="message-item">
      <div>{props.title}</div>
      <p>{props.releaseDate}</p>
    </div>
  );
};

export default Message;
