import React from 'react'
import { Container } from '@chakra-ui/react'
import TodoItemsTable from './TodoItemsTable'
import TodoItemForm from './TodoItemForm'

export default function TodoList(): React.ReactElement {
  return (
    <Container as="main" maxWidth="container.lg">
      <TodoItemForm />
      <TodoItemsTable />
    </Container>
  )
}
