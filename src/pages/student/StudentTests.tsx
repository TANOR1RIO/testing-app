import { Link } from 'react-router-dom';

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
    margin: '0 auto',
  },
  heading: {
    margin: '0 0 16px 0',
    fontSize: '24px',
    fontWeight: 600,
  },
  grid: {
    display: 'flex',
    gap: '20px',
  },
  card: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '20px',
    fontWeight: 600,
    color: '#000',
  },
  description: {
    margin: '0 0 12px 0',
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.4',
  },
  metaContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '12px',
    flexWrap: 'wrap',
  },
  metaItem: {
    fontSize: '14px',
    color: '#777',
    backgroundColor: '#f0f8ff',
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '16px',
  },
  tag: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#0077cc',
    backgroundColor: '#e8f5ff',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  button: {
    width: '100%',
    padding: '8px 16px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    background: '#2563eb',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'block',
    fontWeight: 500,
    color: '#fff',
    transition: 'background-color 0.2s ease',
  },
};

export function StudentTests() {
  const tests = [
    {
      id: 1,
      title: "Основы HTML",
      description: "Проверка базовых знаний HTML.",
      durationSec: 600,
      passScore: 70,
      attemptsAllowed: 3,
      isPublished: true,
      tags: ["html", "frontend"]
    },
    {
      id: 2,
      title: "CSS Базовый",
      description: "Селекторы и базовые свойства.",
      durationSec: 900,
      passScore: 80,
      attemptsAllowed: 2,
      isPublished: true,
      tags: ["css", "frontend"]
    }
  ];
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} мин`;
  };

  return (
    <div style={styles.container}>

      <div style={styles.grid}>
        {tests.map((test) => (
          <div key={test.id} style={styles.card}>
            <h3 style={styles.title}>{test.title}</h3>
            <p style={styles.description}>{test.description}</p>
            <div style={styles.metaContainer}>
              <span style={styles.metaItem}>
                {formatDuration(test.durationSec)}
              </span>
              <span style={styles.metaItem}>
                {test.passScore}%
              </span>
              <span style={styles.metaItem}>
                {test.attemptsAllowed} поп.
              </span>
            </div>

            <div style={styles.tagsContainer}>
              {test.tags.map((tag, idx) => (
                <span key={idx} style={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <Link
              to={`/student/test/${test.id}`}
              style={styles.button}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
            >
              Пройти
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}