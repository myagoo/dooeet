import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useMutation, useQuery, useQueryCache } from 'react-query'
import firebase from '../firebase'
import { PrimaryButton, SecondaryButton } from '../primitives/Button'
import { Input } from '../primitives/Input'
import { Text } from '../primitives/Text'
import { View } from '../primitives/View'

export const Todos = () => {
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
          console.log(snapshot)
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

  const [addTodo, { isLoading: isAddTodoLoading }] = useMutation(
    async (todo) =>
      await firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}/todos`)
        .push(todo),
    {
      onSuccess: () => {
        // Query Invalidations
        queryCache.invalidateQueries('todos')
      },
    }
  )

  const [removeTodo, { isLoading: isRemoveTodoLoading }] = useMutation(
    async (key) =>
      await firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}/todos/${key}`)
        .remove(),
    {
      onSuccess: () => {
        // Query Invalidations
        queryCache.invalidateQueries('todos')
      },
    }
  )
  const [updateTodo] = useMutation(
    async ({ key, todo }) =>
      console.log(todo) ||
      (await firebase
        .database()
        .ref(`users/${firebase.auth().currentUser.uid}/todos/${key}`)
        .update(todo)),
    {
      onSuccess: () => {
        // Query Invalidations
        queryCache.invalidateQueries('todos')
      },
    }
  )
  const handleAddTodo = async () => {
    await addTodo({ text: pendingText, completed: false })
    setPendingText('')
  }

  const handleRemoveTodo = async (key) => {
    await removeTodo(key)
  }

  const handleUpdateTodo = async (key, todo) => {
    await updateTodo({ key, todo })
  }

  const handleKeypress = async (e) => {
    e.persist()
    if (e.key === 'Enter' && pendingText.trim()) {
      await addTodo({ text: pendingText, completed: false })
      setPendingText('')
      e.target.focus()
    }
  }

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <View css={{ flex: '1', alignItems: 'center', gap: 3 }}>
      <View css={{ flexDirection: 'row', gap: 3 }}>
        <Input
          autoFocus
          value={pendingText}
          onChange={(e) => setPendingText(e.target.value)}
          disabled={isAddTodoLoading}
          onKeyPress={handleKeypress}
        ></Input>
        <PrimaryButton disabled={isAddTodoLoading} onClick={handleAddTodo}>
          Add
        </PrimaryButton>
      </View>
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
              <Input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  handleUpdateTodo(todo.key, { completed: !todo.completed })
                }
                disabled={isAddTodoLoading}
              ></Input>
              <Text
                css={{
                  textDecoration: todo.completed && 'line-through',
                }}
                deps={[todo.completed]}
              >
                {todo.text}
              </Text>
              <SecondaryButton
                disabled={isRemoveTodoLoading}
                onClick={() => handleRemoveTodo(todo.key)}
              >
                Delete <FaTrash />
              </SecondaryButton>
            </View>
          )
        })}
      </View>
    </View>
  )
}
