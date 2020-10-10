import React, { useState } from 'react'
import { FaRegCheckSquare, FaRegSquare, FaTrash } from 'react-icons/fa'
import { useMutation, useQuery, useQueryCache } from 'react-query'
import firebase from '../firebase'
import { Input } from '../primitives/Input'
import { Text } from '../primitives/Text'
import { View } from '../primitives/View'

const PLACEHOLDERS = ['Code the next todolist', 'Buy tampons', 'Procrastinate']
const getRandomPlaceholder = () =>
  PLACEHOLDERS[Math.floor(Math.random()) * PLACEHOLDERS.length]

export const Todos = () => {
  const [placeholder, setPlaceholder] = useState(getRandomPlaceholder)
  const [pendingText, setPendingText] = useState('')
  const queryCache = useQueryCache()

  const { isLoading, data: todos } = useQuery(
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

  const [addTodo] = useMutation(async (todo) => {
    const ref = firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}/todos`)
      .push(todo)

    queryCache.cancelQueries('todos')
    const previousTodos = queryCache.getQueryData('todos')
    queryCache.setQueryData('todos', (old) => [
      { key: ref.key, ...todo },
      ...old,
    ])
    try {
      await ref
    } catch (error) {
      // rollback
      queryCache.setQueryData('todos', previousTodos)
    } finally {
      queryCache.invalidateQueries('todos')
    }
  })

  const [removeTodo] = useMutation(async (key) => {
    queryCache.cancelQueries('todos')
    const previousTodos = queryCache.getQueryData('todos')
    queryCache.setQueryData('todos', (old) =>
      old.filter((todo) => key !== todo.key)
    )
    try {
      await await firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}/todos/${key}`)
        .remove()
    } catch (error) {
      // rollback
      queryCache.setQueryData('todos', previousTodos)
    } finally {
      queryCache.invalidateQueries('todos')
    }
  })
  const [updateTodo] = useMutation(async ({ key, ...newTodo }) => {
    queryCache.cancelQueries('todos')
    const previousTodos = queryCache.getQueryData('todos')
    queryCache.setQueryData('todos', (oldTodos) =>
      oldTodos.map((oldTodo) => {
        return oldTodo.key === key ? { ...oldTodo, ...newTodo } : oldTodo
      })
    )
    try {
      await firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}/todos/${key}`)
        .update(newTodo)
    } catch (error) {
      // rollback
      queryCache.setQueryData('todos', previousTodos)
    } finally {
      queryCache.invalidateQueries('todos')
    }
  })

  const handleRemoveTodo = async (key) => {
    await removeTodo(key)
  }

  const handleUpdateTodo = async (todo) => {
    await updateTodo(todo)
  }

  const handleKeypress = async (e) => {
    e.persist()
    if (e.key === 'Enter' && pendingText.trim()) {
      setPendingText('')
      setPlaceholder(getRandomPlaceholder())
      e.target.focus()
      await addTodo({ text: pendingText, completed: false })
    }
  }

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <View
      css={{ p: 4, flex: '1', alignItems: 'center', gap: 3, overflow: 'auto' }}
    >
      <Input
        autoFocus
        placeholder={placeholder}
        value={pendingText}
        onChange={(e) => setPendingText(e.target.value)}
        onKeyPress={handleKeypress}
      ></Input>
      <View css={{ gap: 3 }}>
        {todos.map((todo) => {
          return (
            <View
              key={todo.key}
              css={{
                flexDirection: 'row',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <View
                as={todo.completed ? FaRegCheckSquare : FaRegSquare}
                css={{ cursor: 'pointer' }}
                onClick={() =>
                  handleUpdateTodo({
                    key: todo.key,
                    completed: !todo.completed,
                  })
                }
              />

              <Input
                css={
                  todo.completed && {
                    opacity: 0.5,
                    textDecoration: 'line-through',
                  }
                }
                deps={[todo.completed]}
                value={todo.text}
                onChange={(e) =>
                  handleUpdateTodo({
                    key: todo.key,
                    text: e.target.value,
                  })
                }
              />
              <View
                as={FaTrash}
                onClick={() => handleRemoveTodo(todo.key)}
                css={{ cursor: 'pointer' }}
              />
            </View>
          )
        })}
      </View>
    </View>
  )
}
