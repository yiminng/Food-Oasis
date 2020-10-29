import theme from 'theme'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: ${theme.fontFamily};
          color: ${theme.palette.text};
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        * {
          box-sizing: border-box;
        }
      `}
      </style>
    </div>
  )
}
