import React, { useContext, useRef, useState } from "react";
import Message from "./message/Message";
import SendIcon from "../../UI/SendIcon";
import AuthContext from "../../../store/auth-context";

const Conversation = (props) => {
  const authCtx = useContext(AuthContext);
  const messageInputRef = useRef();
  const [messages, setMessages] = useState([...props.conversation.messages]);
  // const [message, setMessage] = useState(null);


  const messageSubmitHandler = (event) => {
    event.preventDefault();
    // let messagesList = [...messages];
    const enteredMessage = messageInputRef.current.value;
    if (enteredMessage.trim().length === 0) {
      return
    }
    let requestBody = {
      query: `
      mutation {
        newMessage(newMessageInput:{chatId:"${props.conversation._id}",
         from:"${authCtx.phone}", 
         to:"${props.contact}", 
         date:"${new Date().toISOString()}", 
         body:"${enteredMessage}"}) 
         {
          date
          body
          from{
            _id
            phone
            name
            avatar
          }
          to {
            _id
            phone
            name
            avatar
          }
          _id
          }
        }
      `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
        // setIsLoading(false);

        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Failed to fetch message!";
            throw new Error(errorMessage);
          });
        }
      }).then((data) => {
        // setMessage(data.data.newMessage);
        newMessageHandler(data.data.newMessage);
        messageInputRef.current.value = "";
      })
      .catch((err) => {
        console.log('chat ' + err.message);
      });
  };

  const newMessageHandler = (message) => {
    setMessages((prevMessages) => {
      return [...prevMessages, message];
    });
  };

  return (
    <div className="messages-panel">
      <div className="messages-list">
        {messages && messages.map((message, index) => (
          <Message
            key={index}
            name={message.from.name}
            avatar={message.from.avatar}
            body={message.body}
            date={message.date}
            rigth={message.from.phone === authCtx.phone}
          />
        ))}
      </div>
      <div className="messages-input">
        <form onSubmit={messageSubmitHandler}>
        <input ref={messageInputRef} type="text" />
        <button type="submit">
          <span>
            <SendIcon />
          </span>
        </button>
        </form>
      </div>
    </div>
  );
};

export default Conversation;
