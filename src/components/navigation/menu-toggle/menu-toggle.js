import React from "react";
import './menu-toggle.css';

const MenuToggle = (props) => {

  const cssClasses = [
    'menu-toggle',
    'fa',
  ];

  if (props.isOpen) {
    cssClasses.push('fa-times');
    cssClasses.push('open');
  } else {
    cssClasses.push('fa-bars')
  }

  return (
    <i
      onClick={props.onToggle}
      className={cssClasses.join(' ')}
    >
    </i>
  )
};

export default MenuToggle;