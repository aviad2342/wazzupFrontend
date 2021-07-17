import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import {useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { NEW_USER } from "../mutations/root.mutataions";
import classes from "./RegisterUserForm.module.css";

const RegisterUserForm = (props) => {

  const params = useParams();
  const history = useHistory();
  const phoneInputRef = useRef();
  const nameInputRef = useRef();
  const avatarInputRef = useRef();
  const [isVerifyed, setIsVerifyed] = useState(false);
  const onAddMessageSuccess = () => {
    history.replace("/auth");
  };
  const [addUser, { data: userData }] = useMutation(NEW_USER, {onCompleted: onAddMessageSuccess});

  const tokenVerification= () => {
    fetch(`http://localhost:8000/api/auth/verification/${params.token}`).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error('err');
          });
        }
      }).then((data) => {
        console.log(data);
        setIsVerifyed(data.verified);
      })
      .catch((err) => {
        // alert('auth ' + err.message);
        console.log('register ' + err.message);
      });
  };

  useEffect(() => {
    tokenVerification();
  }, [tokenVerification]);

  const submitHandler = (event) => {
    event.preventDefault();
    
    const enteredPhone = phoneInputRef.current.value;
    const enteredName = nameInputRef.current.value;

    addUser({
      variables: {
        phone: enteredPhone,
        name: enteredName,
        avatar: 'https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'
      }
    });
  };

  return (
    <section className={classes.auth}>
    <h1>Add Contact</h1>
    {!isVerifyed && <p>Invalid token!</p>}
{ isVerifyed &&  <form onSubmit={submitHandler}>
    <div className={classes.control}>
        <input
          type="text"
          id="phone"
          required
          ref={phoneInputRef}
          placeholder="Enter phone number"
        />
      </div>
      <div className={classes.control}>
        <input
          type="text"
          id="name"
          placeholder="Enter name"
          required
          ref={nameInputRef}
        />
      </div>
      <div className={classes.control}>
        <input
          type="file"
          id="avatar"
          ref={avatarInputRef}
        />
      </div>
      <div className={classes.actions}>
        <button type="submit" className={classes.button}>Send</button>
        <button  className={classes['button--alt']} >Close</button>
      </div>
    </form>}
  </section>
  );
};

export default RegisterUserForm;