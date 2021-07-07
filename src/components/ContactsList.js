
import Contact from "./Contact";

const ContactsList = ({contacts, selectedContactId, onSelect }) => {


  return (
    <div>
      {contacts.map((contact, index) => (
        <Contact
        onClick={() => onSelect(contact.id)}
          key={contact.id}
          id={index}
          title={contact.title}
          selected={selectedContactId === contact.id}
          releaseDate={contact.releaseDate}
          openingText={contact.openingText}
        />
      ))}
    </div>
  );
};

export default ContactsList;
