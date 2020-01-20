import React from "react";
import Button from "../UI/button/button";
import {Link} from "react-router-dom";
import './result.css'

const Result = (props) => {

  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className='result'>
      <ul>
        {
          props.quiz.map( (quizItem, index) =>  {

            const cssClasses = [
              'fa',
              props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
              props.results[quizItem.id]
            ];

          return (
            <li key={index}>
              <strong>{index + 1}</strong>. &nbsp;
              {quizItem.question}
              <i className={cssClasses.join( ' ')}/>
            </li>
          )
        })
        }
      </ul>
      <p>правильно {successCount} из {props.quiz.length}</p>
      <div>
        <Button type='primary' onClick={props.onRetry}>Повторить</Button>
        <Link to='/'>
          <Button type='success-btn' >Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  )
};

export default Result