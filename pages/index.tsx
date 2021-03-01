import { GetStaticProps } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import classNames from 'classnames'

interface ExchangeRate {
  r030: number
  txt: string
  rate: number
  cc: string
  exchangedate: string
}

interface IndexPageProps {
  exchangeRates: ExchangeRate[]
}

export default function IndexPage(props: IndexPageProps) {
  const { exchangeRates } = props

  console.log(exchangeRates);

  const title = 'NBU Exchange Rate'
  
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/currency-flags@3.1.0/dist/currency-flags.min.css"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to {title}
        </h1>

        <p className={styles.description}>
          Here you can find exchange rates of {exchangeRates.length} currencies
        </p>

        <ul className={styles.grid}>
          {
            exchangeRates.map(
              exchangeRate => {
                const { rate, txt, cc } = exchangeRate
                
                return (
                  <a href="#" className={styles.card}>
                    <div className={styles.rateHeader}>
                      <div
                        className={
                          classNames(
                            'currency-flag',
                            `currency-flag-${cc.toLowerCase()}`,
                            styles.currencyFlag_marginRight
                          )
                        }
                      ></div>
                      <h3>{cc} {rate}</h3>
                    </div>
                    <p>{txt}</p>
                  </a>
                )
              }
            )
          }
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const response = await fetch(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
  )

  const exchangeRate = await response.json()

  return {
    props: {
      exchangeRates: exchangeRate
    },
    revalidate: 3600
  }
}
