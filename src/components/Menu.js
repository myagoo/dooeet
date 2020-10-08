import { ThemeContext } from 'css-system'
import React, { useContext } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import firebase from '../firebase'
import { SecondaryButton } from '../primitives/Button'
import { Hint, Title } from '../primitives/Text'
import { View } from '../primitives/View'
import { ToggleThemeContext } from '../providers/Theme'

export const Menu = () => {
  const theme = useContext(ThemeContext)
  const toggleTheme = useContext(ToggleThemeContext)

  const handleLogout = () => {
    firebase.auth().signOut()
  }

  return (
    <View
      css={{
        flexDirection: 'row',
        bg: 'primary',
        color: 'primaryText',
        p: 3,
        alignItems: 'baseline',
        justifyContent: 'space-between',
      }}
    >
      <View
        css={{
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 3,
        }}
      >
        <Title css={{ fontWeight: 'bold' }}>DOOEET</Title>
        <View
          css={{ cursor: 'pointer' }}
          as={theme.name === 'light' ? FaMoon : FaSun}
          onClick={toggleTheme}
        />
      </View>
      <View
        css={{
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 3,
        }}
      >
        <Hint>{firebase.auth().currentUser.email}</Hint>
        <SecondaryButton onClick={handleLogout}>Logout</SecondaryButton>
      </View>
    </View>
  )
}
