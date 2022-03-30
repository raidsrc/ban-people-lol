import '../styles/output.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from "@mui/material"
import { SessionProvider } from "next-auth/react"

const theme = createTheme({
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
  }
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (

    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>

  )
}

export default MyApp
