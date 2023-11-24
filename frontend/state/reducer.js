// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from "redux"
import * as actionTypes from "./action-types"

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case actionTypes.MOVE_CLOCKWISE:
      if (state === 5) {
        return 0
      } else {
        return state + 1
      }

    case actionTypes.MOVE_COUNTERCLOCKWISE:
      if (state === 0) {
        return 5
      } else {
        return state - 1
      }
    default:
      return state
  }
}

const initialQuizState = {
  quiz: "",
  isFetching: false,
  error: "",
  buttonState: true,
}

function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case actionTypes.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case actionTypes.SET_QUIZ_INTO_STATE:
      return {
        ...state,
        quiz: {
          ...action.payload,
          answers: action.payload.answers.map((element) => {
            return { ...element, selectValue: "Select", answerHighlight: false }
          })
        },
        isFetching: true,
        error: "",
        buttonState: true
      }
    case actionTypes.SET_ERROR:
      return {
        ...state,
        isFetching: true,
        error: action.payload
      }
    case actionTypes.SET_SELECTED_ANSWER:
      return {
        ...state,
        quiz: {
          ...state.quiz, answers: state.quiz.answers.map(element => {
            if (action.payload === element.answer_id) {
              return { ...element, selectValue: "SELECTED", answerHighlight: true }
            } else {
              return { ...element, selectValue: "Select", answerHighlight: false }
            }
          })
        },
        selectValue: state.quiz.answers.selectValue,
        isFetching: true,
        error: "",
        buttonState: false,
      }
    case actionTypes.RESET_SELECTED_STATE:
      return {
        ...state,
        quiz: {
          ...state.quiz,
          answers: state.quiz.answers.map(element => {
            return { ...element, selectValue: "Select", answerHighlight: false }
          })
        },
        buttonState: true
      }
    
    default:
      return state
  }
}

const initialMessageState = {
  infoMessage: ""
}
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case actionTypes.SET_INFO_MESSAGE:
      return {
        infoMessage: action.payload
      }
    case actionTypes.CLEAR_INFO_MESSAGE:
      return (state = initialMessageState)
    default:
      return state
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  const evt = action.payload;
  switch (action.type) {
    case actionTypes.INPUT_CHANGE:
      return {
        ...state,
        [evt.target.id]: evt.target.value
      }
    case actionTypes.RESET_FORM:
      return (state = initialFormState)
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, form, infoMessage })