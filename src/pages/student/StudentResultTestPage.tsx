/* eslint-disable react-hooks/set-state-in-effect */
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { StudentHeader } from '../../components/student/StudentHeader';
import { ResultBlock } from '../../components/tests/ResultBlock';
import { Timer } from '../../components/Timer';
import { useEffect, useState } from 'react';
import type { TestItem } from "../../types/testing";

export function StudentResultTestPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    type NavState = {
        max?: number;
        score?: number;
        time?: number;
        attemptAllowed?: number;
        testId?: number;
    };

    const navState = location.state as NavState | null;

    const { 
        max, 
        score, 
        time, 
        attemptAllowed, 
        testId 
    } = navState ?? {};
    
    const [testMeta, setTestMeta] = useState<TestItem | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {

        if (time !== undefined && attemptAllowed !== undefined) {
            setLoading(false);
            return;
        }
    
        const API_URL = '/data/tests.json';
        fetch(API_URL)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((tests: TestItem[]) => {
                const found = tests.find(t => t.id === (testId || Number(id)));
                setTestMeta(found ?? null);
            })
            .catch(error => {
                console.error('Ошибка загрузки данных теста:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [time, attemptAllowed, testId, id]);

    const durationSec = time ?? testMeta?.durationSec ?? 120;
    const attemptsLeft = attemptAllowed ?? testMeta?.attemptsAllowed ?? 0;
    const maxScore = max ?? testMeta?.passScore ?? 9;
    const currentScore = score ?? 0;

    function takeTheTestAgain() {
        if (!id) return;
        navigate(`/student/tests/${id}`, { replace: true });
    }

    if (loading) {
        return (
            <div>
                <StudentHeader title="Загрузка..." onBack={() => navigate('/student/tests')} />
                <div>Загрузка результатов...</div>
            </div>
        );
    }

    return (
        <div>
            <StudentHeader title="100" onBack={() => navigate('/student/tests')} />
            <div>
                <ResultBlock max={maxScore} score={currentScore} />
                <Timer
                    durationSec={durationSec}
                    onFinish={() => alert('Тест закончен!')}
                />
                <div>
                    <h3>Осталось попыток:</h3>
                    <div>{attemptsLeft}</div>
                    <button onClick={takeTheTestAgain}>
                        Пройти тест заново
                    </button>
                </div>
            </div>
        </div>
    );
}