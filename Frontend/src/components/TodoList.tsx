import React, { useEffect, useState } from 'react'
import { Container } from '@chakra-ui/react'
import TodoItemsTable from './TodoItemsTable'
import TodoItemForm from './TodoItemForm'
import axios from 'axios'

const TODOLIST_API_BASE_URL = 'http://localhost:7000'

export interface TodoItem {
  id: number
  description: string
  isCompleted: boolean
}

export default function TodoList() {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([])

  async function getAllTodoItems(): Promise<void> {
    try {
      const { data } = await axios.get<TodoItem[]>(`${TODOLIST_API_BASE_URL}/api/todoItems`)

      if (data.length) {
        return setTodoItems(data.reverse())
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function postTodoItem(description: string) {
    try {
      const { status } = await axios.post(`${TODOLIST_API_BASE_URL}/api/todoItems`, { description, isCompleted: false })

      if (status === 201) {
        getAllTodoItems().then((data) => data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function handleMarkAsCompleted(id: number, description: string): Promise<void> {
    try {
      console.log(id)
      const { status } = await axios.put(`${TODOLIST_API_BASE_URL}/api/todoItems/${id}`, {
        description,
        isCompleted: true,
      })

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
      <TodoItemsTable todoItems={todoItems} handleMarkAsCompleted={handleMarkAsCompleted} />
    </Container>
  )
}
