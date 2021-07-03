import { Fragment } from 'react';

import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
      <img className={classes['avatar-image']} src='https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png' alt='' />
        <h2 className={classes['title']}>ReactMeals</h2>
      </header>
    </Fragment>
  );
};

export default Header;