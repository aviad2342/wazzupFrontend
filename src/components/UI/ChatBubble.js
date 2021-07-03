import { Fragment } from 'react';
import './ChatBubble.scss';
import classes from './ChatBubble.module.css';

const ChatBubble = (props) => {
  return (
    <div class="speech-wrapper">
  <div class="bubble">
    <div class="txt">
      <p class="name">Benni</p>
      <p class="message">Hey, check out this Pure CSS speech bubble...</p>
      <span class="timestamp">10:20 pm</span>
    </div>
    <div class="bubble-arrow"></div>
    <div className='bubble-avatar'>
        <img className='img-avatar' src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png" />
    </div>
  </div>

  <div class="bubble alt">
    <div class="txt">
      <p class="name alt">+353 87 1234 567<span> ~ John</span></p>
      <p class="message">Nice... this will work great for my new project.</p>
      <span class="timestamp">10:22 pm</span>
    </div>
    <div class="bubble-arrow alt"></div>
    <div className='bubble-avatar alt'>
        <img className='img-avatar alt' src="https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png" />
    </div>
  </div>
</div>
  );
};

export default ChatBubble;