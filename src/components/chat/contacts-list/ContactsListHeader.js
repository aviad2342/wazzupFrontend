import { Fragment, useContext } from 'react';
import AuthContext from "../../../store/auth-context";

import classes from './ContactsListHeader.module.css';

const ContactsListHeader = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <header className={classes.header}>
      <img className={classes['avatar-image']} src={authCtx.avatar} alt='' />
       <div className='contact-name'>{authCtx.name}</div>
        <button className={classes['logout-btn']} onClick={props.onLogout}>logout</button>
      </header>
    </Fragment>
  );
};

export default ContactsListHeader;