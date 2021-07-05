import React, { useState } from "react";
// import Message from "./Message";
import ChatBubble from "./UI/ChatBubble";
import SendIcon from './UI/SendIcon'

const MessagesPanel = (props) => {

  const [enteredMessage, setEnteredMessage] = useState('');

  const messageSubmitHandler = (event) => {
    setEnteredMessage(event.target.value);
    const newMessage = {
      id: 8,
      title: enteredMessage,
      openingText: 'test',
      eleaseDate: 'test'
    }
    props.onNewMessage(newMessage);
    setEnteredMessage('');
  };
  const typeingMessageButtonHandler = (event) => {
    setEnteredMessage(event.target.value);
  };

  return (
    <div className="messages-panel">
      <div className="messages-list">
        {props.messages.map((message) => (
          <ChatBubble
            key={message.id}
            id={message.id}
            title={message.title}
            releaseDate={message.releaseDate}
            openingText={message.openingText}
          />
        )) 
        
        /* {props.messages.map((message) => (
          <Message
            key={message.id}
            title={message.title}
            releaseDate={message.releaseDate}
            openingText={message.openingText}
          />
        ))} */}
      </div>
      <div className="messages-input">
        <input value={enteredMessage} onChange={typeingMessageButtonHandler} type="text" />
        <button onClick={messageSubmitHandler}>
        <span>
        <SendIcon />
      </span>
        </button>
      </div>
    </div>
  );
};

export default MessagesPanel;
