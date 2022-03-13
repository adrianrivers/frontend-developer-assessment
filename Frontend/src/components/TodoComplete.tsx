import React from 'react'
import { Button, Text, ScaleFade } from '@chakra-ui/react'

interface TodoCompleteProps {
  handleMarkAsCompleted: (id: number, description: string) => void
  isCompleted: boolean
  id: number
  description: string
}

export default function TodoComplete({ handleMarkAsCompleted, isCompleted, id, description }: TodoCompleteProps) {
  return !isCompleted ? (
    <Button colorScheme="green" color="white" onClick={() => handleMarkAsCompleted(id, description)}>
      Mark as completed
    </Button>
  ) : (
    <ScaleFade in={isCompleted}>
      <Text marginY={2}>Hooray, you are productive 🥳</Text>
    </ScaleFade>
  )
}
