import React from 'react'
import { Button, Text, ScaleFade, Box } from '@chakra-ui/react'
import { TodoItem } from './TodoList'
import axios from 'axios'
import { TODO_LIST_API } from '../constants'
import { useSWRConfig } from 'swr'

export default function TodoComplete({ isCompleted, id, description }: TodoItem): React.ReactElement {
  const { mutate } = useSWRConfig()

  const handleMarkAsCompleted = async (id: string, description: string) => {
    try {
      const { status } = await axios.put(`${TODO_LIST_API.DEV_URL}/${id}`, { description, isCompleted: true })
      if (status === 200) {
        mutate(TODO_LIST_API.DEV_URL)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return !isCompleted ? (
    <Button
      background="brand.vividOrange"
      borderRadius={0}
      border="1px solid transparent"
      _hover={{
        background: 'transparent',
        color: 'brand.vividOrange',
        borderColor: 'brand.vividOrange',
      }}
      color="white"
      onClick={() => handleMarkAsCompleted(id, description)}
    >
      Mark as completed
    </Button>
  ) : (
    <ScaleFade in={isCompleted}>
      <Box as="span" height="40px" display="flex" justifyContent="flex-end" alignItems="center">
        <Text>Woohoo 🥳</Text>
      </Box>
    </ScaleFade>
  )
}
