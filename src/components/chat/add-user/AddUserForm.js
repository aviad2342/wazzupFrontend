import { useRef, useContext } from "react";

import AuthContext from "../../../store/auth-context";
import Modal from "../../UI/Modal";
import classes from "./AddUserForm.module.css";

const AddUserForm = (props) => {
  const emailInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current.value;

    fetch("http://localhost:8000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({from: authCtx.name, to: enteredEmail}),
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error('err');
          });
        }
      }).then((data) => {
          console.log(data);
        props.onClose();
      })
      .catch((err) => {
        // alert('auth ' + err.message);
        console.log('register ' + err.message);
      });
  };

  return (
      <Modal onClose={props.onClose} >
    <section className={classes.auth}>
      <h1>Add Contact</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            placeholder="Enter contact email"
          />
        </div>
        <div className={classes.actions}>
          <button type="submit" className={classes.button}>Send</button>
          <button  className={classes['button--alt']} onClick={props.onClose} >Close</button>
        </div>
      </form>
    </section>
    </Modal>
  );
};

export default AddUserForm;