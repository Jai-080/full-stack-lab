import React, { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { id: 1, q: "What is your favorite programming language?", options: ["Java", "Python", "JavaScript"] },
    { id: 2, q: "What is your favorite frontend framework?", options: ["ReactJS", "AngularJS", "HTML"] },
    { id: 3, q: "How many hours do you code every day?", options: ["10hr", "8hr", "3hr"] }
  ];

  const handleAnswer = (option) => {
    const updatedAnswers = { ...answers, [questions[step].id]: option };
    setAnswers(updatedAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="quiz-page">
      <div className="app-container">
        {!showResult ? (
          <div className="quiz-card">
            <div className="quiz-header">
              <span className="step-badge">Question {step + 1} of {questions.length}</span>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="question">{questions[step].q}</h3>
            
            <div className="options">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="btn option-btn"
                >
                  <span className="option-letter">{optionLetters[i]}</span>
                  <span className="option-text">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="quiz-card results-card">
            <div className="result-header">
              <span className="success-icon">🎉</span>
              <h2 className="result-title">Survey Completed!</h2>
              <p className="result-subtitle">Here is a summary of your responses:</p>
            </div>

            <div className="results-list">
              {questions.map((q, idx) => (
                <div key={q.id} className="result">
                  <div className="result-item-header">
                    <span className="q-num">Q{idx + 1}</span>
                    <p className="question-text">{q.q}</p>
                  </div>
                  <div className="answer-badge">
                    <span className="check-icon">✓</span>
                    <span className="answer-text">{answers[q.id]}</span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleRestart} className="btn restart-btn">
              🔄 Retake Survey
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
