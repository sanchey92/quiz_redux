import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actions-types";
import axios from "../../axios/axios-quiz";

const resetQuizCreation = () => {
  return {
    type: RESET_QUIZ_CREATION
  }
};

const createQuizQuestion = (item) => {
  return {
    type: CREATE_QUIZ_QUESTION,
    item
  }
};

const finishCreateQuiz = () => {
  return async (dispatch, getState) => {
    await axios.post('/quzes.json', getState().create.quiz);
    dispatch(resetQuizCreation())
  }
};

export {
  createQuizQuestion,
  finishCreateQuiz
}
