import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz } from '../state/action-creators';

function Quiz(props) {
  const { quizData, fetchQuiz, isReady, message } = props;



  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

 fetchQuiz()
 console.log('testing', quizData)
   return (
  
    <div id="wrapper">
      {isReady ? (
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
        message
      )}
    </div>
  );
}


const mapStateToProps = (state) => ({
  quizData: state.data,
  isReady: state.isReady,
  message: state.message
  
});

const mapDispatchToProps = {
  fetchQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
