import React from "react";

const Contact = (props) => {
  return (
    <div className="contact-item">
      <div>{props.title}</div>
      <p>{props.releaseDate}</p>
    </div>
  );
};

export default Contact;
