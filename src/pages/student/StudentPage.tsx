import { useNavigate } from 'react-router';

export default function StudentPage() {
  const navigate = useNavigate();

  function handleOpenTests() {
    navigate('/student/tests');
  }

  return (
    <div>
      <button onClick={() => handleOpenTests()}>go tests</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}