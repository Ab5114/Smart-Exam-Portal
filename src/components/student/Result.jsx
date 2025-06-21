 import { useLocation } from 'react-router-dom';

const Result = () => {
  const { state } = useLocation();
  const { exam, answers } = state;

  const correct = exam.questions.reduce((acc, q, i) => (
    acc + (answers[i] === q.answer ? 1 : 0)
  ), 0);

  return (
    <div>
      <h2>Result</h2>
      <p>Score: {correct} / {exam.questions.length}</p>
    </div>
  );
};

export default Result;
