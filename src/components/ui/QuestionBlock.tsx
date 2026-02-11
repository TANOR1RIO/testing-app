import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function QuestionBlock() {
  const [questions, setQuestions] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();

  console.log('questions', questions);
  console.log('id', id);

  useEffect(() => {
    const API_URL = '/data/questions.json';
    fetch(API_URL)
      .then(res => res.json())
      .then(todom => setQuestions(todom));
  }, []);

  const filtered = questions.filter(q => q.testId === Number(id));
  console.log('filtered', filtered);

  return (
    <div>
      <ul>
        {filtered.map(q => (
          <li key={q.id}>
            <h3>{q.text}</h3>
            <ul>
              {q.options.map((o: string, indx: number) => (
                <li key={indx}>
                  <label>
                    <input type="checkbox" />
                    <span>{o}</span>
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}