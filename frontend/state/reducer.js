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
    default: 
      return(state);
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    default: 
      return(state);
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    default: 
      return(state);
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch(action.type){
    default: 
      return(state);
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
