import { useGlobalCss } from 'css-system'
import React from 'react'
import { Login } from './components/Login'
import { Menu } from './components/Menu'
import { Todos } from './components/Todos'
import { useAuth } from './hooks/useAuth'
import { Text } from './primitives/Text'
import { View } from './primitives/View'

function App() {
  const { initializing, user } = useAuth()

  useGlobalCss({
    body: {
      m: 0,
      bg: 'background',
      color: 'backgroundText',
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
        "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif`,
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      transition: `background-color 250ms`,
    },
    'body, html, #root': {
      height: '100%',
    },
    '#root': {
      display: 'flex',
      flexDirection: 'column',
      padding: `
        env(safe-area-inset-top, 0)
        env(safe-area-inset-right, 0)
        env(safe-area-inset-bottom, 0)
        env(safe-area-inset-left, 0)
      `,
    },
    '*': {
      boxSizing: 'border-box',
      userSelect: 'none',
      '-moz-user-select': 'none',
      '-khtml-user-select': 'none',
      '-webkit-user-select': 'none',
      '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
    },
    'input, textarea': {
      '-webkit-user-select': 'initial',
      '-moz-user-select': 'initial',
      '-ms-user-select': 'initial',
      userSelect: 'initial',
    },
  })

  if (initializing) {
    return (
      <View css={{ flex: '1' }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!user) {
    return <Login />
  }

  return (
    <View css={{ flex: '1' }}>
      <Menu />
      <Todos />
    </View>
  )
}

export default App
