import { ThemeContext } from 'css-system'
import React, { createContext, useState } from 'react'

const baseTheme = {
  breakpoints: {
    s: '40em',
    m: '52em',
    l: '64em',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
}

const lightTheme = {
  ...baseTheme,
  colors: {
    primary: '#673AB7',
    primaryText: '#ffffffe0',
    lightPrimary: '#D1C4E9',
    lightPrimaryText: '#000000e0',
    accent: '#FF4081',
    accentText: '#ffffffe0',
    background: '#FFFFFF',
    backgroundText: '#000000e0',
    secondaryBackgroundText: '#00000080',
    divider: '#BDBDBD',
  },
  name: 'light',
}

const darkTheme = {
  ...baseTheme,

  colors: {
    primary: '#673AB7',
    primaryText: '#ffffffe0',
    lightPrimary: '#D1C4E9',
    lightPrimaryText: '#212121',
    accent: '#FF4081',
    accentText: '#ffffffe0',
    background: '#212121',
    backgroundText: '#ffffffe0',
    secondaryBackgroundText: '#ffffff80',
    divider: '#BDBDBD',
  },
  name: 'dark',
}

export const ToggleThemeContext = createContext(() => {})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme)

  return (
    <ThemeContext.Provider value={theme}>
      <ToggleThemeContext.Provider
        value={() => setTheme(theme === lightTheme ? darkTheme : lightTheme)}
      >
        {children}
      </ToggleThemeContext.Provider>
    </ThemeContext.Provider>
  )
}
