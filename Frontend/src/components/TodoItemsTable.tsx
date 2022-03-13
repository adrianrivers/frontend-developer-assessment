import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, HStack } from '@chakra-ui/react'
import { TodoItem } from './TodoList'
import TodoDescription from './TodoDescription'
import TodoComplete from './TodoComplete'
interface TodoItemsTableProps {
  todoItems: TodoItem[]
  handleMarkAsCompleted: (id: number, description: string) => void
}

export default function TodoItemsTable({ todoItems, handleMarkAsCompleted }: TodoItemsTableProps) {
  const table = () => {
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {todoItems.reverse().map((todo: TodoItem) => {
            const { id, description, isCompleted } = todo
            return (
              <Tr key={id}>
                <Td>
                  <TodoDescription description={description} isCompleted={isCompleted} />
                </Td>
                <Td isNumeric marginRight={8}>
                  <TodoComplete
                    handleMarkAsCompleted={handleMarkAsCompleted}
                    isCompleted={isCompleted}
                    id={id}
                    description={description}
                  />
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    )
  }

  return (
    <>
      <HStack paddingX={6} marginBottom={12} justifyContent="space-between">
        <Text fontWeight="bold">Showing {todoItems.length} Item(s) </Text>
      </HStack>
      <Box marginBottom={16}>
        {todoItems.length ? table() : <Text marginX={6}>You currently have no todo items in your todo list 🙂</Text>}
      </Box>
    </>
  )
}
