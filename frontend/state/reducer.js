// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';
import * as actionTypes from './action-types';

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
 
  switch(action.type){
    case actionTypes.MOVE_CLOCKWISE:
      if (state === 5){
        return 0
      }else{
      return state + 1;
      }
    
    case actionTypes.MOVE_COUNTERCLOCKWISE:
          if (state === 0){
            return 5
          } else {
              return state - 1;
          }
    default: 
      return(state);
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type){
    case actionTypes.SET_QUIZ_INTO_STATE:
      return action.payload
    default:
      return state;
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case actionTypes.SET_SELECTED_ANSWER:
      return action.payload
    default: 
      return(state);
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case actionTypes.SET_INFO_MESSAGE:
      return action.payload; 
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    case actionTypes.RESET_FORM:
      return action.payload;
    case actionTypes.INPUT_CHANGE:
      return {
        ...state,
        [action.payload.fieldName]: action.payload.fieldValue,
      };
    default: 
      return(state);
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
