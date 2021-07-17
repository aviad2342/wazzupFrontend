import React, {useContext, useEffect, useState } from "react";
import ContactsList from "./contacts-list/ContactsList";
import Conversation from "./conversation/Conversation";
import Header from './Header'
import ContactsListHeader from './contacts-list/ContactsListHeader'
import './chat.scss';
import AuthContext from '../../store/auth-context';
import { useLazyQuery } from "@apollo/client";
import { CHAT, CONTACT } from "../../queries/root.queries";
import AddUserForm from "./add-user/AddUserForm";
import { Fragment } from "react";
// const SERVER = "http://127.0.0.1:8000";

const chatIdGenerator = (phoneA, phoneB) => {
  return (Number(phoneA) > Number(phoneB)) ? phoneA + phoneB : phoneB + phoneA;
};

const Chat = (props) => {

  const authCtx = useContext(AuthContext);
  const [selectedContact, setSelectedContact] = useState(
    {_id: "000", phone: "0000", name: "select contact", avatar: "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"});
  const [fetchChat, {data: chatData}] = useLazyQuery(CHAT, {fetchPolicy: "cache-and-network"});
  const [fetchContact, {data: contactData}] = useLazyQuery(CONTACT);
  const [displayAddUserForm, setDisplayAddUserForm] = useState(false);

  const showAddUserFormHandler = () => {
    setDisplayAddUserForm(true);
  };

  const hideAddUserFormHandler = () => {
    setDisplayAddUserForm(false);
  };


const logoutHandler= () => {
  authCtx.logout();
}

const addMessageHandler = (chatId) => {
  fetchChat({variables: {
    chatId: chatId
  }});
};

useEffect(() => {
  if(contactData?.user) {
    setSelectedContact(contactData.user);
  }
}, [contactData])

const contactSelectedHandler = id => {
  const chatId = chatIdGenerator(authCtx.phone, id);
  if(chatId.length < 20) {
    return;
  }
  fetchContact({variables: { userPhone: id }});

  fetchChat({
    variables: {
      chatId: chatId
    },
  });
 }

  return (
    <div className="chat-app">
      <Fragment>
      {displayAddUserForm && <AddUserForm onClose={hideAddUserFormHandler}/>}
        <div className="contacts-list">
            <ContactsListHeader onLogout={logoutHandler} />
            <ContactsList onSelect={contactSelectedHandler} onAddContact={showAddUserFormHandler}/>
        </div>
        </Fragment>
        <div className="messages-section">
        <Header contact={selectedContact}/>
        {chatData?.chat && <Conversation conversation={chatData?.chat} contact={selectedContact.phone} onAddMessage={addMessageHandler}/>}
        </div>
    </div>
  );
};

export default Chat;
