import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/londrina-solid'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import '@zoralabs/zord/index.css'
import { VercelAnalytics } from 'analytics'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'
import type { ReactElement, ReactNode } from 'react'
import { SWRConfig } from 'swr'
import { WagmiConfig } from 'wagmi'

import { Disclaimer } from 'src/components/Disclaimer'
import { NetworkController } from 'src/components/NetworkController'
import { chains } from 'src/data/contract/chains'
import { config } from 'src/data/contract/config'
import 'src/styles/globals.css'
import 'src/styles/styles.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  err: Error
  Component: NextPageWithLayout
}

function App({ Component, pageProps, err }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const fallback = pageProps?.fallback ?? {}
  return (
    <>
      <Head>
        <PWA_MetaConfig />
      </Head>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains} appInfo={{ disclaimer: Disclaimer }}>
          <SWRConfig value={{ fallback }}>
            <NextNProgress
              color={'#008BFF'}
              startPosition={0.125}
              stopDelayMs={200}
              height={2}
              showOnShallow={false}
              options={{ showSpinner: false }}
            />
            {getLayout(<Component {...pageProps} err={err} />)}
          </SWRConfig>
          <NetworkController.Mainnet>
            <VercelAnalytics />
          </NetworkController.Mainnet>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}

export default App

const PWA_MetaConfig = () => {
  return (
    <>
      <meta name="application-name" content="PWA App" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="PWA App" />
      <meta name="description" content="Best PWA App in the world" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#2B5797" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#000000" />

      <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/touch-icon-iphone-retina.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/icons/touch-icon-ipad-retina.png"
      />

      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
      />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content="https://yourdomain.com" />
      <meta name="twitter:title" content="PWA App" />
      <meta name="twitter:description" content="Best PWA App in the world" />
      <meta
        name="twitter:image"
        content="https://yourdomain.com/icons/android-chrome-192x192.png"
      />
      <meta name="twitter:creator" content="@DavidWShadow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="PWA App" />
      <meta property="og:description" content="Best PWA App in the world" />
      <meta property="og:site_name" content="PWA App" />
      <meta property="og:url" content="https://yourdomain.com" />
      <meta
        property="og:image"
        content="https://yourdomain.com/icons/apple-touch-icon.png"
      />
    </>
  )
}
