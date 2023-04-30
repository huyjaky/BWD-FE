import Head  from 'next/head';
import {Montserrat} from 'next/font/google'

const monsterrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
  variable: '--font-monsterrat'
})

export default function Home() {
  return (
    <>
      <Head>
        <title>Air BNB</title>
      </Head>
      <main className={`${monsterrat.className}`}>
        <div className='w-screen h-screen'>

        </div>
      </main>
    </>
  );
}
