import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer } from '../state/action-creators';

function Quiz(props) {
  const { quiz, fetchQuiz, selectAnswer, postAnswer } = props;
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleAnswerSelect = (answerId) => {
    if (selectedAnswer === answerId) {
      // no unselecting working
      return;
    }
    setSelectedAnswer(answerId);
  };

  const handleQuizSubmit = () => {
    if (selectedAnswer !== null) {
      postAnswer(quiz.data.quiz_id, selectedAnswer);
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
                  className={selectedAnswer === answer.answer_id ? 'selected' : ''}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
