import './ChatBubble.scss';
// import classes from './ChatBubble.module.css';

const ChatBubble = (props) => {

  return (
    <div className="speech-wrapper">
  {props.id % 2 === 0 && <div className="bubble">
    <div className="txt">
      <p className="name">Benni</p>
      <p className="message">Hey, check out this Pure CSS speech bubble...</p>
      <span className="timestamp">10:20 pm</span>
    </div>
    <div className="bubble-arrow"></div>
    <div className='bubble-avatar'>
        <img className='img-avatar' src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png" alt="" />
    </div>
  </div>}

  {props.id % 2 !==0 && <div className="bubble alt">
    <div className="txt">
      <p className="name alt">+353 87 1234 567<span> ~ John</span></p>
      <p className="message">Nice... this will work great for my new project.</p>
      <span className="timestamp">10:22 pm</span>
    </div>
    <div className="bubble-arrow alt"></div>
    <div className='bubble-avatar alt'>
        <img className='img-avatar alt' src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png" alt="" />
    </div>
  </div>}
</div>
  );
};

export default ChatBubble;