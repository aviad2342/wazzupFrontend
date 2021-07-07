import React, { useState } from "react";
// import Message from "./Message";
import Message from "./message/Message";
import SendIcon from '../../UI/SendIcon'

const Conversation = (props) => {

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
        {props.conversation.messages.map((message, index) => (
          <Message
            key={index}
            name={props.conversation.users.find(u => u.id === message.from).name}
            avatar={props.conversation.users.find(u => u.id === message.from).avatar}
            body={message.body}
            date={message.date}
            rigth={message.from === '0525371804'}
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

export default Conversation;
