import * as actionTypes from './action-types.js';
import axios from 'axios';
// import { dispatch } from 'react-redux';  


// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() { 
  return({
    type: actionTypes.MOVE_CLOCKWISE
});
}

export function moveCounterClockwise() {
  return ({
    type: actionTypes.MOVE_COUNTERCLOCKWISE
  });
 }

export function selectAnswer(answerId) { 
  return ({
    type: actionTypes.SET_SELECTED_ANSWER,
    payload: answerId
  });
}

export function setMessage(message) {
  return ({
    type: actionTypes.SET_INFO_MESSAGE,
    payload: message
  });
 }

export function setQuiz(quizData) {
  return ({
    type: actionTypes.SET_QUIZ_INTO_STATE, payload: quizData
  });
 }

export function inputChange() { }

export function resetForm() { }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({ type: actionTypes.SET_QUIZ_INTO_STATE, payload: null });

    axios
      .get('http://localhost:9000/api/quiz/next')
      .then((response) => {
        if (response.status === 200) {
          const quizData = response.data;
          console.log(quizData)
          dispatch({ type: actionTypes.SET_QUIZ_INTO_STATE, payload: quizData });
        } else {
          // Handle non-200 status codes here if needed
          dispatch({ type: actionTypes.SET_INFO_MESSAGE, payload: 'Failed to retrieve quiz data' });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        dispatch({ type: actionTypes.SET_INFO_MESSAGE, payload: 'Network error occurred' });
      });
  

    
 
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}
export function postAnswer(quizId, answerId) {
  return async function (dispatch) {
    // dispatch({ type: actionTypes.SET_SELECTED_ANSWER, payload: null });
    
  

    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}


export function postQuiz(questionText, trueAnswerText, falseAnswerText) {
  return async function (dispatch) {
    
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
