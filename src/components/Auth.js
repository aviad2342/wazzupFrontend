import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../store/auth-context";
import classes from "./AuthForm.module.css";

const Auth = (props) => {
  const history = useHistory();
  const phoneInputRef = useRef();
  const nameInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    
    const enteredPhone = phoneInputRef.current.value;
    const enteredName = nameInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);

    let requestBody = {
      query: `
      query {
        login(phone:"${enteredPhone}", userName:"${enteredName}") {
          userId
          phone
          name
          avatar
          token
          tokenExpiration
        }
      }
      `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      }).then((data) => {

        const expirationTime = new Date(new Date().getTime() + (+data.data.login.tokenExpiration  * 1000));
        
        authCtx.login(
          data.data.login.token,
          expirationTime.toISOString(),
          data.data.login.userId,
          data.data.login.phone,
          data.data.login.name,
          data.data.login.avatar
        );
        history.replace("/chat");
      })
      .catch((err) => {
        // alert('auth ' + err.message);
        console.log('auth ' + err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
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
        <div className={classes.actions}>
          {!isLoading && <button>Login</button>}
        </div>
      </form>
    </section>
  );
};

export default Auth;
