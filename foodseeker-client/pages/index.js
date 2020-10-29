import dynamic from 'next/dynamic';

import theme from 'theme'
import Head from 'components/head'
import Results from 'components/results'

const DynamicMapWithNoSSR = dynamic(() => import('components/Map'), {
  ssr: false
});

export default function Home({ results }) {
  return (
    <div>
      <Head />
      <main className="main">
        <div className="filter"></div>
        <div className="main-content">
          <div className="content-item">
            <Results results={results} />
          </div>
          <div className="content-item">
            <DynamicMapWithNoSSR />
          </div>
        </div>
      </main>
      <style jsx>{`
        .main {
          height: 100vh;
          width: 100vw;
        }
        .filter {
          width: 100%;
          height: 50px;
          background-color: ${theme.palette.primary.main};
        }
        .main-content {
          height: calc(100% - 50px);
          overflow: hidden;
          width: 100%;
          display: flex;
          flex-direction: row;
        }
        .content-item {
          width: 50%;
        }
    `}</style>
    </div>
  )
}

export async function getServerSideProps() {
  const response = await fetch('https://foodoasis.la/api/stakeholderbests?categoryIds[]=1&categoryIds[]=9&latitude=34.07872&longitude=-118.243328&distance=5&isInactive=either&verificationStatusId=0&tenantId=1')
  const results = await response.json()
  return {
    props: {
      results,
    },
  }
}
