import React from "react";
import AnswerItem from "../answer-item/answer-item";
import './answers-list.css'

const AnswersList = (props) => {
  return (
    <ul className='answers-list'>
      {props.answers.map((answer, index) => {
        return (
          <AnswerItem
            answer={answer}
            key={index}
            onAnswer={props.onAnswer}
            state={props.state ? props.state[answer.id] : null}
          />)
      })}

    </ul>
  )
};

export default AnswersList;