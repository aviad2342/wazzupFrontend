import { Fragment } from 'react';

import classes from './Header.module.css';

const Header = (props) => {

  return (
    <Fragment>
      <header className={classes.header}>
      <img className={classes['avatar-image']} src={props.contact.avatar} alt='' />
        <h2 className={classes['title']}>Chat: {props.contact.name}</h2>
      </header>
    </Fragment>
  );
};

export default Header;