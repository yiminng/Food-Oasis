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
          height: 100%;
          margin: 0;
          overflow-y: scroll;
        }
        .result {
          padding: 10px;
        }
      `}</style>
    </>
  )
}