import React, { useCallback, useContext, useEffect, useState } from "react";
import socketClient from "socket.io-client";
// import { io } from "socket.io-client";
import ContactsList from "./contacts-list/ContactsList";
import Conversation from "./conversation/Conversation";
import Header from './Header'
import ContactsListHeader from './contacts-list/ContactsListHeader'
import './chat.scss';
import AuthContext from '../../store/auth-context';
const SERVER = "http://127.0.0.1:8000";

const DUMMY_CONVERSATIONS = [
  {
    _id: 'dsfnsdjnjksdnfjkl324234',
    id: "05253718040523698741",
    users: [{id: "0525371804", name: "Aviad ben hayun", avatar: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'},
     {id: "0523698741", name: "Mor shimoni", avatar: 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'}],
    messages: [
      {from: '0525371804', date:'2021-07-07T16:22:04.615Z' , body: 'Hey, check out this Pure CSS speech bubble'},
      {from: '0523698741', date:'2021-07-07T16:23:04.615Z' , body: 'Nice... this will work great for my new project.'},
      {from: '0525371804', date:'2021-07-07T16:23:03.615Z' , body: 'Hey, asdfsdfsd sgdfged hdfh '},
      {from: '0525371804', date:'2021-07-07T16:23:04.615Z' , body: 'Hey, sh hsghsghsg s sjjs ff '},
      {from: '0523698741', date:'2021-07-07T16:25:04.615Z' , body: 'Hey,  hfdjhjghjkjhkhjkhkghk'}
    ]
    
  },
  {
    _id: 'dsfnsdjnjksdnfjkl324234',
    id: "052369874120523698745",
    users: [{id: "0525371804", name: "Aviad ben hayun", avatar: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'},
     {id: "0523698741", name: "Mor shimoni", avatar: 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'}],
    messages: [
      {from: '0525371804', date:'2021-07-07T16:22:04.615Z' , body: 'Hey, check out this Pure CSS speech bubble'},
      {from: '0523698741', date:'2021-07-07T16:23:04.615Z' , body: 'Nice... this will work great for my new project.'},
      {from: '0525371804', date:'2021-07-07T16:23:03.615Z' , body: 'Hey, asdfsdfsd sgdfged hdfh '},
      {from: '0525371804', date:'2021-07-07T16:23:04.615Z' , body: 'Hey, sh hsghsghsg s sjjs ff '},
      {from: '0523698741', date:'2021-07-07T16:25:04.615Z' , body: 'Hey,  hfdjhjghjkjhkhjkhkghk'}
    ]
  },
  {
    _id: 'dsfnsdjnjksdnfjkl324234',
    id: "05253718040523698745",
    users: [{id: "0525371804", name: "Aviad ben hayun", avatar: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'},
     {id: "0523698741", name: "Mor shimoni", avatar: 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'}],
    messages: [
      {from: '0525371804', date:'2021-07-07T16:22:04.615Z' , body: 'Hey, check out this Pure CSS speech bubble'},
      {from: '0523698741', date:'2021-07-07T16:23:04.615Z' , body: 'Nice... this will work great for my new project.'},
      {from: '0525371804', date:'2021-07-07T16:23:03.615Z' , body: 'Hey, asdfsdfsd sgdfged hdfh '},
      {from: '0525371804', date:'2021-07-07T16:23:04.615Z' , body: 'Hey, sh hsghsghsg s sjjs ff '},
      {from: '0523698741', date:'2021-07-07T16:25:04.615Z' , body: 'Hey,  hfdjhjghjkjhkhjkhkghk'}
    ]
  },
  {
    _id: 'dsfnsdjnjksdnfjkl324234',
    id: "05253945870523698745",
    users: [{id: "0525371804", name: "Aviad ben hayun", avatar: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'},
     {id: "0523698741", name: "Mor shimoni", avatar: 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'}],
    messages: [
      {from: '0525371804', date:'2021-07-07T16:22:04.615Z' , body: 'Hey, check out this Pure CSS speech bubble'},
      {from: '0523698741', date:'2021-07-07T16:23:04.615Z' , body: 'Nice... this will work great for my new project.'},
      {from: '0525371804', date:'2021-07-07T16:23:03.615Z' , body: 'Hey, asdfsdfsd sgdfged hdfh '},
      {from: '0525371804', date:'2021-07-07T16:23:04.615Z' , body: 'Hey, sh hsghsghsg s sjjs ff '},
      {from: '0523698741', date:'2021-07-07T16:25:04.615Z' , body: 'Hey,  hfdjhjghjkjhkhjkhkghk'}
    ]
  },
];

const Chat = (props) => {

  const authCtx = useContext(AuthContext);

    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    // const socket = io(SERVER);
    // socket.on("connect", () => {
    //   console.log(socket.id);
    // });

  //   const fetchContact = () => {
  //     setIsLoading(true);
  //     setError(null);
  //     fetch('https://swapi.dev/api/films/').then( (response) => {
  //       return response.json();
  //     }).then((data) => {
  //       const transformedContacts = data.results.map((contactsData) => {
  //         return {
  //           id: contactsData.episode_id,
  //           title: contactsData.title,
  //           openingText: contactsData.opening_crawl,
  //           releaseDate: contactsData.release_date,
  //         };
  //       });
  //       setContacts(transformedContacts);

  //     }).catch( (error) => {
  //       setError(error);

  //     }).finally(() => {
  //       setIsLoading(false);

  //     });
  // };

  const fetchContactsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    console.log(authCtx.name);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const transformedContacts = data.results.map((contactsData) => {
        return {
          id: contactsData.episode_id,
          title: contactsData.title,
          openingText: contactsData.opening_crawl,
          releaseDate: contactsData.release_date,
        };
      });
      setContacts(transformedContacts);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // const socket = socketClient(SERVER);

  // const configureSocket = useCallback(async () => {
  //   socket.on("connection", () => {
  //     // this.socket.emit('data', 2, ack => {
  //     //   console.log(ack);
  //     // });
  //   });
  //   socket.on("client", res => {
  //     setResponse(res);
  //     console.log(response);
  // });
  // }, [socket, response]);


  // useEffect(() => {
  //   console.log('hi');
  //   fetchContact();
  // }, []);

  useEffect(() => {
    fetchContactsHandler();
  }, [fetchContactsHandler]);

  // useEffect(() => {
  //   const socket = socketClient(SERVER);
  //   socket.on("connection", () => {
  //     this.socket.emit('data', 2, ack => {
  //       console.log(ack);
  //     });
  //   });
  //   socket.on("client", response => {
  //     console.log(response);
  // });


  //   return () => socket.disconnect();
  // }, []);

//   const handleSendMessage = (newMessage) => {
//     socket.emit('data', 5);
//     contacts.push(newMessage);
// }

const logoutHandler= () => {
  authCtx.logout();
  // history.replace('/auth');
}

  // useEffect(() => {
  //   configureSocket();
  //   return () => socket.disconnect();
  // }, [configureSocket,socket]);

  let content = <p>No contacts Found.</p>;

  if (contacts.length > 0) {
    content = <ContactsList contacts={contacts} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  //     const [channels, setChannels] = useState(null);
  //     const [socket, setSocket] = useState(null);
  //     const [channel, setChannel] = useState(null);

  //     // state = {
  //     //     channels: null,
  //     //     socket: null,
  //     //     channel: null
  //     // }

  //     // socket;
  //     loadChannels();
  //     configureSocket();
  //     // const componentDidMount = () => {
  //     //     console.log('ho');
  //     //     loadChannels();
  //     //     configureSocket();
  //     // }

  //    const configureSocket = () => {
  //         var socket = socketClient(SERVER);
  //         socket.on('connection', () => {
  //             if (channel) {
  //                 handleChannelSelect(channel.id);
  //             }
  //         });
  //         socket.on('channel', channel => {

  //             let channels = channels;
  //             channels.forEach(c => {
  //                 if (c.id === channel.id) {
  //                     c.participants = channel.participants;
  //                 }
  //             });
  //             setChannels(channels);
  //         });
  //         socket.on('message', message => {

  //             let channels = channels;
  //             channels.forEach(c => {
  //                 if (c.id === message.channel_id) {
  //                     if (!c.messages) {
  //                         c.messages = [message];
  //                     } else {
  //                         c.messages.push(message);
  //                     }
  //                 }
  //             });
  //             setChannels({ channels });
  //         });
  //         // socket = socket;
  //         setSocket(socket);
  //     }

  //     const loadChannels = async () => {
  //         fetch('http://localhost:8080/getChannels').then(async response => {
  //             let data = await response.json();
  //             console.log(data);
  //             setChannels(data.channels);
  //         })
  //     }

  //     function handleChannelSelect

  //     const handleChannelSelect = id => {
  //         let channel = channels.find(c => {
  //             return c.id === id;
  //         });
  //         setChannel(channel);
  //         socket.emit('channel-join', id, ack => {
  //         });
  //     }

  //      const handleSendMessage = (channel_id, text) => {
  //         socket.emit('send-message', { channel_id, text, senderName: socket.id, id: Date.now() });
  //     }

  return (
    <div className="chat-app">
      {/* {false && <button onClick={handleSendMessage} />} */}
        <div className="contacts-list">
            <ContactsListHeader onLogout={logoutHandler} />
            {content}
        </div>
        <div className="messages-section">
        <Header />
        <Conversation conversation={DUMMY_CONVERSATIONS.find(c => c.id === '05253718040523698741')} />
        {/* <MessagesPanel messages={contacts} onNewMessage={handleSendMessage}/> */}
        </div>
      {/* <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
                <MessagesPanel onSendMessage={handleSendMessage} channel={channel} /> */}
    </div>
  );
};

export default Chat;
