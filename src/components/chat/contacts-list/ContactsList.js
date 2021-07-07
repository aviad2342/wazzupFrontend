
import Contact from "./contact/Contact";

const ContactsList = ({contacts, selectedContactId, onSelect }) => {

  const DUMMY_CONTACTS = [
    {
      id: "0525371804",
      name: "Aviad ben hayun",
      avatar: "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png",
      lastMessage: '2021-07-07T16:25:04.615Z'
    },
    {
      id: "0523698741",
      name: "Mor shimoni",
      avatar: 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png',
      lastMessage: '2021-07-07T16:25:04.615Z'
    },
    {
      id: "0523698745",
      name: "Avi salem",
      avatar: "https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png",
      lastMessage: '2021-07-07T16:25:04.615Z'
    },
    {
      id: "0525394587",
      name: "Dan levi",
      avatar: "https://avatarfiles.alphacoders.com/791/79102.png",
      lastMessage: '2021-07-07T16:25:04.615Z'
    },
  ];

  return (
    <div>
      {DUMMY_CONTACTS.map((contact, index) => (
        <Contact
        onClick={() => onSelect(contact.id)}
          key={contact.id}
          id={contact.id}
          name={contact.name}
          avatar={contact.avatar}
          lastMessage={contact.lastMessage}
        />
      ))}
    </div>
  );
};

export default ContactsList;
