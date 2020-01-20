import React from "react";
import './answer-item.css'

const AnswerItem  = (props) => {

  const cssClasses = ['answer-item'];

  if (props.state) {
    cssClasses.push(props.state)
  }

  return (
    <li
      onClick={() => props.onAnswer(props.answer.id)}
      className={cssClasses.join(' ')}>
      {props.answer.text}
    </li>
  )
};

export default AnswerItem