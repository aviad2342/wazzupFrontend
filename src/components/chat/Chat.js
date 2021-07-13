import React, {useContext, useState } from "react";
import ContactsList from "./contacts-list/ContactsList";
import Conversation from "./conversation/Conversation";
import Header from './Header'
import ContactsListHeader from './contacts-list/ContactsListHeader'
import './chat.scss';
import AuthContext from '../../store/auth-context';
// const SERVER = "http://127.0.0.1:8000";

const chatIdGenerator = (phoneA, phoneB) => {
  return (Number(phoneA) > Number(phoneB)) ? phoneA + phoneB : phoneB + phoneA;
};

const Chat = (props) => {

  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState({_id: "", phone: "", name: "select contact", avatar: "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"});
  const [chat, setChat] = useState(null);
  // const [messages, setMessages] = useState(null);
  // const [messages, setMessages] = useState([]);


  const fetchChat = (id) => {
    setIsLoading(true);
    if(id.length < 20) {
      return;
    }
    let requestBody = {
      query: `
      mutation {
        chat(chatId:"${id}") {
          _id
          id
          messages{
            _id
            from {
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
            date
            body
          }
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
        setIsLoading(false);

        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Failed to fetch chat!";
            throw new Error(errorMessage);
          });
        }
      }).then((data) => {
        setChat(data.data.chat)
        // setMessages(chat.messages);
      })
      .catch((err) => {
        console.log('chat ' + err.message);
      });
  };

  const fetchContact = (userPhone) => {
    let requestBody = {
      query: `
      mutation {
        user(userPhone:"${userPhone}") {
          _id
          phone
          name
          avatar
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
        setIsLoading(false);

        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Failed to fetch contact!";
            throw new Error(errorMessage);
          });
        }
      }).then((data) => {
        setSelectedContact(data.data.user)
      })
      .catch((err) => {
        console.log('chat ' + err.message);
      });
  };

const logoutHandler= () => {
  authCtx.logout();
}

const contactSelectedHandler = id => {
  const chatId = chatIdGenerator(authCtx.phone, id);
  fetchContact(id);
  fetchChat(chatId);
 }

//  const newMessageHandler = (message) => {
//   setMessages((prevMessages) => {
//     return [message, ...prevMessages];
//   });
// };


//  const handleSendMessage = message => {
//    console.log(message);
//  }


  return (
    <div className="chat-app">
        <div className="contacts-list">
            <ContactsListHeader onLogout={logoutHandler} />
            <ContactsList onSelect={contactSelectedHandler} />
        </div>
        <div className="messages-section">
        <Header contact={selectedContact}/>
        {chat && <Conversation conversation={chat} contact={selectedContact.phone}/>}
        </div>
    </div>
  );
};

export default Chat;
