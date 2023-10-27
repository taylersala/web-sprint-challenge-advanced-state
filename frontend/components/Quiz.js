import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';

function Quiz(props) {
  const { quiz, fetchQuiz, selectAnswer, postAnswer } = props;
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleAnswerSelect = (answerId) => {
    if (selectedAnswer === answerId) {
      return;
    }
    setSelectedAnswer(answerId);
  };

// leaving here for sanity reasons was messing around with the last two tests but it breaks
 // const handleQuizSubmit = async () => {
  //   if (selectedAnswer !== null) {
  //     const response = await postAnswer(quiz.data.quiz_id, selectedAnswer);
  
  //     if (response.success) {
  //       setMessage('Your answer is correct!');
  //     } else {
  //       setMessage('Your answer is incorrect. Try again.');
  //     }
  
  //     fetchQuiz();
  //     setSelectedAnswer(null);
  //   }
  // };







  const handleQuizSubmit = () => {
    if (selectedAnswer !== null) {
      postAnswer(quiz.data.quiz_id, selectedAnswer)
        .then(() => {
          fetchQuiz();
        });
      setSelectedAnswer(null);
    }
  };

  return (
    <div id="wrapper">
      {quiz.ready ? (
        <>
          <h2>{quiz.data.question}</h2>

          <div id="quizAnswers">
            {quiz.data.answers.map((answer, index) => (
              <div key={index} className="answer">
                {answer.text}
                <button
                  onClick={() => handleAnswerSelect(answer.answer_id)}
                  className={selectedAnswer === answer.answer_id ? "selected" : ""}
                >
                  {selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
                </button>

              </div>
            ))}
          </div>

          <button
            id="submitAnswerBtn"
            onClick={handleQuizSubmit}
            disabled={selectedAnswer === null}
          >
            Submit answer
          </button>
        </>
      ) : (
        quiz.message
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  quiz: state.quiz,
  selectedAnswer: state.selectedAnswer,
});

const mapDispatchToProps = {
  fetchQuiz,
  selectAnswer,
  postAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
