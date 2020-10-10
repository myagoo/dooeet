import { ThemeContext } from 'css-system'
import React, { useContext, useMemo } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useQuery } from 'react-query'
import firebase from '../firebase'
import { SecondaryButton } from '../primitives/Button'
import { Hint, Text, Title } from '../primitives/Text'
import { View } from '../primitives/View'
import { ToggleThemeContext } from '../providers/Theme'

export const Menu = () => {
  const theme = useContext(ThemeContext)
  const toggleTheme = useContext(ToggleThemeContext)

  const handleLogout = () => {
    firebase.auth().signOut()
  }

  const { data: todos } = useQuery(
    'todos',
    async () =>
      await firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}/todos`)
        .once('value')
        .then((snapshot) => {
          const todos = []
          snapshot.forEach((childSnapshot) => {
            todos.push({
              key: childSnapshot.key,
              ...childSnapshot.val(),
            })
          })
          return todos.reverse()
        })
  )

  const [completedTodosCount, todosCount] = useMemo(() => {
    if (!todos) {
      return []
    }
    const completedTodos = todos.filter(({ completed }) => completed)
    return [completedTodos.length, todos.length]
  }, [todos])

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
        <Text>
          Completed {completedTodosCount}/{todosCount} todos
        </Text>
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
