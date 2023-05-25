import { ThemeProvider } from '@emotion/react'
import Body from './components/Body'
import Header from './components/Header'
import { createTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'

export function App(): JSX.Element {
  const themeLight = createTheme({
    palette: {
      background: {
        default: '#ffb751'
      }
    }
  })
  return (
    <>
      <ThemeProvider theme={themeLight}>
        <Header />
        <Body />
        <Outlet />
      </ThemeProvider>
    </>
  )
}
