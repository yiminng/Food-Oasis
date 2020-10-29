export default function Results({ results }) {
  return (
    <>
      <ul className="list">
        {results.map(result => (
          <div key={result.id} className="result">
            <p>{result.name}</p>
          </div>
        ))}
      </ul>
      <style jsx>{`
        .list {
          margin: 0;
        }
        .result {
          padding: 10px;
        }
      `}</style>
    </>
  )
}