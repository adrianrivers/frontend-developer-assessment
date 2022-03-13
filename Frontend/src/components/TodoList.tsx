import React, { useState } from 'react'
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

  // const [firstResponse, secondResponse] = await Promise.all([
  //   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${this.props.p1}`),
  //   axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${this.props.p2}`)
  // ]);

  async function addTodoItem(description: FormDataEntryValue) {
    try {
      axios.post(`${TODOLIST_API_BASE_URL}/api/todoItems`, {
        description,
        isCompleted: false,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function getAllTodoItems(): Promise<TodoItem[] | void> {
    try {
      const data = await axios
        .get<TodoItem[]>(`${TODOLIST_API_BASE_URL}/api/todoItems`)
        .then((response) => response.data)

      if (data.length) {
        setTodoItems(data.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container as="main" maxWidth="container.lg">
      <TodoItemForm addTodoItem={addTodoItem} />
      <TodoItemsTable todoItems={todoItems} getAllTodoItems={getAllTodoItems} />
    </Container>
  )
}
