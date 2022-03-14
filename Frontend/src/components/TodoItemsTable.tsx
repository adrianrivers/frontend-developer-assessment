import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, HStack } from '@chakra-ui/react'
import TodoDescription from './TodoDescription'
import TodoComplete from './TodoComplete'
import useSWR from 'swr'
import { TODO_LIST_API } from '../constants'
import axios from 'axios'
import Confetti from './Confetti'
import { TodoItem } from '../types'

interface TableComponentProps {
  data: TodoItem[]
}

function ItemsTableBody({ data }: TableComponentProps): React.ReactElement {
  const tableRows = []

  for (const item of data) {
    const { id, description, isCompleted } = item

    tableRows.push(
      <Tr key={id}>
        <Td>
          <TodoDescription description={description} isCompleted={isCompleted} />
        </Td>
        <Td isNumeric marginRight={8}>
          <TodoComplete isCompleted={isCompleted} id={id} description={description} />
        </Td>
      </Tr>
    )
  }

  return <Tbody>{tableRows}</Tbody>
}

function ItemsTable({ data }: TableComponentProps): React.ReactElement {
  return (
    <>
      <HStack paddingX={6} marginBottom={12} justifyContent="space-between">
        <Text fontWeight="bold">Showing {data.length} Item(s)</Text>
      </HStack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <ItemsTableBody data={data} />
      </Table>
    </>
  )
}

export default function TodoItemsTable(): React.ReactElement {
  const [showConfetti, setShowConfetti] = useState(false)

  const fetcher = (url: string) => axios.get<TodoItem[]>(url).then((response) => response.data.reverse())
  const { data, error } = useSWR(TODO_LIST_API.DEV_URL, fetcher)

  const RenderContent = () => {
    if (data) {
      return <ItemsTable data={data} />
    } else if (!data) {
      return <Text marginX={6}>You currently have no todo items in your todo list 🙂</Text>
    } else if (error) {
      return <Text marginX={6}>Something went wrong fetching your todos 😢</Text>
    }
  }

  useEffect(() => {
    if (!data || data.length < 1) return

    const allTodoItemsCompleted = data.every((todoItem) => todoItem.isCompleted)

    if (allTodoItemsCompleted) {
      setShowConfetti(true)
    } else {
      setShowConfetti(false)
    }
  }, [data])

  return (
    <>
      {showConfetti && <Confetti />}
      <Box marginBottom={16}>{RenderContent()}</Box>
    </>
  )
}
