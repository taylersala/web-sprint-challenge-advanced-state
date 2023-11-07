import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postQuiz } from '../state/action-creators';
import axios from 'axios';
import Message from './Message'; // Adjust the path to your Message component

export function Form(props) {
  const [formData, setFormData] = useState({
    newQuestion: '',
    newTrueAnswer: '',
    newFalseAnswer: '',
  });

  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const onChange = (evt) => {
    const { id, value } = evt.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    setDisabled(
      formData.newQuestion.length < 1 &&
      formData.newTrueAnswer.length < 1 &&
      formData.newFalseAnswer.length < 1
    );
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const { newQuestion, newTrueAnswer, newFalseAnswer } = formData;

    if (newQuestion && newTrueAnswer && newFalseAnswer) {
      try {
        const response = await axios.post('http://localhost:9000/api/quiz/new', {
          question_text: newQuestion,
          true_answer_text: newTrueAnswer,
          false_answer_text: newFalseAnswer,
        });

        if (response.status === 201) {
          console.log('Quiz created successfully', response.data);
          setMessage(`Congrats: "${newQuestion}" is a great question!`);

          setFormData({
            newQuestion: '',
            newTrueAnswer: '',
            newFalseAnswer: '',
          });

          setDisabled(true);
        } else {
          console.error('Failed to create quiz:', response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error);
        setMessage('An error occurred while submitting the answer');
      }
    } else {
      alert('Please fill in all of the fields.');
    }
  };

  return (
    
    <div>
      <Message message={message} />
      <form id="form" onSubmit={onSubmit}>
        <h2>Create New Quiz</h2>
        <input
          maxLength={50}
          minLength={1}
          onChange={onChange}
          id="newQuestion"
          placeholder="Enter question"
          value={formData.newQuestion}
        />
        <input
          maxLength={50}
          minLength={1}
          onChange={onChange}
          id="newTrueAnswer"
          placeholder="Enter true answer"
          value={formData.newTrueAnswer}
        />
        <input
          maxLength={50}
          minLength={1}
          onChange={onChange}
          id="newFalseAnswer"
          placeholder="Enter false answer"
          value={formData.newFalseAnswer}
        />
        <button id="submitNewQuizBtn" type="submit" disabled={disabled}>
          Submit new quiz
        </button>
      </form>
      
    </div>
  );
}

const mapStateToProps = (state) => ({
  quizData: state.quizData,
});

const mapDispatchToProps = {
  postQuiz,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
