import React, { useCallback, useEffect, useState } from "react";
import socketClient from "socket.io-client";
// import { io } from "socket.io-client";
import ContactsList from "./ContactsList";
import MessagesPanel from "./MessagesPanel";
import Header from './Layout/Header'
import ContactsListHeader from './Layout/ContactsListHeader'
import './chat.scss';
const SERVER = "http://127.0.0.1:8000";

const Chat = (props) => {

    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);

    // const socket = io(SERVER);
    // socket.on("connect", () => {
    //   console.log(socket.id);
    // });

    const fetchContactsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
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
  const socket = socketClient(SERVER);

  const configureSocket = useCallback(async () => {
    socket.on("connection", () => {
      // this.socket.emit('data', 2, ack => {
      //   console.log(ack);
      // });
    });
    socket.on("client", res => {
      setResponse(res);
      console.log(response);
  });
  }, [socket]);


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

  const handleSendMessage = () => {
    socket.emit('data', 5);
}

  useEffect(() => {
    configureSocket();
    // return () => socket.disconnect();
  }, [configureSocket,socket]);

  let content = <p>Found no movies.</p>;

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
      <button onClick={handleSendMessage} />
        <div className="contacts-list">
            <ContactsListHeader />
            {content}
        </div>
        <div className="messages-section">
        <Header />
        <MessagesPanel messages={contacts}/>
        </div>
      {/* <ChannelList channels={channels} onSelectChannel={handleChannelSelect} />
                <MessagesPanel onSendMessage={handleSendMessage} channel={channel} /> */}
    </div>
  );
};

export default Chat;
