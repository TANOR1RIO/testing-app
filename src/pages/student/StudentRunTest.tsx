  import { observer } from "mobx-react-lite";
  import { useLocation, useParams, useNavigate } from "react-router-dom";
  import { useState, useEffect } from "react";
  import { QuestionBlock } from "../../components/tests/QuestionBlock";
  import { Timer } from "../../components/Timer";
  import styled from "@emotion/styled";
  import { Loader } from "../../icon/icons";
  import { StudentHeader } from '../../components/student/StudentHeader';
  import { ConfirmModal } from "../../components/tests/ConfirModal";
  import { ResultBlock } from "../../components/tests/ResultBlock";
  import { TestRunPageVM } from "../../view-Modal/tests/testRunPageVM";
  import { useStore } from "../UseStore/UseStore";

  const LoaderWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  `;

  const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 10px;
  `;

  export const StudentRunTests = observer(() => {
    const root = useStore();
    const [vm] = useState(() => new TestRunPageVM(root));
    
    const { id } = useParams();
    const testId = Number(id);
    const location = useLocation();
    const navigate = useNavigate();

    const durationSec = (location.state as { durationSec?: number } | null)?.durationSec ?? 600;

    useEffect(() => {
      if (!Number.isNaN(testId)) {
        vm.init(testId);
      }
    }, [testId, vm]);

    const store = vm.store;

    if (Number.isNaN(testId)) {
      return (
        <div>
          <StudentHeader title="100" />
          <Grid><h3>Неопределенный ID теста</h3></Grid>
        </div>
      );
    }

    if (store.loading) {
      return (
        <div>
          <StudentHeader title="100" />
          <Grid>
            <LoaderWrap><Loader /></LoaderWrap>
          </Grid>
        </div>
      );
    }

    if (store.error) {
      return (
        <div>
          <StudentHeader title="100" />
          <Grid><h3 style={{ color: 'red' }}>{store.error}</h3></Grid>
        </div>
      );
    }

    if (store.questions.length === 0) {
      return (
        <div>
          <StudentHeader title="100" />
          <Grid><h3>Список вопросов пуст</h3></Grid>
        </div>
      );
    }

    return (
      <div>
        <StudentHeader title="Тест" />
        <Grid>
          <div>
            {store.questions.map(q => (
              <QuestionBlock 
                key={q.id} 
                question={q} 
                onChange={(qId, value) => store.setAnswer(qId, value)}
                value={store.answers[q.id]?.value ?? null}
              />
            ))}
          </div>
          
          <div css={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <ResultBlock score={store.score} max={store.maxScore} />
            
            <Timer
              durationSec={durationSec}
              onFinish={() => vm.onTimerFinihs(navigate)}
            />
          </div>
          
          <button onClick={() => vm.openFinishModal()}>Отправить</button>
        </Grid>
        
        <ConfirmModal
          isOpen={vm.finishModalOpen} 
          labelDone="Завершить"
          onClose={() => vm.closeFinishModal()}
          onConfirm={() => vm.submit(navigate)}
          title={vm.finishModalTitle}
        />
      </div>
    );
  });