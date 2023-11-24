import * as actionTypes from "./action-types.js"
import axios from "axios"

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {
    type: actionTypes.MOVE_CLOCKWISE,
  }
}

export function moveCounterClockwise() {
  return {
    type: actionTypes.MOVE_COUNTERCLOCKWISE,
  }
}

export const selectAnswer = (id) => {
  return { type: actionTypes.SET_SELECTED_ANSWER, payload: id }
}

export function setMessage(message) {
  return {
    type: actionTypes.SET_INFO_MESSAGE, payload: message
  }
}

export function setQuiz() { }

export const inputChange = (data) => {
  return {
    type: actionTypes.INPUT_CHANGE, payload: data
  }
}


export function resetForm() {
  return {
    type: actionTypes.RESET_FORM
  }
}

// ❗ Async action creators
export const fetchQuiz = () => dispatch => {
  dispatch(setIsFetching(false));
  // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
  // On successful GET:
  // - Dispatch an action to send the obtained quiz to its state
  axios.get(`http://localhost:9000/api/quiz/next`)
    .then(res => {
      dispatch(setQuizIntoState(res.data))
    }, (error) => {
      dispatch(setError(error.message))
    })
}

const setIsFetching = (isFetching) => {
  return {
    type: actionTypes.SET_IS_FETCHING, payload: isFetching
  }
}

const setError = (error) => {
  return {
    type: actionTypes.SET_ERROR, payload: error
  }
}

const setQuizIntoState = (data) => {
  return {
    type: actionTypes.SET_QUIZ_INTO_STATE, payload: data
  }
}

const resetSelectedState = () => {
  return {
    type: actionTypes.RESET_SELECTED_STATE
  }
}

export const postAnswer = (data) => dispatch => {
  // On successful POST:
  // - Dispatch an action to reset the selected answer state
  // - Dispatch an action to set the server message to state
  // - Dispatch the fetching of the next quiz 
  const answer_id = data.answers.filter((elem) => elem.selectValue === "SELECTED")[0].answer_id
  axios.post(`http://localhost:9000/api/quiz/answer`, { "quiz_id": data.quiz_id, "answer_id": answer_id }).then(res => {
    dispatch(setMessage(res.data.message))
    dispatch(resetSelectedState());
    dispatch(fetchQuiz())
  })
}
export const postQuiz = (question, rightAnswer, wrongAnswer, message) => dispatch => {

  // On successful POST:
  // - Dispatch the correct message to the the appropriate state
  // - Dispatch the resetting of the form
  axios.post(`http://localhost:9000/api/quiz/new`, {
    "question_text": question, "true_answer_text": rightAnswer,
    "false_answer_text": wrongAnswer
  }).then(res => {
    console.log(res)
    dispatch(setMessage(message))
  }).catch(err => {
    dispatch(setError(err))
  })
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state