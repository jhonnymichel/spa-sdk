import { Provider } from 'mobx-react'
import { initializeStore } from 'store'
import { AppProps } from 'next/app'
import 'mobx-react/batchingForReactDom'
import 'focus-visible'
import Navbar from 'components/navbar'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'styles/index.css'

Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const store = initializeStore(pageProps?.initialStoreState)

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="This is an example of a meta description. This will often show up in search results."
        />
        <title>SPA SDK</title>
      </Head>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
