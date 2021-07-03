import React from "react";

import Contact from "./Contact";

const ContactsList = (props) => {
  return (
    <div>
      {props.contacts.map((contact) => (
        <Contact
          key={contact.id}
          title={contact.title}
          releaseDate={contact.releaseDate}
          openingText={contact.openingText}
        />
      ))}
    </div>
  );
};

export default ContactsList;
