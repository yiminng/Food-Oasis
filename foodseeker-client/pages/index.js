import dynamic from 'next/dynamic';

import Head from 'components/head'
import Results from 'components/results'
import styles from 'styles/home.module.css'

const DynamicMapWithNoSSR = dynamic(() => import('components/Map'), {
  ssr: false
});

export default function Home({ results }) {
  return (
    <div>
      <Head />
      <main className={styles.main}>
        <div className={styles.filter}></div>
        <div className={styles.mainContent}>
          <div className={styles.contentItem}>
            <Results results={results} />
          </div>
          <div className={styles.contentItem}>
            <DynamicMapWithNoSSR />
          </div>
        </div>
      </main>
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
