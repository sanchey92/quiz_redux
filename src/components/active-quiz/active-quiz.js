import React from "react";
import './active-quiz.css'
import AnswersList from "../answers-list/answers-list";

const ActiveQuiz = (props) => {
  return (
    <div className='active-quiz'>
      <p className='question'>
        <span>
          <strong>{props.answerNumber}.</strong>&nbsp;
          {props.question}
        </span>
        <small>{props.answerNumber}/{props.quizLength}</small>
      </p>
      <AnswersList
        state={props.state}
        answers={props.answers}
        onAnswer={props.onAnswer}
      />
    </div>
  );
};

export default ActiveQuiz;