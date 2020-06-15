import { Provider } from 'mobx-react'
import { initializeStore } from 'store'
import { AppProps } from 'next/app'
import 'mobx-react/batchingForReactDom'
import 'styles/index.css'
import Navbar from 'components/navbar'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const store = initializeStore(pageProps?.initialStoreState)

  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
