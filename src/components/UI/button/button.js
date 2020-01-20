import React from "react";
import './button.css'

const Button = (props) => {

  const cssClasses = [
    'button',
    props.type
  ];

  return (
    <button
      className={cssClasses.join(' ')}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
};

export default Button