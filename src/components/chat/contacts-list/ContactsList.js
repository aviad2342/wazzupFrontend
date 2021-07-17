import { useContext, useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import Contact from "./contact/Contact";
import AuthContext from "../../../store/auth-context";
import { CONTACTS } from "../../../queries/root.queries";
import { FaUserPlus } from 'react-icons/fa';

const ContactsList = (props) => {
  const authCtx = useContext(AuthContext);
  const [contactsList, setContactsList] = useState([]);
  const [fetchContacts, { data: contactsData }] = useLazyQuery(CONTACTS);
  const { loading, data } = useQuery(CONTACTS);

  const loadContects = () => {
    fetchContacts();
    if (!loading) {
      setContactsList(data.users.filter((c) => c.phone !== authCtx.phone));
    }
  };

  useEffect(() => {
    loadContects();
  }, [data]);

  const contactSelectedHandler = async (id) => {
    props.onSelect(id);
  };

  return (
    <div>
      {contactsList.map((contact, index) => (
        <Contact
          onSelectedContact={contactSelectedHandler}
          key={contact._id}
          id={contact._id}
          phone={contact.phone}
          name={contact.name}
          avatar={contact.avatar}
          lastMessage={contact.lastMessage}
        />
      ))}
      <div className="add-contact-div">
        <button className="add-contact-btn" onClick={props.onAddContact}>
          <span>
          <FaUserPlus />
          </span>
           Add Contact
        </button>
      </div>
    </div>
  );
};

export default ContactsList;
