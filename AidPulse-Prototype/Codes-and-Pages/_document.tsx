import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/logo.png" />
          <meta name="title" content="AidPulse - Crisis Response Platform" />
          <meta name="description" content="AI-powered humanitarian aid and crisis response platform" />
          <meta name="generator" content="v0.dev" />
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
