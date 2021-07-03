import { Fragment } from 'react';

import classes from './ContactsListHeader.module.css';

const ContactsListHeader = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
      <img className={classes['avatar-image']} src='https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png' alt='Profile image' />
        <button>LogOut</button>
      </header>
    </Fragment>
  );
};

export default ContactsListHeader;