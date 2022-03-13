import React, { useCallback } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, VStack, Button, Text, HStack } from '@chakra-ui/react'
import { TodoItem } from './TodoList'

interface TodoItemsTableProps {
  todoItems: TodoItem[]
  getAllTodoItems: () => Promise<TodoItem[] | void>
}

export default function TodoItemsTable({ todoItems, getAllTodoItems }: TodoItemsTableProps) {
  const refreshGetAllTodoItems = useCallback(async () => {
    getAllTodoItems()
  }, [getAllTodoItems])

  const table = () => {
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Description</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {todoItems.map((item: TodoItem) => (
            <Tr key={item.id}>
              <Td color="gray.500">{item.id}</Td>
              <Td>{item.description}</Td>
              <Td isNumeric marginRight={8}>
                <Button colorScheme="green" color="white">
                  Mark as completed
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    )
  }

  const noItemsToDisplay = () => <Text>You currently have no todo items in your todo list 🙂</Text>

  return (
    <>
      <HStack paddingX={6} marginBottom={12} justifyContent="space-between">
        <Text fontWeight="bold">Showing {todoItems.length} Item(s) </Text>
        <Button onClick={refreshGetAllTodoItems}>Refresh</Button>
      </HStack>
      <VStack marginBottom={16}>{todoItems.length ? table() : noItemsToDisplay()}</VStack>
    </>
  )
}
