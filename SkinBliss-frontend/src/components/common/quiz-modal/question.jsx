import React from 'react';

export const Question = ({ question, options, handleAnswer, answers }) => {
  return (
    <div className="list-group">
      {options.map((option, i) => (
        <button
          key={i}
          className="list-group-item list-group-item-action"
          onClick={() => handleAnswer({ question, answer: option })}
        >
          <input
            id={`option_${i}`}
            type="radio"
            name="shipping"
            value={option}
            checked={answers?.[question] === option}
          />
          <label htmlFor={`option_${i}`} style={{ marginLeft: '10px' }}>
            <span>{option}</span>
          </label>
        </button>
      ))}
    </div>
  );
};
