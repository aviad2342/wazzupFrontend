
import { useCallback, useContext, useEffect, useState } from "react";
import Contact from "./contact/Contact";
import AuthContext from "../../../store/auth-context";

const ContactsList = (props) => {

  const authCtx = useContext(AuthContext);
  const [contactsList, setContactsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContactsHandler = useCallback(async () => {
    setIsLoading(true);
    let content = <p>No contacts Found.</p>;
    let requestBody = {
      query: `
      query {
        users {
          _id
          phone
          name
          avatar
        }
      }
      `
    };
  
    await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
      content = <p>Loading...</p>;
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Failed to fetch Contacts!";
            content = <p>{errorMessage}</p>;
            throw new Error(errorMessage);
          });
        }
      }).then((data) => {
        setContactsList(data.data.users.filter(c => c.phone !== authCtx.phone));
      })
      .catch((err) => {
        console.log('contacts ' + err.message);
        // alert('contacts ' + err.message);
      });
  }, []);

  useEffect(() => {
    fetchContactsHandler();
  }, [fetchContactsHandler]);

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
    </div>
  );
};

export default ContactsList;
