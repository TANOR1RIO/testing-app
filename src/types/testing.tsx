export type StatusAttempts = 'graded' | 'in_progress' | 'submitted';
export type TestMeta = 
{
    project: string;
    track: string;
    course: string;
    purpose: string;
}

export type Attempt = {
    id: number;
    testId: number;
    userId: number;
    startedAt: string;
    finishedAt: string;
    timeSpent: number;
    score: number;
    status: StatusAttempts;
};

export type TestItem = {
  id: number;
  title: string;
  shortDescription: string;
  durationSec: number;
  passScore: number;
  attemptsAllowed: number;
  allowRetry: boolean;
  isPublished: boolean;
  meta: TestMeta;
  tags: string[];
  attemptAllow: number;
  deadlineISO: string;
};

export type QuestionType = 'multiple' | 'single' | 'text';

export type Question = {
    id: number;
    testId: number;
    type: QuestionType;
    text: string;
    options: string[];
    score: number;
    shuffle: boolean;
};