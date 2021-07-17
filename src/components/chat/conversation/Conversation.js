import React, { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import Message from "./message/Message";
import SendIcon from "../../UI/SendIcon";
import AuthContext from "../../../store/auth-context";
import { NEW_MESSAGE } from "../../../mutations/root.mutataions";
import { MESSAGE_SUBSCRIPTION } from "../../../subscriptions/root.subscription";

const Conversation = (props) => {
  const authCtx = useContext(AuthContext);
  const messageInputRef = useRef();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef();

  const onAddMessageSuccess = () => {
    props.onAddMessage(props.conversation.id);
  };
  
  const [addMessage, { data: messageData, subscribeToMore }] = useMutation(NEW_MESSAGE, {onCompleted: onAddMessageSuccess});
  
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    setMessages([...props.conversation.messages]);
  }, [props.conversation.messages]);

  const messageSubmitHandler = (event) => {
    event.preventDefault();
    const enteredMessage = messageInputRef.current.value;
    messageInputRef.current.value = "";

    if (enteredMessage.trim().length === 0) {
      return;
    }
    
    addMessage({
      variables: {
        chatId: props.conversation._id,
        from: authCtx.phone,
        to: props.contact,
        date: new Date().toISOString(),
        body: enteredMessage,
      }
    });
  };


  useEffect(() => {
    if (messageData?.newMessage) {
      setMessages((prevMessages) => {
        return [...prevMessages, messageData.newMessage];
      });
    }
  }, [messageData]);


  return (
    <div className="messages-panel">
      <div className="messages-list">
        {messages &&
          messages.map((message, index) => (
            <Message
              key={message._id}
              name={message.from.name}
              avatar={message.from.avatar}
              body={message.body}
              date={message.date}
              rigth={message.from.phone === authCtx.phone}
            />
          ))}
          <div ref={messagesEndRef}/>
      </div>
      <div className="messages-input">
        <form onSubmit={messageSubmitHandler}>
          <input ref={messageInputRef} type="text" placeholder="Type a message"/>
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
