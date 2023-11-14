import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators';
import Message from './Message';

function Quiz(props) {
  const { quiz, fetchQuiz, selectAnswer, postAnswer } = props;
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [ message, setMessage ] = useState('');

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const handleAnswerSelect = (answerId) => {
    if (selectedAnswer === answerId) {
      return;
    }
    setSelectedAnswer(answerId);
  };

// for some reasion response is undefined not sure why 

  
  const handleQuizSubmit = () => {
    if (selectedAnswer !== null) {
      postAnswer(quiz.data.quiz_id, selectedAnswer)
        .then((response) => {
          console.log(response)
          if (response && response.status === true) {
            setMessage('Nice job! That was the correct answer');
          } else {
            setMessage('What a shame! That was the incorrect answer');
          }
          fetchQuiz();
          setSelectedAnswer(null);
        })
        .catch((error) => {
          console.error('Error:', error);
          setMessage('An error occurred while submitting your answer');
        });
    }
  };
  
  

  return (
    <div id="wrapper">
      {quiz.ready ? (
        <>
          <h2>{quiz.data.question}</h2>

          <div id="quizAnswers">
            {quiz.data.answers.map((answer, index) => (
              <div key={index} className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`}>
                {answer.text}
                <button
                  onClick={() => handleAnswerSelect(answer.answer_id)}
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

          <Message message={message} />
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
