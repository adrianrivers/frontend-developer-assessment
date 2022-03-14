import React from 'react'
import { Container } from '@chakra-ui/react'
import TodoItemsTable from './TodoItemsTable'
import TodoItemForm from './TodoItemForm'
export interface TodoItem {
  id: string
  description: string
  isCompleted: boolean
}

export default function TodoList(): React.ReactElement {
  return (
    <Container as="main" maxWidth="container.lg">
      <TodoItemForm />
      <TodoItemsTable />
    </Container>
  )
}
