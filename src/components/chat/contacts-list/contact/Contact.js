import moment from "moment";

const Contact = (props) => {


  return (
    <div className="contact-item" >
      <img className='contact-avatar' src={props.avatar} alt='' />
      <div className='contact-details'>
      <div className='contact-name'>{props.name}</div>
      <p className='contact-last'>
      {moment(props.lastMessage).format('DD/mm/yy hh:mm')}</p>
      </div>
    </div>
  );
};

export default Contact;
