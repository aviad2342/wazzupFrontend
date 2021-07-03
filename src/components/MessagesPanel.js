import React from "react";
import Message from "./Message";
import ChatBubble from "./UI/ChatBubble";

const MessagesPanel = (props) => {
  return (
    <div className="messages-panel">
      <div className="meesages-list">
          <ChatBubble />
        {/* {props.messages.map((message) => (
          <Message
            key={message.id}
            title={message.title}
            releaseDate={message.releaseDate}
            openingText={message.openingText}
          />
        ))} */}
      </div>
      <div className="messages-input">
        <input type="text" />
        <button>Send</button>
      </div>
    </div>
  );
};

export default MessagesPanel;
