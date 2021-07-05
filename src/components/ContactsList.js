
import Contact from "./Contact";

const ContactsList = (props) => {


  return (
    <div>
      {props.contacts.map((contact, index) => (
        <Contact
          key={contact.id}
          id={index}
          title={contact.title}
          releaseDate={contact.releaseDate}
          openingText={contact.openingText}
        />
      ))}
    </div>
  );
};

export default ContactsList;
