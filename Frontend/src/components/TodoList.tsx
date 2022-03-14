import React, { useEffect, useState } from 'react'
import { Container } from '@chakra-ui/react'
import TodoItemsTable from './TodoItemsTable'
import TodoItemForm from './TodoItemForm'
import axios from 'axios'

const TODOLIST_API = 'http://localhost:7000/api/todoItems'

export interface TodoItem {
  id: number
  description: string
  isCompleted: boolean
}

export default function TodoList(): React.ReactElement {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([])

  const getAllTodoItems = async (): Promise<void> => {
    try {
      const { data } = await axios.get<TodoItem[]>(TODOLIST_API)

      if (data.length) return setTodoItems(data.reverse())
    } catch (error) {
      console.error(error)
    }
  }

  const postTodoItem = async (description: string | FormDataEntryValue): Promise<void> => {
    try {
      const { status } = await axios.post(TODOLIST_API, { description, isCompleted: false })

      if (status === 201) getAllTodoItems().then((data) => data)
    } catch (error) {
      console.error(error)
    }
  }

  const putTodoItemMarkAsCompleted = async (id: number, description: string) => {
    try {
      const { status } = await axios.put(`${TODOLIST_API}/${id}`, { description, isCompleted: true })

      if (status === 200) getAllTodoItems()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllTodoItems()
  }, [])

  return (
    <Container as="main" maxWidth="container.lg">
      <TodoItemForm postTodoItem={postTodoItem} />
      <TodoItemsTable todoItems={todoItems} handleMarkAsCompleted={putTodoItemMarkAsCompleted} />
    </Container>
  )
}
