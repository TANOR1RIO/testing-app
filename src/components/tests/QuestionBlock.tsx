import type { Question } from "../../types/testing";

type QuestionBlockProps = {
  question: Question;
  onChange: (id: number, value: string | string[]) => void;
};

export function QuestionBlock(props: QuestionBlockProps) {
  const { question, onChange } = props;

  return (
    <div>
      <fieldset key={question.id}>
        <legend>{question.text}</legend>
        {question.type === 'multiple' && (
          <ul>
            {question.options?.map((o: string, index: number) => (
              <li key={index}>
                <label>
                  <input
                    name={`question-${question.id}`}
                    type="checkbox"
                    aria-label={`question-${question.id}`}
                  />
                  <span>{o}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
        {question.type === 'single' && (
          <ul>
            {question.options?.map((o: string, index: number) => (
              <li key={index}>
                <label>
                  <input
                    name={`question-${question.id}`}
                    type="radio"
                    aria-label={`question-${question.id}`}
                  />
                  <span>{o}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
        {question.type === 'text' && (
          <label>
            <input
              name={`question-${question.id}`}
              type="text"
              aria-label={`question-${question.id}`}
              placeholder="Введите свой ответ"
              onChange={(e) => onChange(question.id, e.target.value)}
            />
          </label>
        )}
      </fieldset>
    </div>
  );
}