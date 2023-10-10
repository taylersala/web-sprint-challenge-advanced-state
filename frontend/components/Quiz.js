import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz } from '../state/action-creators';

function Quiz(props) {
  const { quizData, fetchQuiz } = props;

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

   return (
  
    <div id="wrapper">
      {quizData ? (
        <>
          <h2>{quizData.question}</h2>

          <div id="quizAnswers">
            {quizData.answers.map((answer, index) => (
              <div key={index} className="answer">
                {answer.text}
                <button>Select</button>
              </div>
            ))}
          </div>

          <button id="submitAnswerBtn">Submit answer</button>
        </>
      ) : (
        'Loading next quiz...'
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  quizData: state.quizData, 
});

const mapDispatchToProps = {
  fetchQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
