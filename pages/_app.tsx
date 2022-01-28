// CSS imports
import '../styles/globals.css'
import '../styles/Auth.css'
import '../styles/Topnav.css'
import '../styles/Settings.css'

import { AppProps } from 'next/app'

function MyApp ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
