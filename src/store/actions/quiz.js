import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_QUIZ
} from "./actions-types";

const fetchQuizes = () => {

  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get('/quzes.json');
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      });

      dispatch(fetchQuizesSuccess(quizes))

    } catch (error) {
      dispatch(fetchQuizesError(error))
    }
  }
};

const fetchQuizesSuccess = (quizes) => {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
};

const fetchQuizSuccess = (quiz) => {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
};

const fetchQuizesStart = () => {
  return {
    type: FETCH_QUIZES_START
  }
};

const fetchQuizesError = (error) => {
  return {
    type: FETCH_QUIZES_ERROR,
    error
  }
};

const fetchQuizById = (quizId) => {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(`/quzes/${quizId}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));

    } catch (error) {
      dispatch(fetchQuizesError(error));
    }

  }
};

const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
};

const finishQuiz = () => {
  return {
    type: FINISH_QUIZ,

  }
};

const quizNextQuestion = (questionNumber) => {
  return {
    type: QUIZ_NEXT_QUESTION,
    questionNumber
  }
};

const quizAnswerClick = (answerId) => {
  return (dispatch, getState) => {

    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') {
        return
      }
    }
    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {

      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      dispatch(quizSetState({[answerId]: 'success'}, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }

        window.clearTimeout(timeout)
      }, 1000);

    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({[answerId]: 'error'}, results));
    }

  }
};

const retryQuiz = () => {
  return {
    type: RETRY_QUIZ
  }
};

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}

export {
  fetchQuizes,
  fetchQuizById,
  fetchQuizesStart,
  fetchQuizSuccess,
  fetchQuizesSuccess,
  fetchQuizesError,
  quizAnswerClick,
  quizSetState,
  finishQuiz,
  quizNextQuestion,
  retryQuiz
};