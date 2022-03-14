import React from 'react'
import { Button, Text, ScaleFade } from '@chakra-ui/react'

interface TodoCompleteProps {
  handleMarkAsCompleted: (id: string, description: string) => void
  isCompleted: boolean
  id: string
  description: string
}

export default function TodoComplete({
  handleMarkAsCompleted,
  isCompleted,
  id,
  description,
}: TodoCompleteProps): React.ReactElement {
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
      <Text marginY={2}>Woohoo 🥳</Text>
    </ScaleFade>
  )
}
