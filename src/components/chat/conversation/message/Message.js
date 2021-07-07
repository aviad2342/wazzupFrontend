import React from "react";
import './Message.scss';
import moment from "moment";

const Message = (props) => {

  const classes = props.rigth? 'alt' : '';
  return (
    <div className={"speech-wrapper " + classes}>
   <div className={"bubble " + classes}>
    <div className="txt">
      <p className={"name " + classes}>{props.name}</p>
      <p className="message">{props.body}</p>
      <span className="timestamp">{ moment(props.date).format('hh:mm')}</span>
    </div>
    <div className={"bubble-arrow "  + classes}></div>
    <div className={'bubble-avatar '  + classes}>
        <img className={'img-avatar '  + classes} src={props.avatar} alt="" />
    </div>
  </div>

  {/* {props.id % 2 !==0 && <div className="bubble alt">
    <div className="txt">
      <p className="name alt">+353 87 1234 567<span> ~ John</span></p>
      <p className="message">Nice... this will work great for my new project.</p>
      <span className="timestamp">10:22 pm</span>
    </div>
    <div className="bubble-arrow alt"></div>
    <div className='bubble-avatar alt'>
        <img className='img-avatar alt' src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png" alt="" />
    </div>
  </div>} */}
</div>
  );
};

export default Message;
