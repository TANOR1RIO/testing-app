import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { TestCard } from '../../components/tests/TestsCard';
import styled from '@emotion/styled';
import { useStore } from '../UseStore/UseStore';
import { Loader } from '../../icon/icons';
import { StudentTestPageVM } from '../../view-Modal/student/StudentTestPageVM';

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr)); 
  gap: 24px;
  padding: 20px;
`;

const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

export const StudentTestPage = observer(() => {
  const root = useStore();
  const { tests, loading, error, lastAttemptByTest } = root.testsCatalogStore;

  const vm = useMemo(() => new StudentTestPageVM(root), [root]);

  useEffect(() => {
    vm.init();
  }, [vm]);

  if (error) return <h3 style={{ color: 'red' }}>{error}</h3>;
  if (loading) {
    return (
      <LoaderWrap>
        <Loader />
      </LoaderWrap>
    );
  }

  return (
    <Cards>
      {tests.map((test) => (
        <TestCard
          key={test.id}              
          test={test}
          lastAttempt={lastAttemptByTest.get(test.id)}  
        />
      ))}
    </Cards>
  );
});