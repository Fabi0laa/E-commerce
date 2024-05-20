import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactModal from 'react-modal';
import { handleModalClose } from '@/redux/features/productModalSlice';
import DetailsThumbWrapper from '@/components/product-details/details-thumb-wrapper';
import DetailsWrapper from '@/components/product-details/details-wrapper';
import { handleQuizModalClose } from '@/redux/features/quizModalSlice';
import { useGetQuestionsQuery, usePostQuestionsMutation } from '@/redux/features/quizApi';
import { Question } from './question';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: 'calc(100% - 600px)',
    width: '500px',
  },
};

const QuizModal = () => {
  const { isModalOpen } = useSelector((state) => state.quizModal);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetQuestionsQuery();
  const [submitQuestions, { data: submitData }] = usePostQuestionsMutation();
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [open, setOpen] = useState(false);

  // handle image active

  function handleAnswer({ question, answer }) {
    console.log('🚀 ~ handleAnswer ~ question, answer:', { question, answer });
    const allAnswers = { ...answers, [question]: answer };
    setAnswers(allAnswers);
    if (currentQuestion === data.length - 1) {
      console.log(allAnswers);
      submitQuestions(allAnswers);
      // dispatch(handleQuizModalClose());
    } else {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    }
  }

  return (
    <div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => dispatch(handleQuizModalClose())}
        style={customStyles}
        contentLabel="Product Modal"
      >
        <div className="tp-product-modal">
          <div className="tp-product-modal-content d-lg-flex flex-column justify-content-center ">
            <button
              onClick={() => dispatch(handleQuizModalClose())}
              type="button"
              className="tp-product-modal-close-btn"
            >
              <i className="fa-regular fa-xmark"></i>
            </button>
          </div>
          {!submitData ? (
            <div className="tp-cart-checkout-shipping ">
              <h4 className="tp-cart-checkout-shipping-title">{data && data[currentQuestion].question}</h4>
              {data && (
                <Question
                  question={data[currentQuestion].question}
                  options={data[currentQuestion].options}
                  handleAnswer={handleAnswer}
                  answers={answers}
                />
              )}
            </div>
          ) : (
            <div className="card-body">
              <h4 className="tp-cart-checkout-shipping-title">Thank you for your response</h4>
              <h4 className="text-success">Your skin type is {submitData.user.skinType}</h4>
            </div>
          )}
        </div>
      </ReactModal>
    </div>
  );
};

export default QuizModal;
