import styles from 'styles/results.module.css'

export default function Results({ results }) {
  return (
    <ul className={styles.list}>
      {results.map(result => (
        <div key={result.id} className={styles.result}>
          <p>{result.name}</p>
        </div>
      ))}
    </ul>
  )
}