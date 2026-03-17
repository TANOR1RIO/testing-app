import type { Question } from "../../types/testing";

type QuestionBlockProps = {
  question: Question;
  value: string | string[] | null;
  onChange: (id: number, value: string | string[] | null) => void;
};

export function QuestionBlock(props: QuestionBlockProps) {
  const { question, onChange, value } = props;
  return (
    <div>
      <fieldset key={question.id}>
        <legend>{question.text}</legend>
        
        {question.type === 'multiple' && (
          <ul>
            {(question.options ?? []).map((opt, indx) => {
              const arrCheckbox = Array.isArray(value) ? value : [];
              const checked = arrCheckbox.includes(opt);

              return (
                <li key={indx}>
                  <label>
                    <input
                      name={`question-${question.id}`}
                      type="checkbox"
                      onChange={() => {
                        const data = checked ? arrCheckbox.filter(val => val !== opt ) : [...arrCheckbox, opt];
                        onChange(question.id, data)
                      }}
                    />
                    <span>{opt}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
        
        {question.type === 'single' && (
          <ul>
            {(question.options ?? []).map((opt, indx) => (
              <li key={indx}>
                <label>
                  <input
                    name={`question-${question.id}`}
                    type="radio"
                    aria-label={`question-${question.id}`}
                    checked={value === opt}
                    onChange={() => 
                      onChange(question.id, opt)
                    }
                  />
                  <span>{opt}</span>
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
              value={typeof value === 'string' ? value : ''}
              onChange={(e) => onChange(question.id, e.target.value)}
            />
          </label>
        )}
      </fieldset>
    </div>
  );
}