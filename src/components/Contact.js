
const Contact = (props) => {

  return (
    <div className="contact-item" >
      <img className='contact-avatar' src='https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png' alt='' />
      <div>{props.title}</div>
      <p></p>
    </div>
  );
};

export default Contact;
