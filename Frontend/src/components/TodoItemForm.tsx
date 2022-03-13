import React, { useState, FormEvent, useRef } from 'react'
import { Box, Button, HStack } from '@chakra-ui/react'
import TodoItemInput from './TodoItemInput'
import { getFieldError } from '../helpers/getFieldError'

interface TodoItemFormProps {
  postTodoItem: (description: any) => Promise<void>
}

export default function TodoItemForm({ postTodoItem }: TodoItemFormProps) {
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false)
  const form = useRef<HTMLFormElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const fieldValues = Object.fromEntries(formData.entries())
    const formIsValid = Object.values(fieldValues).every((value) => typeof value === 'string' && !getFieldError(value))

    if (formIsValid) {
      postTodoItem(fieldValues.description)
      setWasSubmitted(true)
      form.current?.reset()
    }
  }

  return (
    <Box marginBottom={16} paddingX={6}>
      <form noValidate onSubmit={handleSubmit} ref={form}>
        <HStack justifyContent="space-between">
          <TodoItemInput
            label="Add todo item"
            name="description"
            placeholder="Description..."
            wasSubmitted={wasSubmitted}
          />
          <Button type="submit">Add item</Button>
        </HStack>
      </form>
    </Box>
  )
}
