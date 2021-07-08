import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

const NAME = 'Whatsapp Dialer'
const SITE = 'https://whatsapp-dial.vercel.app'
const DESC =
  'Dial and send messages in whatsapp without adding to your contacts'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content={DESC} />
          <link rel="icon" href="/favicon.png" />
          <meta name="application-name" content={NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content={NAME} />
          <meta name="description" content={DESC} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#09D261" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#131C21" />
          <link rel="apple-touch-icon" href="/favicon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/favicon.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="twitter:card" content={DESC} />
          <meta name="twitter:url" content={SITE} />
          <meta name="twitter:title" content={NAME} />
          <meta name="twitter:description" content={DESC} />
          <meta name="twitter:image" content={`${SITE}/favicon.png`} />
          <meta name="twitter:creator" content="@gustavoguichard" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={NAME} />
          <meta property="og:description" content={DESC} />
          <meta property="og:site_name" content={NAME} />
          <meta property="og:url" content={SITE} />
          <meta property="og:image" content={`${SITE}/favicon.png`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
