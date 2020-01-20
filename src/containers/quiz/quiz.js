import React, {Component} from "react";
import ActiveQuiz from "../../components/active-quiz/active-quiz";
import './quiz.css'
import Result from "../../components/result/result";
import Loader from "../../components/loader/loader";
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";

 class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

   render() {
    return (
      <div className='quiz'>
        <div className='quiz-wrapper'>
          <h1>Ответьте на все вопросы</h1>

          {
            this.props.loading || !this.props.quiz
              ? <Loader/>
              :
              this.props.isFinished
                ? <Result
                  results={this.props.results}
                  quiz={this.props.quiz}
                  onRetry={this.props.retryQuiz}
                />
                : <ActiveQuiz
                  answers={this.props.quiz[this.props.activeQuestion].answers}
                  question={this.props.quiz[this.props.activeQuestion].question}
                  onAnswer={this.props.quizAnswerClick}
                  quizLength={this.props.quiz.length}
                  answerNumber={this.props.activeQuestion + 1}
                  state={this.props.answerState}
                />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  const {results, quiz, activeQuestion,
    answerState, isFinished, loading} = state.quiz;

  return {
    results,
    isFinished,
    activeQuestion,
    answerState,
    quiz,
    loading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)