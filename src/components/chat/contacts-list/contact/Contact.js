import moment from "moment";

const Contact = (props) => {

  const selectContactHandler = () => {
    props.onSelectedContact(props.phone);
  };

  return (
    <div className="contact-item" onClick={selectContactHandler}>
      <img className='contact-avatar' src={props.avatar} alt='' />
      <div className='contact-details'>
      <div className='contact-name'>{props.name}</div>
      <p className='contact-last'>
      {moment(props.lastMessage).format('DD/MM/yy hh:mm')}</p>
      </div>
    </div>
  );
};

export default Contact;
