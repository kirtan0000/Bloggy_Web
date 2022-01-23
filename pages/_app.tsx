import '../styles/globals.css'
import '../styles/Auth.css'
import { AppProps } from 'next/app'

function MyApp ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
