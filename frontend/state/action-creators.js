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

export function selectAnswer(answerId) {
  return {
    type: actionTypes.SET_SELECTED_ANSWER,
    payload: answerId,
  }
}

export function setMessage(message) {
  return {
    type: actionTypes.SET_INFO_MESSAGE,
    payload: message,
  }
}

export function setQuiz(quizData) {
  return {
    type: actionTypes.SET_QUIZ_INTO_STATE,
    payload: quizData,
  }
}

export function inputChange() {}

export function resetForm() {}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch({
      type: actionTypes.SET_INFO_MESSAGE,
      payload: "Loading next quiz...",
    })

    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          const quizData = response.data
          dispatch({ type: actionTypes.SET_QUIZ_INTO_STATE, payload: quizData })
        } else {
          dispatch({
            type: actionTypes.SET_INFO_MESSAGE,
            payload: "Failed to retrieve quiz data",
          })
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        dispatch({
          type: actionTypes.SET_INFO_MESSAGE,
          payload: "Network error occurred",
        })
      })

    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(quizId, answerId) {
  return async function (dispatch) {
    try {
      const payload = { quiz_id: quizId, answer_id: answerId }

      const response = await fetch("http://localhost:9000/api/quiz/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        const feedbackData = await response.json()

        dispatch({ type: actionTypes.SET_SELECTED_ANSWER, payload: null })
        dispatch({
          type: actionTypes.SET_INFO_MESSAGE,
          payload: feedbackData.feedback,
        })

        dispatch(fetchQuiz())
      } else {
        dispatch({
          type: actionTypes.SET_INFO_MESSAGE,
          payload: "Failed to submit answer",
        })
      }
    } catch (error) {
      console.error("Network error:", error)
      dispatch({
        type: actionTypes.SET_INFO_MESSAGE,
        payload: "Network error occurred",
      })
    }

    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}

export function postQuiz(questionText, trueAnswerText, falseAnswerText) {
  return async function (dispatch) {
    try {
      const payload = {
        question_text: questionText,
        true_answer_text: trueAnswerText,
        false_answer_text: falseAnswerText,
      }

      const response = await fetch("http://localhost:9000/api/quiz/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        dispatch({
          type: actionTypes.SET_INFO_MESSAGE,
          payload: "Quiz question posted successfully",
        })
      } else {
        dispatch({
          type: actionTypes.SET_INFO_MESSAGE,
          payload: "Failed to post quiz",
        })
      }
    } catch (error) {
      console.error("Network error:", error)
      dispatch({
        type: actionTypes.SET_INFO_MESSAGE,
        payload: "Network error occurred",
      })
    }
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
