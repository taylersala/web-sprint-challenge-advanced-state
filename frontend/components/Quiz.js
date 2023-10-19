import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz } from '../state/action-creators';

function Quiz(props) {
  const { data, fetchQuiz, isReady, message } = props;



  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

 fetchQuiz()
 console.log('testing', data)
   return (
  
    <div id="wrapper">
      {isReady ? (
        <>
          <h2>{data.question}</h2>
    

          <div id="quizAnswers">
            {data.answers.map((answer, index) => (
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
  data: state.data,
  isReady: state.isReady,
  message: state.message
  
});

const mapDispatchToProps = {
  fetchQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
