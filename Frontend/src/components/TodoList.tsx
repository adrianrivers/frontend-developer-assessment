import React, { useEffect, useState } from 'react'
import { Container } from '@chakra-ui/react'
import TodoItemsTable from './TodoItemsTable'
import TodoItemForm from './TodoItemForm'
import axios from 'axios'
import Confetti from 'react-confetti'
import theme from '../theme'

const TODOLIST_API = 'http://localhost:7000/api/todoItems'

export interface TodoItem {
  id: string
  description: string
  isCompleted: boolean
}

export default function TodoList(): React.ReactElement {
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [todoItems, setTodoItems] = useState<TodoItem[]>([])
  const [responseError, setResponseError] = useState<string>('')

  const {
    colors: { brand },
  } = theme

  const confettiColors = [brand.vividPurple, brand.vividOrange, brand.vividGreen]

  const getAllTodoItems = async (): Promise<void | undefined> => {
    try {
      const { data } = await axios.get<TodoItem[]>(TODOLIST_API)

      if (data.length) {
        return setTodoItems(data.reverse())
      }
    } catch (error) {
      console.error(error)
    }
  }

  const postTodoItem = async (description: string | FormDataEntryValue): Promise<void> => {
    try {
      const { status } = await axios.post(TODOLIST_API, { description, isCompleted: false })
      if (status === 201) {
        return getAllTodoItems().then((data) => data)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && typeof error?.response?.data === 'string') {
        setResponseError(error.response.data)
      }
    }
  }

  const putTodoItemMarkAsCompleted = async (id: string, description: string) => {
    try {
      const { status } = await axios.put(`${TODOLIST_API}/${id}`, { description, isCompleted: true })
      if (status === 200) getAllTodoItems()
    } catch (error) {
      console.error(error)
    }
  }

  const clearResponseError = (): void => setResponseError('')

  useEffect(() => {
    const completedTodoItems = todoItems.filter((todoItem) => todoItem.isCompleted)

    if (todoItems.length > 1 && completedTodoItems.length === todoItems.length) {
      setShowConfetti(true)
    }
  }, [todoItems])

  useEffect(() => {
    if (!responseError) {
      getAllTodoItems()
    }
  }, [responseError])

  console.log(responseError)

  return (
    <Container as="main" maxWidth="container.lg">
      {showConfetti && (
        <Confetti colors={confettiColors} recycle={false} onConfettiComplete={() => setShowConfetti(false)} />
      )}
      <TodoItemForm postTodoItem={postTodoItem} clearResponseError={clearResponseError} responseError={responseError} />
      <TodoItemsTable todoItems={todoItems} handleMarkAsCompleted={putTodoItemMarkAsCompleted} />
    </Container>
  )
}
